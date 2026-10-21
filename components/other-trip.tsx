"use client";

import { useState } from "react";
import { money, openingStay, stayTotalFor } from "@/lib/cost";
import { tripQuote } from "@/lib/quote";
import type { OtherTrip } from "@/lib/types";
import { Provenance } from "@/components/ui";
import { StayChip } from "@/components/stay-chip";
import { TripReceipt, NoReceipt, MobileTotal } from "@/components/receipt";
import {
  CHIPS,
  CHIP_NAME,
  CHIP_NOTE,
  CHIP_RATE,
  CHIP_RATE_OFF,
  CHIP_UNIT,
  LAYOUT,
  RAIL,
  STEP_H,
  STEP_N,
  STEP_SUB,
  STEPS,
} from "@/components/chips";

/**
 * Any trip that isn't a ski trip: pick where we sleep, see every other cost
 * with where it came from, and the share on the right. Same rule as the ski
 * pages — one missing number and there is no total, and the box says why.
 */
export function OtherTripBoard({ trip }: { trip: OtherTrip }) {
  const { people, costs } = trip;
  const [stayId, setStayId] = useState(() => openingStay(trip).stay?.id ?? "");
  const stay = trip.stays.find((s) => s.id === stayId);
  const q = tripQuote(stay, costs, people);

  // Cheapest first, as on the ski pages, with the cheapest marked once there
  // is something to compare it with.
  const stays = people
    ? [...trip.stays].sort(
        (a, b) =>
          (stayTotalFor(a, people)?.totalUsd ?? Infinity) -
          (stayTotalFor(b, people)?.totalUsd ?? Infinity)
      )
    : trip.stays;
  const cheapest =
    people && stays.length > 1 && stayTotalFor(stays[0], people) ? stays[0].id : undefined;

  const missing = costs.filter((c) => c.usd === null);
  const why = !trip.stays.length && !costs.length ? (
    <>
      Nothing is priced yet. A price goes in once somebody reads it off a real
      page, with the link, so there is no total to show.
    </>
  ) : !people ? (
    <>Nobody has said how many of us are going yet, so there is no share to work out.</>
  ) : missing.length ? (
    <>
      No price yet for {missing.map((c) => c.label).join(", ")}, so there is no
      honest total to show.
    </>
  ) : (
    <>
      {stay ? stay.name : "No house"} isn&rsquo;t quoted for{" "}
      <strong className="font-semibold">{people} guests</strong> yet.
    </>
  );

  // An idea with nothing in it yet is a sentence, not an empty form.
  if (!trip.stays.length && !costs.length) {
    return (
      <div className="max-w-[60ch] pb-[clamp(3rem,6vw,5rem)]">
        <NoReceipt>{why}</NoReceipt>
      </div>
    );
  }

  const costStep = stays.length > 0 ? 2 : 1;
  return (
    <div className={LAYOUT}>
      <div className={STEPS}>
        {stays.length > 0 && (
          <section aria-labelledby="s-stay">
            <h2 className={STEP_H} id="s-stay">
              <span className={STEP_N}>1</span> Where we sleep
              <span className={STEP_SUB}>
                {people ? `${people} of us` : "headcount open"}
              </span>
            </h2>
            <div className={CHIPS} role="group" aria-labelledby="s-stay">
              {stays.map((s) => (
                <StayChip
                  key={s.id}
                  stay={s}
                  people={people}
                  picked={s.id === stayId}
                  onPick={() => setStayId(s.id)}
                  mark={
                    s.id === trip.stay
                      ? trip.booked
                        ? "booked"
                        : "the plan"
                      : s.id === cheapest
                        ? "cheapest"
                        : undefined
                  }
                  trip={trip}
                />
              ))}
            </div>
          </section>
        )}

        {costs.length > 0 && (
          <section aria-labelledby="s-costs">
            <h2 className={STEP_H} id="s-costs">
              <span className={STEP_N}>{costStep}</span>{" "}
              {stays.length > 0 ? "Everything else" : "What it costs"}
              <span className={STEP_SUB}>all of it, not a choice</span>
            </h2>
            <ul className={`${CHIPS} m-0 list-none p-0`}>
              {costs.map((c) => (
                <li
                  key={c.id}
                  className="grid content-start gap-1.5 rounded border border-hair bg-pane p-[13px_14px]"
                >
                  <span className={CHIP_NAME}>{c.label}</span>
                  {c.usd !== null ? (
                    <span className={CHIP_RATE}>
                      {money(c.usd)}
                      <span className={CHIP_UNIT}>
                        {c.per === "person" ? "/person" : "for the group"}
                      </span>
                    </span>
                  ) : (
                    <span className={CHIP_RATE_OFF}>no price yet</span>
                  )}
                  {c.detail && <span className={CHIP_NOTE}>{c.detail}</span>}
                  <Provenance of={c} compact />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <aside className={RAIL}>
        {q && people ? (
          <TripReceipt q={q} headcount={people} note={trip.totalNote} />
        ) : (
          <NoReceipt>{why}</NoReceipt>
        )}
      </aside>

      {q && (
        <MobileTotal
          q={q}
          caption={trip.totalNote ? `per person. ${trip.totalNote}` : "per person"}
        />
      )}
    </div>
  );
}
