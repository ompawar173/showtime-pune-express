-- RangTix Supabase Schema Migration: 004_atomic_booking_rpc.sql
-- Stored procedures for atomic order creation, inventory reservation, and payment simulation

-- 1. ATOMIC ORDER CREATION
CREATE OR REPLACE FUNCTION public.create_order_atomic(
  p_user_id UUID,
  p_event_id UUID,
  p_session_id UUID,
  p_items JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_item RECORD;
  v_ticket_type RECORD;
  v_subtotal NUMERIC := 0;
  v_fee NUMERIC := 0;
  v_total NUMERIC := 0;
  v_order_id UUID := gen_random_uuid();
  v_order_number TEXT;
  v_item_id UUID;
  v_result JSONB;
BEGIN
  -- Generate unique order number
  v_order_number := 'CMW-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD((FLOOR(RANDOM() * 899999 + 100000))::TEXT, 6, '0');

  -- Loop through items to calculate server-verified prices and check inventory
  FOR v_item IN SELECT * FROM jsonb_to_recordset(p_items) AS x(ticket_type_id UUID, quantity INT)
  LOOP
    IF v_item.quantity <= 0 THEN
      RAISE EXCEPTION 'Invalid ticket quantity';
    END IF;

    SELECT * INTO v_ticket_type
    FROM public.ticket_types
    WHERE id = v_item.ticket_type_id AND session_id = p_session_id;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Ticket type not found for this session';
    END IF;

    IF v_ticket_type.available_quantity < v_item.quantity THEN
      RAISE EXCEPTION 'Insufficient tickets available for %', v_ticket_type.name;
    END IF;

    v_subtotal := v_subtotal + (v_ticket_type.price * v_item.quantity);
  END LOOP;

  IF v_subtotal > 0 THEN
    v_fee := 50;
  END IF;
  v_total := v_subtotal + v_fee;

  -- Create order record
  INSERT INTO public.orders (
    id, user_id, event_id, session_id, order_number, subtotal, fees, total_amount, status
  ) VALUES (
    v_order_id, p_user_id, p_event_id, p_session_id, v_order_number, v_subtotal, v_fee, v_total, 'pending'
  );

  -- Insert order items
  FOR v_item IN SELECT * FROM jsonb_to_recordset(p_items) AS x(ticket_type_id UUID, quantity INT)
  LOOP
    SELECT * INTO v_ticket_type FROM public.ticket_types WHERE id = v_item.ticket_type_id;

    INSERT INTO public.order_items (
      order_id, ticket_type_id, quantity, unit_price, total_price
    ) VALUES (
      v_order_id, v_item.ticket_type_id, v_item.quantity, v_ticket_type.price, (v_ticket_type.price * v_item.quantity)
    );
  END LOOP;

  SELECT jsonb_build_object(
    'order_id', v_order_id,
    'order_number', v_order_number,
    'subtotal', v_subtotal,
    'fees', v_fee,
    'total_amount', v_total,
    'status', 'pending'
  ) INTO v_result;

  RETURN v_result;
END;
$$;

-- 2. CONFIRM SIMULATED PAYMENT & GENERATE TICKETS ATOMICALLY
CREATE OR REPLACE FUNCTION public.confirm_simulated_payment(
  p_order_id UUID,
  p_payment_reference TEXT,
  p_amount NUMERIC
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_order RECORD;
  v_item RECORD;
  v_ticket_type RECORD;
  v_ticket_number TEXT;
  v_qr_token TEXT;
  i INT;
  v_payment_id UUID := gen_random_uuid();
  v_result JSONB;
BEGIN
  -- Lock order row
  SELECT * INTO v_order
  FROM public.orders
  WHERE id = p_order_id FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found';
  END IF;

  IF v_order.status = 'confirmed' THEN
    SELECT jsonb_build_object('order_id', v_order.id, 'status', 'confirmed', 'message', 'Order already confirmed') INTO v_result;
    RETURN v_result;
  END IF;

  IF v_order.status <> 'pending' THEN
    RAISE EXCEPTION 'Order is not in pending state';
  END IF;

  IF v_order.total_amount <> p_amount THEN
    RAISE EXCEPTION 'Payment amount mismatch';
  END IF;

  -- Lock ticket types and verify inventory
  FOR v_item IN SELECT * FROM public.order_items WHERE order_id = p_order_id
  LOOP
    SELECT * INTO v_ticket_type
    FROM public.ticket_types
    WHERE id = v_item.ticket_type_id FOR UPDATE;

    IF v_ticket_type.available_quantity < v_item.quantity THEN
      UPDATE public.orders SET status = 'failed', updated_at = NOW() WHERE id = p_order_id;
      RAISE EXCEPTION 'Sold out: Insufficient tickets remaining for %', v_ticket_type.name;
    END IF;

    -- Decrement inventory atomically
    UPDATE public.ticket_types
    SET available_quantity = available_quantity - v_item.quantity,
        updated_at = NOW()
    WHERE id = v_item.ticket_type_id;

    -- Create individual ticket instances
    FOR i IN 1..v_item.quantity LOOP
      v_ticket_number := 'TKT-' || TO_CHAR(NOW(), 'YYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
      v_qr_token := 'QR-' || gen_random_uuid()::TEXT;

      INSERT INTO public.tickets (
        order_id, order_item_id, ticket_number, qr_token, status
      ) VALUES (
        p_order_id, v_item.id, v_ticket_number, v_qr_token, 'active'
      );
    END LOOP;
  END LOOP;

  -- Record payment
  INSERT INTO public.payments (
    id, order_id, payment_reference, provider, amount, status
  ) VALUES (
    v_payment_id, p_order_id, COALESCE(p_payment_reference, 'SIM-' || gen_random_uuid()::TEXT), 'simulated', p_amount, 'success'
  );

  -- Mark order confirmed
  UPDATE public.orders
  SET status = 'confirmed', updated_at = NOW()
  WHERE id = p_order_id;

  SELECT jsonb_build_object(
    'order_id', p_order_id,
    'order_number', v_order.order_number,
    'status', 'confirmed',
    'total_amount', v_order.total_amount
  ) INTO v_result;

  RETURN v_result;
END;
$$;
