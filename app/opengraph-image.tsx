import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/components/og-card";
import { TRIP_HEADS } from "@/data/trips";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — every trip we're planning, and what each one costs one person`;
export const size = OG_SIZE;
export const contentType = "image/png";

const UPCOMING = TRIP_HEADS.filter((t) => t.status === "upcoming").length;
const IDEAS = TRIP_HEADS.length - UPCOMING;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Planned from San Jose"
        headline="Where we're going."
        sub={`${UPCOMING} trip${UPCOMING === 1 ? "" : "s"} coming up, ${IDEAS} idea${IDEAS === 1 ? "" : "s"}.`}
        figureLabel="One number per trip: what you pay."
      />
    ),
    size
  );
}
