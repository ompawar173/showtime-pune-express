# Pune Theatre Pass

BUILD PHASE 1 FRONTEND/UI ONLY — NO BACKEND

EXECUTE THIS DIRECTLY IN THE EXISTING PROJECT.

IMPORTANT:

Do NOT create your own product plan.

Do NOT expand the scope.

Do NOT build backend functionality.

Do NOT connect Supabase.

Do NOT create database migrations.

Do NOT create APIs.

Do NOT integrate payment gateways.

I will use Antigravity later for:

- Supabase

- Database

- Authentication

- Backend APIs

- Payment integration

- Webhooks

- QR validation

- Security/RLS

- Production backend logic

For now, Lovable must focus ONLY on creating a polished, production-quality FRONTEND/UI.

Use mock/local data and frontend state wherever functionality is needed for demonstration.

============================================================

1. PRODUCT OVERVIEW

============================================================

We are building a modern live entertainment and theatre ticketing platform.

Initial launch focus:

CITY:

Pune

INITIAL CATEGORY:

Marathi/Hindi Theatre

The long-term platform can eventually support:

- Theatre

- Drama

- Comedy

- Music

- Concerts

- Live Shows

- Festivals

- Workshops

- Experiences

- Other entertainment events

BUT DO NOT BUILD THESE ADDITIONAL CATEGORIES AS FULL FUNCTIONAL FEATURES NOW.

Phase 1 should visually focus on:

Pune + Marathi/Hindi Theatre.

The goal is to create a beautiful ticket-booking experience that can later be connected to a real backend.

============================================================

2. DESIGN INSPIRATION

============================================================

Take general UX inspiration from the event discovery and ticket booking experience of platforms such as:

- BookMyShow

- Fizmaa

BUT:

DO NOT COPY THEIR:

- Branding

- Logo

- Exact layouts

- Exact colors

- Typography

- Components

- Content

- Visual identity

Create a completely original visual identity for this product.

The product should feel:

Modern

Premium

Entertainment-focused

Clean

Trustworthy

Simple

Mobile-friendly

============================================================

3. UI TECHNOLOGY

============================================================

Use:

React

Tailwind CSS

Use Tailwind CSS utility classes consistently for styling.

Keep the component architecture clean and reusable.

Recommended structure:

src/

  components/

  pages/

  layouts/

  mock/

  services/

  types/

  hooks/

  assets/

Keep mock data separated from UI components.

Create reusable components for:

- Header

- Footer

- EventCard

- EventGrid

- CategoryCard

- SearchBar

- CitySelector

- FilterBar

- SessionCard

- TicketTypeCard

- QuantitySelector

- PriceSummary

- BookingCard

- DigitalTicket

- StatusBadge

- Button

- Modal

- Form components

============================================================

4. LIGHT THEME ONLY

============================================================

THIS IS VERY IMPORTANT.

The entire application MUST use a LIGHT THEME.

DO NOT create dark mode.

DO NOT create a dark mode toggle.

DO NOT use automatic system dark-mode detection.

DO NOT create dark dashboards.

DO NOT use black/dark hero sections.

The application should always remain light.

============================================================

5. COLOR SYSTEM

============================================================

Use LIGHT PURPLE + WHITE as the main visual identity.

Primary Purple:

#7C3AED

Secondary Purple:

#8B5CF6

Light Purple:

#A78BFA

Very Light Lavender:

#F5F3FF

Page Background:

#FFFFFF

Soft Background:

#FAF9FF

Primary Text:

#18181B

Secondary Text:

#71717A

Border:

#E9E7F2

Success:

#16A34A

Error:

#DC2626

The visual balance should approximately feel like:

70–80% white/light neutral

15–20% light lavender

5–10% stronger purple accents

DO NOT make everything purple.

Purple should be used mainly for:

- Primary CTAs

- Active navigation

- Selected states

- Important links

- Icons

- Badges

- Ticket highlights

- Important information

White should be used for:

- Main backgrounds

- Cards

- Navigation

- Checkout

- Forms

- Digital tickets

Light lavender should be used for:

- Sections

- Selected states

- Background highlights

- Category areas

- Supporting content

Avoid:

- Neon colors

- Excessive gradients

- Black backgrounds

