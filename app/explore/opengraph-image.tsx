import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/components/og-card";
import { SITE_NAME } from "@/lib/site";

// The explorer sets its own openGraph, which replaces the root's wholesale —
// including the root's share image — so it needs one of its own.
export const alt = `${SITE_NAME} ski explorer — every pass, house and headcount we have a price for`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Ski explorer · every priced option"
        headline="Change anything."
        sub="Any headcount, any pass, any house we have a price for."
        figureLabel="See what it does to your share."
      />
    ),
    size
  );
}
