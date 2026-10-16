import type { Metadata } from "next";
import { LOCATIONS, getLocation } from "@/data/locations";
import { getResort } from "@/data/resorts";
import {
  cheapestAccess,
  liftChoices,
  DEFAULT_CAR,
  DEFAULT_GEAR,
} from "@/lib/choices";
import { quote, tripQuote } from "@/lib/quote";
import { cheapestStay, openingStay } from "@/lib/cost";
import type { SkiTrip, Stay, Trip } from "@/lib/types";

export const SITE_NAME = "Trips";

/**
 * Where link previews point. This used to be a made-up
 * https://tahoe-night-laps.local, and an explicit metadataBase beats Vercel's
 * own, so every og:image URL on the deployed site pointed at a host that
 * doesn't exist. Vercel sets the production domain at build time; local
 * builds fall back to localhost.
 */
export const SITE_URL = new URL(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`
);

/**
 * The Open Graph fields every page shares. A page that sets `openGraph`
 * replaces the parent's object wholesale rather than merging it, so each page
 * spreads this in; otherwise the site name and type quietly vanish.
 */
export const OG_BASE = {
  siteName: SITE_NAME,
  type: "website",
  locale: "en_US",
} satisfies NonNullable<Metadata["openGraph"]>;

/**
 * What one person pays on a ski trip with every choice at its default: the
 * cheapest pass covering the trip, the house the trip names, and Bill's gear
 * and car defaults. The share card leads with it. null when a price is
 * missing — a card never shows a number the page wouldn't.
 */
export function planQuote(trip: SkiTrip) {
  const resort = trip.ski.resort ? getResort(trip.ski.resort) : undefined;
  if (!resort) return null;
  const lift = cheapestAccess(
    resort.slug,
    trip.ski.age,
    liftChoices(LOCATIONS, trip.ski.skiDates)
  );
  const stays = getLocation(resort.locationSlug)?.stays ?? [];
  // The trip's own house when it names one; otherwise the cheapest house on
  // its shortlist that is quoted at our headcount — and the card says "from".
  const named = stays.find((s) => s.id === trip.stay);
  const cheapest = cheapestStay(
    (trip.shortlist ?? [])
      .map((id) => stays.find((s) => s.id === id))
      .filter((s): s is Stay => !!s),
    trip.people
  );
  const stay = named ?? cheapest;
  if (!lift || !stay) return null;
  const q = quote(lift, stay, DEFAULT_GEAR, DEFAULT_CAR, trip.people, trip.ski.skiDays);
  return q && { ...q, lift, resort, fromCheapest: !named };
}

/**
 * What one person pays for any trip at its defaults, for the trip cards and
 * the share images. `from` when the house was picked as the cheapest rather
 * than decided. null when there is no honest total yet.
 */
export function tripPrice(trip: Trip): { perPerson: number; from: boolean } | null {
  if (trip.kind === "ski") {
    const q = planQuote(trip);
    return q && { perPerson: q.perPerson, from: q.fromCheapest };
  }
  const { stay, named } = openingStay(trip);
  const q = tripQuote(stay, trip.costs, trip.people);
  return q && { perPerson: q.perPerson, from: !!stay && !named && trip.stays.length > 1 };
}