- Dark purple full-page backgrounds

- Gold-heavy design

- Rainbow colors

- Excessive glassmorphism

============================================================

6. TYPOGRAPHY

============================================================

Use a modern clean font.

Preferred:

Inter

or

Plus Jakarta Sans

Typography should feel:

Modern

Clean

Premium

Readable

Use:

- Large bold headings

- Medium-weight subheadings

- Comfortable body text

- Clear pricing

- Strong CTA text

Maintain excellent hierarchy.

============================================================

7. GLOBAL HEADER

============================================================

Create a premium white header.

Desktop:

LEFT:

Logo

CENTER:

Home

Events

Theatre

RIGHT:

City selector

Search

Login/Profile

Use a subtle bottom border.

Header may be sticky.

DO NOT use a dark navigation bar.

Logo should use the purple brand color.

Active navigation should use:

Purple text

Subtle lavender background or underline

Mobile:

Use a clean mobile navigation.

Logo

Search

Menu/Profile

Make sure navigation is easy to use on mobile.

============================================================

8. HOME PAGE

============================================================

Create a beautiful premium entertainment homepage.

Structure:

1. Header

2. Hero

3. Featured Theatre

4. Upcoming Events

5. Browse Categories

6. Popular in Pune

7. Why Choose Us

8. CTA section

9. Footer

------------------------------------------------------------

HERO

------------------------------------------------------------

Use a bright light hero.

Background:

White / very light lavender.

Use a large theatre/event image as the visual focus.

Headline:

"Experience Theatre Live"

Supporting text:

"Discover Marathi & Hindi theatre performances happening in Pune."

Primary CTA:

"Explore Events"

Secondary CTA:

"Browse Theatre"

Add subtle purple decorative elements.

Do NOT make the hero dark.

------------------------------------------------------------

FEATURED THEATRE

------------------------------------------------------------

Heading:

"Featured Theatre"

Supporting text:

"Discover performances worth experiencing."

Show beautiful event cards.

------------------------------------------------------------

UPCOMING EVENTS

------------------------------------------------------------

Heading:

"Upcoming Events"

Show several event cards.

Each card:

Event image

Event title

Category

Date

Time

Venue

City

Starting price

Book Tickets button

------------------------------------------------------------

BROWSE CATEGORIES

------------------------------------------------------------

Create category cards:

Theatre

Drama

Comedy

Music

Live Shows

For Phase 1, Theatre should be the primary/highlighted category.

Use:

White cards

Purple icons

Light lavender backgrounds

------------------------------------------------------------

POPULAR IN PUNE

------------------------------------------------------------

Show several demo events.

Use:

"Popular in Pune"

Include:

Event image

Title

Venue

Date

Starting price

------------------------------------------------------------

WHY CHOOSE US

------------------------------------------------------------

Create a clean section with 3–4 benefits:

Easy Booking

Secure Tickets

Discover Local Theatre

Digital Tickets

Use purple icons and light backgrounds.

------------------------------------------------------------

CTA SECTION

------------------------------------------------------------

Create a simple light lavender CTA section.

Example:

"Ready for your next theatre experience?"

Button:

"Explore Events"

============================================================

9. EVENT LISTING PAGE

============================================================

Create:

/events

Page layout:

Header

Page title

Search

Filters

Event grid

Heading:

"Discover Events in Pune"

Filters:

Category

Date

Venue

Search:

"Search theatre, events or performers..."

Sort:

Recommended

Date

Price

Event cards should be responsive.

Desktop:

3 or 4 columns depending on screen width.

Tablet:

2 columns.

Mobile:

1 column.

============================================================

10. EVENT CARD

============================================================

Create a reusable premium EventCard.

Structure:

IMAGE

Badge:

THEATRE

Title:

"Ek Marathi Natak"

Date:

10 Oct 2026

Time:

7:00 PM

Venue:

Bal Gandharva Rang Mandir

Location:

Pune

Price:

From ₹300

Button:

"Book Tickets"

Hover:

- Slight image zoom

- Subtle elevation

- Purple CTA transition

Use:

White background

Rounded-xl/2xl

Light border

Soft shadow

============================================================

11. EVENT DETAILS PAGE

============================================================

Create a premium event details page.

Top:

