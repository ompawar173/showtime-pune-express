import { Link, useParams, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { CalendarDays, CheckCircle2, Clock3, Eye, Pencil, Plus, Ticket, XCircle } from 'lucide-react'
import { WorkspaceLayout } from '@/layouts/WorkspaceLayout'
import { events as initialEvents, orders as initialOrders, primaryEvent } from '@/mock/events'
import {
  getOrganizerEvents,
  createOrganizerEvent,
  getOrganizerOrders,
  getPendingEvents,
  approveEvent,
  rejectEvent,
  getEventBySlug
} from '@/services/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from '@/components/app/Shared'
import type { EventItem, Order } from '@/types'
import { toast } from 'sonner'

const Stat = ({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Ticket }) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-card">
    <span className="grid size-10 place-items-center rounded-lg bg-accent text-primary">
      <Icon className="size-5" />
    </span>
    <p className="mt-5 text-sm text-muted-foreground">{label}</p>
    <p className="mt-1 font-display text-3xl font-extrabold">{value}</p>
  </div>
)

const Heading = ({ title, copy, action }: { title: string; copy: string; action?: React.ReactNode }) => (
  <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
    <div className="min-w-0">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{title}</h1>
      <p className="mt-2 text-muted-foreground">{copy}</p>
    </div>
    {action}
  </div>
)

