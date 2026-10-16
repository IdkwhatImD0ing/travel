import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/components/og-card";
import { RESORTS } from "@/data/resorts";
import { SCENARIO, tripDatesLabel } from "@/lib/types";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SCENARIO.people} people, ${SCENARIO.ski.skiDays} ski days in Tahoe over New Year`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow={`Tahoe · ${tripDatesLabel()}`}
        headline={`${SCENARIO.people} people, ${SCENARIO.ski.skiDays} ski days.`}
        sub={`${RESORTS.length} mountains priced for New Year, the houses near each.`}
        figureLabel="One number at the end: what you pay."
      />
    ),
    size
  );
}
