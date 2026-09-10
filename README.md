# The Animal Place

Private veterinary website and clinic workspace with appointments, patient notes, vaccine records and itemized invoices. Durable D1 records are scoped to the signed-in account. The initial hosted site is owner-only.

## Before a public clinic launch
Confirm clinic name, contact details, veterinarian information and opening hours. Configure a staff membership model and shared clinic intake before enabling public access: current records are account-scoped and appointment requests require sign-in. No SMS/WhatsApp reminders or payment gateway are connected. Recording a payment tracks an offline payment only. Vaccine due dates are clinician-entered.

## Validation
TypeScript and production build passed. Local integration checks covered anonymous access rejection, record persistence, appointment creation, invalid vaccine dates, invoice rounding and payment updates. WebMCP navigation is feature-detected; no supported validation context was available. Browser visual testing was not requested.

## Development
Use the package scripts in package.json. Database schema is db/schema.ts; migrations are under drizzle. See the Sites skill for publishing. Apply local migrations using Wrangler with the generated dist/server/wrangler.json config.
