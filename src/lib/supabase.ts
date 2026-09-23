import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://yrlmvbrbhnqknlumspg.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlybG12YnJiaG5xa25tbHVtc3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxODE0NjMsImV4cCI6MjEwNTc1NzQ2M30.poCz5jXvU_Th7QMvQb-MOEY4YjcuYPgZP9C4DXpZ4wc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
