import Link from "next/link";
import { TripCard, TRIP_CARDS } from "@/components/trip-card";
import { STEP_H, STEP_SUB } from "@/components/chips";
import { TRIP_HEADS } from "@/data/trips";
import { SCENARIO } from "@/lib/types";

/* Soonest first. Ideas have no dates, so they keep the order in data/trips.ts. */
const UPCOMING = TRIP_HEADS.filter((t) => t.status === "upcoming").sort((a, b) =>
  (a.checkIn ?? "").localeCompare(b.checkIn ?? "")
);
const IDEAS = TRIP_HEADS.filter((t) => t.status === "idea");

/* The ski tools that aren't one trip: the open Tahoe board and the explorer. */
const PLANNERS = [
  {
    href: "/ski",
    title: "Tahoe ski board",
    text: `${SCENARIO.people} of us over New Year, any mountain. The cheapest pass at each, the houses near it, and your share.`,
  },
  {
    href: "/explore",
    title: "Ski explorer",
    text: "Any headcount, any pass, any house we have a price for.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1 className="display hero-h">Where we&rsquo;re going.</h1>
          <p className="hero-sub">
            Every trip Bill is planning, and what it costs one person. Every
            price links to the page it came from, or says it isn&rsquo;t in
            yet.
          </p>
        </div>
      </section>
      <div className="wrap flex flex-col gap-[clamp(2.25rem,4.5vw,3.25rem)] pb-[clamp(3rem,6vw,5rem)]">
        {UPCOMING.length > 0 && (
          <section aria-labelledby="h-upcoming">
            <h2 className={STEP_H} id="h-upcoming">
              Coming up
            </h2>
            <div className={TRIP_CARDS}>
              {UPCOMING.map((t) => (
                <TripCard key={t.slug} trip={t} />
              ))}
            </div>
          </section>
        )}

        {IDEAS.length > 0 && (
          <section aria-labelledby="h-ideas">
            <h2 className={STEP_H} id="h-ideas">
              Ideas
              <span className={STEP_SUB}>places we&rsquo;ve looked into</span>
            </h2>
            <div className={TRIP_CARDS}>
              {IDEAS.map((t) => (
                <TripCard key={t.slug} trip={t} />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="h-planners">
          <h2 className={STEP_H} id="h-planners">
            Ski planners
          </h2>
          <ul className={`${TRIP_CARDS} m-0 list-none p-0`}>
            {PLANNERS.map((p) => (
              <li key={p.href} className="grid">
                <Link
                  href={p.href}
                  className="grid content-start gap-1.5 rounded border border-dashed border-ridge px-[18px] py-4 no-underline transition-colors hover:border-sodium/60"
                >
                  <span className="font-display text-[1.05rem] font-bold tracking-[-0.015em] [font-stretch:106%]">
                    {p.title} →
                  </span>
                  <span className="text-[13px] leading-snug text-snow/72">{p.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
