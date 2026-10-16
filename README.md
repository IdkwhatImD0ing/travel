# Travel

Bill's travel planning site. San Jose based. Every trip gets a page that says what one person pays, and every price links to the page it came from.

Ski trips are one kind among others (beach, city, diving, road trips). They get the full ski calculator: lift passes, blackout dates, gear and cars.

```bash
npm install && npm run dev   # port 3000, or the next free one
npm run lint && npm run build
```

## Pages

| URL | What it is |
|---|---|
| `/` | Every trip as a card: upcoming first, then ideas |
| `/trips/<slug>` | One trip. Ski trips get the ski calculator; others get houses, other costs, and a total |
| `/ski` | The open Tahoe board: 8 people over New Year, pick any mountain |
| `/explore` | The ski explorer: any headcount, any pass, any house we have a price for |

## Adding a trip

Add it to `data/trips.ts`. It gets a page and a home-page card.

- Every trip has a `kind`, a `place` and a `status` (`"upcoming"` or `"idea"`).
- A ski trip has dates, a headcount and a `ski` section (mountain, ski days, age for lift prices). Its houses live with the ski area in `data/locations.ts`.
- Any other trip carries its own `stays` (pick one) and `costs` (flights, boats, tours, each one paid by everybody). Dates and headcount can wait until they're settled.

## Layout

```
data/         trips.ts (every trip), locations.ts + resorts.ts (Tahoe ski data)
lib/          types, pricing (quote.ts), helpers
components/   page pieces; scenario.tsx is the ski calculator
proposals/    TEMPLATE.md, for pitching a trip in writing
research/     ski pricing, deals, rentals, logistics (dated, sourced)
```

`HANDOFF.md` explains how the site works for whoever works on it next.

## Ground rules for prices

- Every price carries a **source URL** and the date it was read.
- A price we don't have shows as "no price yet". Never a zero, never a guess.
- Last season's price is labeled as last season's, never passed off as current.
- Purchase deadlines go at the top. That's where money is won or lost.
- Re-check prices before committing money.

## Ski trips: the benchmark

Every ski trip gets measured against the same yardstick:

> **$60/day on lift**, from Boreal's 4-pack at about $240, with rentals either on site or picked up in San Jose.

A ski trip is worth pitching if it beats that on price, or clearly justifies costing more (better terrain, better for the group, shorter drive).