Large event banner/image.

Below:

Event title

Category

Date

Time

Venue

Location

Main sections:

About the Event

Cast / Performers

Available Sessions

Ticket Information

Terms & Conditions

Refund Policy

CTA:

"Book Tickets"

------------------------------------------------------------

EVENT DETAILS EXAMPLE

------------------------------------------------------------

Title:

"Ek Marathi Natak"

Category:

Marathi Theatre

Venue:

Bal Gandharva Rang Mandir

City:

Pune

Description:

Use realistic fictional demo content.

Clearly mark demo content as sample where appropriate.

============================================================

12. SESSION SELECTION

============================================================

Create a session selector.

Example:

Saturday

10 October

7:00 PM

Sunday

11 October

7:00 PM

Use cards.

Selected session:

Purple border

Light lavender background

Unselected:

White

Light border

CTA:

"Continue"

============================================================

13. TICKET SELECTION

============================================================

IMPORTANT:

NO SEAT MAP.

NO INDIVIDUAL SEATS.

NO ROWS.

NO SECTIONS.

NO SEAT SELECTION.

This Phase 1 system uses quantity-based tickets.

Example:

SILVER

₹300

[-] 1 [+]

GOLD

₹500

[-] 2 [+]

Show:

Subtotal

Booking Fee

Total

CTA:

"Continue to Checkout"

Use frontend state to update quantities and totals.

Do not connect to a backend.

============================================================

14. CHECKOUT PAGE

============================================================

Create:

/checkout

Use a clean light checkout interface.

Desktop:

LEFT:

Customer Information

Booking Details

RIGHT:

Order Summary

Customer fields:

Full Name

Email

Phone

Booking summary:

Event

Session

Venue

Tickets

Quantity

Price summary:

Subtotal

Convenience Fee

Total

CTA:

"Proceed to Payment"

Use a purple primary button.

Do not connect a real payment gateway.

============================================================

15. PAYMENT UI

============================================================

Create a FRONTEND-ONLY simulated payment experience.

This is only for demonstrating the UI.

Provide three possible states:

SUCCESS

FAILED

PENDING

Development buttons can switch between states.

SUCCESS:

"Payment Successful"

"Your booking has been confirmed."

Button:

"View Ticket"

FAILED:

"Payment Failed"

"Your payment could not be completed."

Button:

"Try Again"

PENDING:

"Payment Pending"

"We're waiting for payment confirmation."

Do NOT implement real payment processing.

Do NOT connect Razorpay.

============================================================

16. BOOKING CONFIRMATION

============================================================

Create a premium confirmation page.

Show:

✓ Booking Confirmed

Booking ID:

CMW-2026-001245

Event

Date

Time

Venue

Tickets

Quantity

Total Paid

Buttons:

"View Digital Ticket"

"Go to My Tickets"

Use mock data.

============================================================

17. DIGITAL TICKET

============================================================

Create a beautiful mobile-friendly digital ticket.

The ticket should primarily be WHITE.

Use purple accents.

Include:

Event image

Event title

Customer name

Date

Time

Venue

Ticket type

Quantity

Booking ID

QR placeholder

Entry instructions

Create a visually realistic QR placeholder.

IMPORTANT:

This is ONLY a visual placeholder.

Do NOT implement QR validation.

Do NOT create QR backend logic.

Make the ticket look excellent on mobile.

============================================================

18. MY TICKETS PAGE

============================================================

Create:

/my-tickets

Tabs:

Upcoming

Past

Ticket cards should show:

Event image

Event title

Date

Time

Venue

Ticket type

Booking ID

Status

CTA:

"View Ticket"

Use mock data.

============================================================

19. PROFILE PAGE

============================================================

Create:

/profile

Sections:

Profile Information

Name

Email

Phone

My Tickets

Bookings

Logout

Frontend only.

============================================================

20. ORGANIZER UI

============================================================

Create organizer frontend screens.

No backend.

Pages:

/organizer

/organizer/events

/organizer/events/create

/organizer/events/:id

/organizer/orders

------------------------------------------------------------

ORGANIZER DASHBOARD

------------------------------------------------------------

Keep it simple.

Show:

Total Events

Published Events

Pending Events

Tickets Sold

These are mock/demo numbers.

