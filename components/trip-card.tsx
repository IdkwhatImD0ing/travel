import Link from "next/link";
import { KIND, KindTag } from "@/components/kind";
import { CHIP_RATE_OFF } from "@/components/chips";
import { tripGroup } from "@/data/trips";
import { money } from "@/lib/cost";
import { tripPrice } from "@/lib/site";
import { tripDatesLabel, type Trip } from "@/lib/types";

/** The cards on the home page sit in this grid. min() keeps a 390px phone from scrolling sideways. */
export const TRIP_CARDS =
  "grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-3";

const CARD =
  "group relative grid content-start gap-2 overflow-hidden rounded border border-hair bg-pane px-[18px] pb-4 pt-[19px] no-underline transition-colors hover:border-ridge hover:bg-snow/5";

/**
 * One trip on the home page: what kind, where, when, how many of us, and what
 * one person pays at the trip's defaults. A trip with several versions shows
 * its first, and says how many there are. No price is said in words, the same
 * way every other missing price on the site is.
 */
export function TripCard({ trip }: { trip: Trip }) {
  const price = tripPrice(trip);
  const versions = tripGroup(trip).length;
  const facts = [
    tripDatesLabel(trip) ?? "no dates yet",
    trip.people ? `${trip.people} people` : "headcount open",
    versions > 1 && `${versions} versions`,
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <Link href={`/trips/${trip.slug}`} className={CARD}>
      <span aria-hidden className={`absolute inset-x-0 top-0 h-[3px] ${KIND[trip.kind].bar}`} />
      <span>
        <KindTag kind={trip.kind} />
      </span>
      <span className="pr-6 font-display text-[1.25rem] font-bold leading-tight tracking-[-0.02em] [font-stretch:108%]">
        {trip.title}
      </span>
      <span className="font-data text-[11px] uppercase tracking-[0.09em] text-muted">
        {facts}
      </span>
      {trip.blurb && (
        <span className="line-clamp-2 text-[13.5px] leading-snug text-snow/72">
          {trip.blurb}
        </span>
      )}
      {price ? (
        <span className="mt-1 font-data text-[1.3rem] font-bold tracking-[-0.03em] text-glacier tabular-nums">
          {price.from && (
            <span className="mr-1.5 text-[12px] font-normal tracking-normal text-muted">
              from
            </span>
          )}
          {money(price.perPerson)}
          <span className="ml-1 text-[11.5px] font-normal tracking-normal text-muted">
            per person
          </span>
          {trip.kind !== "ski" && trip.totalNote && (
            <span className="block font-body text-[11.5px] font-normal tracking-normal text-muted">
              {trip.totalNote}
            </span>
          )}
        </span>
      ) : (
        <span className={`${CHIP_RATE_OFF} mt-1`}>no price yet</span>
      )}
      <span
        aria-hidden
        className="absolute right-[18px] top-[17px] text-muted transition-colors group-hover:text-sodium"
      >
        →
      </span>
    </Link>
  );
}
