import { Link, useRouterState } from '@tanstack/react-router'
import { MapPin, Menu, Search, UserRound, X, LogIn } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Brand } from './Brand'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { AuthModal } from './AuthModal'

const links = [['/', 'Home'], ['/events', 'Events'], ['/events', 'Theatre']] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const path = useRouterState({ select: s => s.location.pathname })

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:flex lg:px-8">
          <Link to="/" aria-label="RangTix home">
            <Brand />
          </Link>
          <nav className="mx-auto hidden items-center gap-1 lg:flex">
            {links.map(([to, label], i) => {
              const active = i === 0 ? path === '/' : i === 1 ? path.startsWith('/events') : false
              return (
                <Link
                  key={label}
                  to={to}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    active ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-soft hover:text-foreground'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
          <div className="flex shrink-0 items-center gap-1">
            <Button variant="ghost" className="hidden sm:inline-flex">
              <MapPin /> Pune
            </Button>
            <Button variant="ghost" size="icon" aria-label="Search events" asChild>
              <Link to="/events">
                <Search />
              </Link>
            </Button>
            {user ? (
              <Button variant="ghost" size="icon" aria-label="View profile" asChild>
                <Link to="/profile">
                  <UserRound />
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setAuthOpen(true)} className="gap-1 font-semibold">
                <LogIn className="size-4" /> Log In
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && (
          <nav className="animate-fade-in border-t border-border bg-background px-4 py-3 lg:hidden">
            {links.map(([to, label]) => (
              <Link
                key={label}
                to={to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-semibold hover:bg-accent hover:text-primary"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/my-tickets"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 font-semibold hover:bg-accent hover:text-primary"
            >
              My Tickets
            </Link>
            {!user && (
              <button
                onClick={() => {
                  setOpen(false)
                  setAuthOpen(true)
                }}
                className="block w-full text-left rounded-lg px-3 py-3 font-semibold hover:bg-accent hover:text-primary text-primary"
              >
                Log In / Sign Up
              </button>
            )}
          </nav>
        )}
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  )
}

const footerLinkClass = 'text-sm text-muted-foreground transition-colors hover:text-primary'

export function Footer() {
  return (
    <footer className="border-t border-border bg-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Brand />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Thoughtful theatre discovery and simple ticket booking for Pune.
          </p>
        </div>
        <div>
          <h3 className="font-bold">Explore</h3>
          <div className="mt-4 grid gap-3">
            <Link className={footerLinkClass} to="/events">
              Events
            </Link>
            <Link className={footerLinkClass} to="/events">
              Theatre
            </Link>
            <Link className={footerLinkClass} to="/my-tickets">
              My Tickets
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">For Organizers</h3>
          <div className="mt-4 grid gap-3">
            <Link className={footerLinkClass} to="/organizer">
              Organizer Login
            </Link>
            <Link className={footerLinkClass} to="/organizer/events/create">
              Create an Event
            </Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Support</h3>
          <div className="mt-4 grid gap-3">
            <a className={footerLinkClass} href="mailto:hello@rangtix.example">
              Contact
            </a>
            <Link className={footerLinkClass} to="/profile">
              Help
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 RangTix. Pune Theatre & Event Ticketing Platform.
      </div>
    </footer>
  )
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