DO NOT build advanced analytics.

No charts are required.

------------------------------------------------------------

MY EVENTS

------------------------------------------------------------

Show:

Event image

Event title

Date

Venue

Status

Statuses:

Draft

Pending Approval

Approved

Rejected

Published

Buttons:

View

Edit

------------------------------------------------------------

CREATE EVENT

------------------------------------------------------------

Create a polished form.

Fields:

Event Title

Description

Category

Banner Image

Venue Name

Venue Address

City

Session Date

Start Time

End Time

Ticket Types:

Silver

Price

Quantity

Gold

Price

Quantity

Terms

Refund Policy

Buttons:

Save Draft

Submit for Approval

Use frontend state only.

------------------------------------------------------------

ORGANIZER ORDERS

------------------------------------------------------------

Create a clean order table.

Columns:

Booking ID

Customer

Event

Session

Tickets

Amount

Status

Use mock data.

============================================================

21. ADMIN UI

============================================================

Create ONLY basic admin UI.

Pages:

/admin

/admin/events

/admin/events/:id

------------------------------------------------------------

ADMIN DASHBOARD

------------------------------------------------------------

Simple overview:

Pending Events

Approved Events

Rejected Events

No complex analytics.

------------------------------------------------------------

PENDING EVENTS

------------------------------------------------------------

Table/card:

Event

Organizer

Date

Venue

Submitted

Status

Button:

"Review"

------------------------------------------------------------

EVENT REVIEW

------------------------------------------------------------

Show complete event information.

Buttons:

"Approve Event"

"Reject Event"

Use frontend state only.

============================================================

22. MOCK DATA

============================================================

Create realistic sample data.

Example:

Event:

"Ek Marathi Natak"

Category:

Marathi Theatre

Venue:

Bal Gandharva Rang Mandir

City:

Pune

Session:

10 October 2026

7:00 PM

Ticket Types:

Silver — ₹300

Gold — ₹500

Create at least 6–8 fictional demo events so the UI looks realistic.

Use different:

- Event images

- Titles

- Venues

- Dates

- Prices

Clearly treat all demo organizers/events as sample data.

Do not claim fictional events are real.

============================================================

23. FRONTEND STATE

============================================================

Use frontend/local state for:

- Selected city

- Search

- Filters

- Selected event

- Selected session

- Ticket quantities

- Checkout information

- Payment simulation

- Booking confirmation

- Ticket display

- Organizer event creation demo

- Admin approve/reject demo

Keep this logic clean so it can later be replaced with API calls.

============================================================

24. MOCK SERVICE LAYER

============================================================

Create a simple mock service layer.

For example:

src/services/mock/

Keep mock functions separate.

Examples:

getEvents()

getEventById()

getSessions()

getTicketTypes()

createMockOrder()

simulatePayment()

getMyTickets()

getOrganizerEvents()

getOrganizerOrders()

getPendingEvents()

approveMockEvent()

rejectMockEvent()

These should be frontend-only.

Later Antigravity can replace these functions with real backend/API services.

============================================================

25. RESPONSIVE DESIGN

============================================================

The entire application MUST be responsive.

Desktop

Laptop

Tablet

Mobile

Mobile is extremely important because customers will primarily use the ticketing experience from phones.

Pay special attention to:

- Header

- Search

- Event cards

- Event details

- Ticket selection

- Checkout

- Digital ticket

- Organizer forms

- Admin tables

Admin/organizer tables should become mobile-friendly cards or horizontally scrollable where appropriate.

============================================================

26. ANIMATIONS

============================================================

Use subtle professional animations.

Examples:

- Fade in

- Slide up

- Card hover

- Image zoom

- Button hover

- Smooth transitions

- Page transitions where appropriate

Use Tailwind transitions/animations where possible.

Do NOT over-animate.

The experience should feel premium and fast.

============================================================

27. ACCESSIBILITY

============================================================

Implement good accessibility practices.

Use:

- Semantic HTML

- Proper labels

- Keyboard-friendly controls

- Visible focus states

- Alt text for images

- Good contrast

- Accessible buttons

- Accessible form errors

============================================================

28. PERFORMANCE

============================================================

Keep the UI lightweight.

Avoid unnecessary libraries.

