import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Scenario } from "@/components/scenario";
import { OtherTripBoard } from "@/components/other-trip";
import { KIND } from "@/components/kind";
import { TRIPS, getTrip, tripGroup } from "@/data/trips";
import { getResort } from "@/data/resorts";
import { tripDatesLabel, type OtherTrip, type SkiTrip, type Trip } from "@/lib/types";
import { money } from "@/lib/cost";
import { OG_BASE, SITE_NAME, planQuote, tripPrice } from "@/lib/site";

/** Every trip is known at build time; anything else is a 404, not a guess. */
export const dynamicParams = false;

export function generateStaticParams() {
  return TRIPS.map((t) => ({ slug: t.slug! }));
}

/**
 * Leads with the number, because that is what a friend opening the link wants
 * to know. Without a full price it says so rather than guessing.
 */
function describe(trip: Trip): string {
  if (trip.kind === "ski") {
    const where = getResort(trip.ski.resort ?? "")?.name ?? "Tahoe";
    const q = planQuote(trip);
    return (
      `${trip.people} of us at ${where}, ${tripDatesLabel(trip)}, ${trip.ski.skiDays} full days. ` +
      (q
        ? `${q.fromCheapest ? "From " : ""}${money(q.perPerson)} each: ${q.lift.option.name}, ${q.stay.name} and gear.`
        : "Pick the house and see what you pay.")
    );
  }
  const price = tripPrice(trip);
  const when = tripDatesLabel(trip) ?? "No dates yet";
  return (
    `${KIND[trip.kind].trip}, ${trip.place}. ${when}. ` +
    (price
      ? `${price.from ? "From " : ""}${money(price.perPerson)} each.`
      : "No prices yet.") +
    (trip.blurb ? ` ${trip.blurb}` : "")
  );
}

export async function generateMetadata(
  props: PageProps<"/trips/[slug]">
): Promise<Metadata> {
  const trip = getTrip((await props.params).slug);
  if (!trip) return {};
  const description = describe(trip);
  const url = `/trips/${trip.slug}`;
  return {
    title: trip.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...OG_BASE,
      title: `${trip.title} · ${SITE_NAME}`,
      description,
      url,
    },
  };
}

const BACK = "underline underline-offset-2 hover:text-sodium";

/** The versions of a trip — same place, same week, different lengths or
    headcounts — as a switch. Links, because each is its own page. */
function VersionSwitch({ trip }: { trip: Trip }) {
  const versions = tripGroup(trip);
  if (versions.length < 2) return null;
  return (
    <nav aria-label="Trip versions" className="mb-5">
      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
        {versions.map((v) => (
          <li key={v.slug}>
            <Link
              href={`/trips/${v.slug}`}
              aria-current={v.slug === trip.slug ? "page" : undefined}
              className="inline-block rounded-[3px] border border-ridge bg-pane px-3 py-1.5 font-data text-[12px] uppercase tracking-[0.08em] text-snow/80 no-underline transition-colors hover:border-sodium/60 hover:text-snow aria-[current=page]:border-sodium/70 aria-[current=page]:text-sodium"
            >
              {v.variant ?? v.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SkiTripPage({ trip }: { trip: SkiTrip }) {
  const resort = getResort(trip.ski.resort ?? "");
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">{trip.title}</p>
          <VersionSwitch trip={trip} />
          <h1 className="display hero-h">
            {trip.people} people, {trip.ski.skiDays} days
            {resort ? ` at ${resort.name}` : ""}.
          </h1>
          <p className="hero-sub">
            {tripDatesLabel(trip)} — drive up the first day, ski{" "}
            {trip.ski.skiDays} days, drive home the last. {trip.blurb}
          </p>
          <p className="hero-sub">
            {resort
              ? `The mountain is settled. Pick the house, the gear and the car, and the number on the right is what you pay.`
              : `Pick the mountain, the house, the gear and the car, and the number on the right is what you pay.`}
          </p>
          <p className="mt-6 text-[13px] text-muted">
            <Link href="/" className={BACK}>
              All trips
            </Link>
            {" · "}
            <Link href="/ski" className={BACK}>
              Every Tahoe mountain
            </Link>
          </p>
        </div>
      </section>
      <div className="wrap">
        <Scenario plan={trip} />
      </div>
    </>
  );
}

function OtherTripPage({ trip }: { trip: OtherTrip }) {
  const facts = [
    tripDatesLabel(trip) ?? "No dates yet",
    trip.people ? `${trip.people} people` : "headcount open",
  ].join(" · ");
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">
            {KIND[trip.kind].trip}
            {trip.status === "idea" ? " · an idea" : ""}
          </p>
          <VersionSwitch trip={trip} />
          <h1 className="display hero-h">{trip.title}.</h1>
          <p className="hero-sub">
            {facts}. {trip.blurb}
          </p>
          <p className="mt-6 text-[13px] text-muted">
            <Link href="/" className={BACK}>
              All trips
            </Link>
          </p>
        </div>
      </section>
      <div className="wrap">
        <OtherTripBoard trip={trip} />
      </div>
    </>
  );
}

export default async function TripPage(props: PageProps<"/trips/[slug]">) {
  const trip = getTrip((await props.params).slug);
  if (!trip) notFound();
  return trip.kind === "ski" ? (
    <SkiTripPage trip={trip} />
  ) : (
    <OtherTripPage trip={trip} />
  );
}