export function OrganizerDashboard() {
  const [eventsList, setEventsList] = useState<EventItem[]>(initialEvents.slice(0, 6))

  useEffect(() => {
    getOrganizerEvents().then(res => setEventsList(res))
  }, [])

  const publishedCount = eventsList.filter(e => e.status === 'Published').length
  const pendingCount = eventsList.filter(e => e.status === 'Pending Approval').length

  return (
    <WorkspaceLayout kind="organizer">
      <Heading
        title="Organizer overview"
        copy="Activity across your theatre events in Pune."
        action={
          <Button asChild>
            <Link to="/organizer/events/create">
              <Plus /> Create event
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total Events" value={eventsList.length.toString()} icon={CalendarDays} />
        <Stat label="Published Events" value={publishedCount.toString()} icon={CheckCircle2} />
        <Stat label="Pending Events" value={pendingCount.toString()} icon={Clock3} />
        <Stat label="Tickets Sold" value="486" icon={Ticket} />
      </div>
      <section className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-xl font-bold">Recent events</h2>
        <div className="mt-5 space-y-4">
          {eventsList.slice(0, 3).map(e => (
            <div key={e.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex min-w-0 items-center gap-3">
                <img src={e.image} alt="" width={1024} height={1280} className="size-12 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-bold">{e.title}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {e.date} · {e.venue}
                  </p>
                </div>
              </div>
              <StatusBadge status={e.status ?? 'Draft'} />
            </div>
          ))}
        </div>
      </section>
    </WorkspaceLayout>
  )
}

export function OrganizerEvents() {
  const [eventsList, setEventsList] = useState<EventItem[]>(initialEvents.slice(0, 6))

  useEffect(() => {
    getOrganizerEvents().then(res => setEventsList(res))
  }, [])

  return (
    <WorkspaceLayout kind="organizer">
      <Heading
        title="My Events"
        copy="Manage listings and their approval status."
        action={
          <Button asChild>
            <Link to="/organizer/events/create">
              <Plus /> Create
            </Link>
          </Button>
        }
      />
      <div className="grid gap-4 xl:grid-cols-2">
        {eventsList.map(e => (
          <article key={e.id} className="grid grid-cols-[100px_minmax(0,1fr)] gap-4 rounded-xl border border-border bg-card p-4">
            <img src={e.image} alt={`${e.title}`} width={1024} height={1280} className="h-full min-h-28 w-full rounded-lg object-cover" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h2 className="font-display text-lg font-bold">{e.title}</h2>
                <StatusBadge status={e.status ?? 'Draft'} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {e.date} · {e.venue}
              </p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <Link to="/organizer/events/$eventId" params={{ eventId: e.id }}>
                    <Eye /> View
                  </Link>
                </Button>
                <Button size="sm" variant="ghost">
                  <Pencil /> Edit
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </WorkspaceLayout>
  )
}

const Label = ({ children }: { children: React.ReactNode }) => <label className="grid gap-2 text-sm font-semibold">{children}</label>

export function CreateEvent() {
  const navigate = useNavigate()
  const [ticketRows, setTicketRows] = useState(2)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Marathi Theatre')
  const [description, setDescription] = useState('')
  const [venueName, setVenueName] = useState('Bal Gandharva Rang Mandir')
  const [venueAddress, setVenueAddress] = useState('JM Road, Shivaji Nagar, Pune')
  const [sessionDate, setSessionDate] = useState('2026-10-10')
  const [startTime, setStartTime] = useState('19:00')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await createOrganizerEvent({
        title,
        category,
        description,
        venueName,
        venueAddress,
        sessionDate,
        startTime,
        ticketTypes: [
          { name: 'Silver', price: 300, quantity: 100 },
          { name: 'Gold', price: 500, quantity: 50 }
        ]
      })

      toast.success('Event submitted for admin approval!')
      navigate({ to: '/organizer/events' })
    } catch (err: any) {
      toast.error('Failed to create event: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <WorkspaceLayout kind="organizer">
      <Heading title="Create Event" copy="Build a event listing and submit for admin approval." />
      <form className="space-y-7" onSubmit={handleSubmit}>
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-bold">Event details</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Label>
              Event Title
              <Input placeholder="Enter event title" value={title} onChange={e => setTitle(e.target.value)} required />
            </Label>
            <Label>
              Category
              <select
                className="h-9 rounded-md border border-input bg-background px-3"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option>Marathi Theatre</option>
                <option>Hindi Theatre</option>
                <option>Drama</option>
                <option>Comedy</option>
                <option>Live Shows</option>
              </select>
            </Label>
            <Label>
              <span>Description</span>
              <textarea
                className="min-h-28 rounded-md border border-input bg-background p-3"
                placeholder="Describe the performance"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Label>
            <Label>
              Banner Image
              <Input type="file" accept="image/*" />
            </Label>
          </div>
        </section>
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl font-bold">Venue & session</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Label>
              Venue Name
              <Input placeholder="Bal Gandharva Rang Mandir" value={venueName} onChange={e => setVenueName(e.target.value)} />
            </Label>
            <Label>
              City
              <Input value="Pune" readOnly />
            </Label>
            <Label>
              Venue Address
              <Input placeholder="Venue address" value={venueAddress} onChange={e => setVenueAddress(e.target.value)} />
            </Label>
            <Label>
              Session Date
              <Input type="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)} />
            </Label>
            <Label>
              Start Time
              <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
            </Label>
            <Label>
              End Time
              <Input type="time" />
            </Label>
          </div>
        </section>
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="flex justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold">Ticket Types</h2>
              <p className="mt-1 text-sm text-muted-foreground">Quantity-based tickets.</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => setTicketRows(v => v + 1)}>
              <Plus /> Add type
            </Button>
          </div>
          <div className="mt-5 space-y-4">
            {Array.from({ length: ticketRows }, (_, i) => (
              <div key={i} className="grid gap-3 rounded-lg bg-soft p-4 sm:grid-cols-3">
                <Label>
                  Name
                  <Input defaultValue={i === 0 ? 'Silver' : i === 1 ? 'Gold' : ''} />
                </Label>
                <Label>
                  Price
                  <Input type="number" defaultValue={i === 0 ? '300' : i === 1 ? '500' : ''} />
                </Label>
                <Label>
                  Quantity
                  <Input type="number" defaultValue={i === 0 ? '100' : i === 1 ? '50' : ''} />
                </Label>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-xl border border-border bg-card p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Label>
              <span>Terms</span>
              <textarea className="min-h-28 rounded-md border border-input bg-background p-3" defaultValue="Arrive 30 mins before showtime." />
            </Label>
            <Label>
              <span>Refund Policy</span>
              <textarea className="min-h-28 rounded-md border border-input bg-background p-3" defaultValue="Non-refundable unless cancelled." />
            </Label>
          </div>
        </section>
        <div className="flex flex-wrap justify-end gap-3">
          <Button type="button" variant="outline">
            Save Draft
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit for Approval'}
          </Button>
        </div>
      </form>
    </WorkspaceLayout>
  )
}

export function OrganizerEventDetail() {
  const { eventId } = useParams({ from: '/organizer/events/$eventId' })
  const [e, setEvent] = useState<EventItem>(primaryEvent)

  useEffect(() => {
    getEventBySlug(eventId).then(res => {
      if (res) setEvent(res)
    })
  }, [eventId])

  return (
    <WorkspaceLayout kind="organizer">
      <Heading title={e.title} copy="Organizer event preview." action={<StatusBadge status={e.status ?? 'Draft'} />} />
      <img src={e.image} alt={`${e.title}`} width={1536} height={1024} className="h-72 w-full rounded-xl object-cover" />
      <div className="mt-6 grid gap-5 rounded-xl border border-border bg-card p-6 sm:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">Date & time</p>
          <p className="font-bold">
            {e.date} · {e.time}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Venue</p>
          <p className="font-bold">{e.venue}, Pune</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-sm text-muted-foreground">Description</p>
          <p className="mt-1 leading-7">{e.description}</p>
        </div>
      </div>
    </WorkspaceLayout>
  )
}

export function OrganizerOrders() {
  const [ordersList, setOrdersList] = useState<Order[]>(initialOrders)

  useEffect(() => {
    getOrganizerOrders().then(res => setOrdersList(res))
  }, [])

  return (
    <WorkspaceLayout kind="organizer">
      <Heading title="Orders" copy="Customer bookings for your events." />
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-soft">
            <tr>
              {['Booking ID', 'Customer', 'Event', 'Session', 'Tickets', 'Amount', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ordersList.map(o => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-4 py-4 font-semibold">{o.id}</td>
                <td className="px-4">{o.customer}</td>
                <td className="px-4">{o.event}</td>
                <td className="px-4">{o.session}</td>
                <td className="px-4">{o.tickets}</td>
                <td className="px-4">₹{o.amount}</td>
                <td className="px-4">
                  <StatusBadge status={o.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </WorkspaceLayout>
  )
}

export function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(1)

  useEffect(() => {
    getPendingEvents().then(res => setPendingCount(res.length))
  }, [])

  return (
    <WorkspaceLayout kind="admin">
      <Heading title="Admin overview" copy="Event moderation status." />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Pending Events" value={pendingCount.toString()} icon={Clock3} />
        <Stat label="Approved Events" value="2" icon={CheckCircle2} />
        <Stat label="Rejected Events" value="1" icon={XCircle} />
      </div>
    </WorkspaceLayout>
  )
}

export function AdminEvents() {
  const [pendingList, setPendingList] = useState<EventItem[]>([])

  useEffect(() => {
    getPendingEvents().then(res => setPendingList(res))
  }, [])

  return (
    <WorkspaceLayout kind="admin">
      <Heading title="Pending Events" copy="Review organizer submissions." />
      <div className="space-y-4">
        {pendingList.map(e => (
          <article key={e.id} className="grid gap-4 rounded-xl border border-border bg-card p-4 sm:grid-cols-[90px_minmax(0,1fr)_auto] sm:items-center">
            <img src={e.image} alt="" width={1024} height={1280} className="size-20 rounded-lg object-cover" />
            <div className="min-w-0">
              <h2 className="font-bold">{e.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {e.organizer} · {e.date} · {e.venue}
              </p>
              <div className="mt-2">
                <StatusBadge status={e.status ?? 'Pending Approval'} />
              </div>
            </div>
            <Button asChild>
              <Link to="/admin/events/$eventId" params={{ eventId: e.id }}>
                Review
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </WorkspaceLayout>
  )
}

export function AdminReview() {
  const { eventId } = useParams({ from: '/admin/events/$eventId' })
  const navigate = useNavigate()
  const [e, setEvent] = useState<EventItem>(primaryEvent)
  const [status, setStatus] = useState(e.status ?? 'Pending Approval')

  useEffect(() => {
    getEventBySlug(eventId).then(res => {
      if (res) {
        setEvent(res)
        setStatus(res.status || 'Pending Approval')
      }
    })
  }, [eventId])

  const handleApprove = async () => {
    await approveEvent(eventId)
    setStatus('Approved')
    toast.success('Event approved and published!')
    navigate({ to: '/admin/events' })
  }

  const handleReject = async () => {
    await rejectEvent(eventId)
    setStatus('Rejected')
    toast.error('Event rejected.')
    navigate({ to: '/admin/events' })
  }

  return (
    <WorkspaceLayout kind="admin">
      <Heading title="Event Review" copy="Review complete event information." action={<StatusBadge status={status} />} />
      <div className="grid gap-7 lg:grid-cols-[1fr_320px]">
        <div>
          <img src={e.image} alt={`${e.title}`} width={1536} height={1024} className="h-72 w-full rounded-xl object-cover" />
          <div className="mt-5 rounded-xl border border-border bg-card p-6">
            <p className="text-sm font-bold uppercase text-primary">{e.category}</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold">{e.title}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{e.description}</p>
            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Organizer</dt>
                <dd className="font-bold">{e.organizer}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Venue</dt>
                <dd className="font-bold">{e.venue}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Date</dt>
                <dd className="font-bold">{e.date}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Time</dt>
                <dd className="font-bold">{e.time}</dd>
              </div>
            </dl>
          </div>
        </div>
        <aside className="rounded-xl border border-border bg-card p-6 self-start">
          <h3 className="font-display text-xl font-bold">Review decision</h3>
          <p className="mt-2 text-sm text-muted-foreground">Moderate this event listing.</p>
          <div className="mt-6 grid gap-3">
            <Button onClick={handleApprove}>
              <CheckCircle2 /> Approve Event
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              <XCircle /> Reject Event
            </Button>
          </div>
        </aside>
      </div>
    </WorkspaceLayout>
  )
}