Optimize image usage.

Use reusable components.

Avoid excessive animations.

Do not introduce unnecessary dependencies.

============================================================

29. BACKEND SEPARATION

============================================================

THIS PROJECT IS FRONTEND ONLY.

DO NOT BUILD:

❌ Supabase

❌ Database

❌ Database migrations

❌ RLS

❌ Authentication backend

❌ API endpoints

❌ Edge Functions

❌ Payment gateway

❌ Razorpay

❌ Webhooks

❌ Real QR generation/validation backend

❌ Refund backend

❌ Settlement backend

❌ Email backend

❌ SMS backend

❌ WhatsApp backend

All functionality must currently work using mock/local data.

The code should be structured so that Antigravity can later connect:

Frontend

↓

API/Backend

↓

Supabase

without requiring a complete frontend rewrite.

============================================================

30. NO EXTRA FEATURES

============================================================

DO NOT BUILD:

❌ Seat maps

❌ Seat selection

❌ Seat holds

❌ Coupons

❌ Discount engine

❌ Loyalty

❌ Wallet

❌ Subscription

❌ Reviews

❌ Chat

❌ Recommendation engine

❌ Advanced analytics

❌ Revenue analytics

❌ Settlements

❌ Organizer payouts

❌ Automated refunds

❌ Offline QR validation

❌ Multiple-city marketplace

❌ Complex organizer verification

❌ Mobile app

❌ AI recommendation system

These may be future phases.

Do NOT add them now.

============================================================

31. UI QUALITY REQUIREMENT

============================================================

Do not create a generic template.

The UI should feel like a real product ready for launch.

Prioritize:

Premium visual hierarchy

Beautiful event imagery

Strong typography

Excellent spacing

Clean cards

Smooth interactions

Simple booking flow

Trustworthy checkout

Excellent mobile experience

The most important user journey is:

HOME

↓

EVENTS

↓

EVENT DETAILS

↓

SESSION

↓

TICKET QUANTITY

↓

CHECKOUT

↓

SIMULATED PAYMENT

↓

CONFIRMATION

↓

DIGITAL TICKET

Make this journey extremely polished.

============================================================

32. BRAND FEEL

============================================================

The visual identity should communicate:

THEATRE

ENTERTAINMENT

DISCOVERY

MODERN TECHNOLOGY

PREMIUM EXPERIENCE

TRUST

SIMPLICITY

Main visual language:

WHITE

+

LIGHT LAVENDER

+

PURPLE

Do NOT make it look like a banking app.

Do NOT make it look like a generic SaaS dashboard.

Do NOT make it look like a dark entertainment website.

============================================================

33. FINAL TECHNICAL INSTRUCTION

============================================================

Use Tailwind CSS.

Use reusable React components.

Use frontend/local mock data.

Keep mock data and mock services separate from components.

Use clean routing.

Keep the project easy for another developer/AI agent to connect to a real backend later.

Do not unnecessarily rewrite the existing project architecture.

First inspect the existing project.

Reuse existing components and dependencies where appropriate.

============================================================

34. FINAL EXECUTION INSTRUCTION

============================================================

EXECUTE THIS DIRECTLY IN THE EXISTING PROJECT.

DO NOT CREATE A NEW PLAN.

DO NOT ASK ME TO DESIGN THE PRODUCT AGAIN.

FOLLOW THIS SPECIFICATION DIRECTLY.

BUILD THE UI.

DO NOT CONNECT A BACKEND.

DO NOT CONNECT SUPABASE.

DO NOT CONNECT PAYMENT.

DO NOT DEPLOY.

DO NOT PUSH TO GIT.

Everything must remain local/frontend/mock-data based at this stage.

============================================================

35. COMPLETION REPORT

============================================================

After completing the implementation, report:

1. Pages created

2. Routes created

3. Components created

4. Mock data created

5. Mock services created

6. Frontend interactions implemented

7. Responsive behavior implemented

8. Any dependencies added

9. Any known UI issues

10. Exact command to run the project locally

Do not provide a backend implementation.

Do not provide Supabase implementation.

Do not provide payment implementation.

Focus ONLY on the frontend UI.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://showtime-pune-express.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7557ee4b-45c6-47e5-816e-bea70d3e22ba).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
