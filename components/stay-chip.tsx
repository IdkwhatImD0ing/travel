"use client";

import { money, stayTotalFor } from "@/lib/cost";
import { listingUrl, type Stay } from "@/lib/types";
import {
  CHIP,
  CHIP_META,
  CHIP_NAME,
  CHIP_PROOF,
  CHIP_RATE,
  CHIP_RATE_OFF,
  CHIP_SUB,
  CHIP_UNIT,
  PILL,
} from "@/components/chips";

/**
 * One place to sleep, priced for the group. Shared by the ski calculator and
 * every other trip page, so a house reads the same wherever it shows up.
 */
export function StayChip({
  stay: s,
  people,
  picked,
  onPick,
  mark,
  trip,
}: {
  stay: Stay;
  /** Unset on a trip nobody has given a headcount yet: no share to show. */
  people?: number;
  picked: boolean;
  onPick: () => void;
  /** Bill's word on this house, in amber: "the plan", "cheapest", "splurge". */
  mark?: string;
  /** The dates and headcount the listing link should open on. */
  trip: { checkIn?: string; checkOut?: string; people?: number };
}) {
  const t = people ? stayTotalFor(s, people) : null;
  const fits = !people || people <= (s.sleepsMax ?? s.sleeps);
  return (
    // The listing link can't live inside the button — an <a> nested in a
    // <button> is invalid, and the click would be swallowed by the selection
    // handler.
    <div className="relative grid">
      <button
        type="button"
        className={`${CHIP} h-full`}
        aria-pressed={picked}
        data-off={!t || !fits || undefined}
        onClick={onPick}
      >
        <span className={`${CHIP_NAME} pr-16`}>{s.name}</span>
        <span className={CHIP_META}>
          {mark && <span className="text-sodium">{mark} · </span>}
          sleeps {s.sleeps}
          {s.sleepsMax ? `–${s.sleepsMax}` : ""} · {s.nights} nights
        </span>
        {s.sleepNote && (
          <span className="text-[12.5px] leading-snug text-snow/75">
            {s.sleepNote}
          </span>
        )}
        {t && people ? (
          <>
            {/* The nightly per-head rate leads: it is the figure that compares
                across houses with different night counts, and the one people
                actually carry in their head. The trip total per person stays
                underneath, because that is what you hand over. */}
            <span className={CHIP_RATE}>
              {money(t.totalUsd / people / s.nights, true)}
              <span className={CHIP_UNIT}>/person/night</span>
              {t.estimated && (
                <span className={`${PILL} border-glacier/45 text-glacier`}>
                  est
                </span>
              )}
            </span>
            <span className={CHIP_SUB}>
              {money(t.totalUsd / people, true)} /person for {s.nights} nights
            </span>
          </>
        ) : (
          <span className={CHIP_RATE_OFF}>
            {!people
              ? "no headcount yet"
              : s.quotes.length
              ? `quoted at ${s.quotes.map((x) => x.guests).join(", ")}, not ${people}`
              : "no quote"}
          </span>
        )}
      </button>
      {s.url ? (
        <a
          href={listingUrl(s.url, trip)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            s.url.includes("airbnb.com")
              ? `Open ${s.name} on Airbnb in a new tab`
              : `Open the listing for ${s.name} in a new tab`
          }
          className={`${CHIP_PROOF} right-[13px] top-[11px]`}
        >
          listing&nbsp;↗
        </a>
      ) : (
        <span
          className="pointer-events-none absolute right-[13px] top-[11px] z-10 rounded-[2px] border border-dashed border-ridge px-1.5 py-0.5 font-data text-[9.5px] uppercase tracking-[0.1em] text-muted/70"
          title="Bill hasn't sent the link for this one yet"
        >
          no link
        </span>
      )}
    </div>
  );
}
