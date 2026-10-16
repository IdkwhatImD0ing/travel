import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/components/og-card";
import { KIND } from "@/components/kind";
import { TRIPS, getTrip } from "@/data/trips";
import { getResort } from "@/data/resorts";
import { money } from "@/lib/cost";
import { SITE_NAME, planQuote, tripPrice } from "@/lib/site";
import { tripDatesLabel, type Trip } from "@/lib/types";

export const alt = "The trip, and what one person pays for it";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return TRIPS.map((t) => ({ slug: t.slug! }));
}

function Card({ trip }: { trip: Trip }) {
  if (trip.kind === "ski") {
    const where = getResort(trip.ski.resort ?? "")?.name;
    const q = planQuote(trip);
    return (
      <OgCard
        eyebrow={`${trip.title} · ${tripDatesLabel(trip)}`}
        headline={`${trip.people} people, ${trip.ski.skiDays} days${where ? ` at ${where}` : ""}.`}
        sub={
          q
            ? `${q.lift.option.name} · ${q.stay.name}`
            : "Pick the house and see what you pay."
        }
        figure={q ? money(q.perPerson) : undefined}
        figureLabel={
          q
            ? q.fromCheapest
              ? "per person, cheapest house"
              : "per person"
            : "No full price yet."
        }
      />
    );
  }
  const price = tripPrice(trip);
  return (
    <OgCard
      eyebrow={`${KIND[trip.kind].trip} · ${tripDatesLabel(trip) ?? "no dates yet"}`}
      headline={`${trip.title}.`}
      sub={trip.status === "idea" ? "An idea, nothing settled yet." : trip.place}
      figure={price ? money(price.perPerson) : undefined}
      figureLabel={
        price
          ? price.from
            ? "per person, cheapest house"
            : "per person"
          : "No prices yet."
      }
    />
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const trip = getTrip((await params).slug);
  return new ImageResponse(
    trip ? (
      <Card trip={trip} />
    ) : (
      <OgCard eyebrow={SITE_NAME} headline="Trip not found." sub="" />
    ),
    size
  );
}
