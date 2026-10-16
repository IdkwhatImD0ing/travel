import type { Metadata } from "next";
import Link from "next/link";
import { Scenario } from "@/components/scenario";
import { BENCHMARK_PER_DAY, SCENARIO, tripDatesLabel } from "@/lib/types";
import { OG_BASE, SITE_NAME } from "@/lib/site";

/**
 * The open Tahoe board: it used to be the whole home page, when the site was
 * only ski trips. Written against what the page actually does, with numbers
 * from SCENARIO so the description cannot drift from the page. The share
 * image is ./opengraph-image.tsx.
 */
const TITLE = `${SCENARIO.people} people, ${SCENARIO.ski.skiDays} ski days in Tahoe`;
const DESCRIPTION =
  `San Jose to Tahoe over New Year, ${tripDatesLabel()}. Every mountain priced for ` +
  `${SCENARIO.ski.skiDays} full days at ${SCENARIO.ski.age}, the houses near each, and one number at ` +
  `the end: what you pay, not what the group pays.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/ski" },
  openGraph: {
    ...OG_BASE,
    title: `${TITLE} · ${SITE_NAME}`,
    description:
      "Every Tahoe mountain priced for New Year, one number at the end: your share. Every price links to the page it came from.",
    url: "/ski",
  },
};

export default function SkiBoard() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Tahoe ski board · any mountain</p>
          <h1 className="display hero-h">
            {SCENARIO.people} people, {SCENARIO.ski.skiDays} ski days.
          </h1>
          <p className="hero-sub">
            {tripDatesLabel()} — drive up the first day, ski four, drive home
            the last. That is New Year week, so every pass below is counted
            against the days it will actually scan on.
          </p>
          <p className="hero-sub">
            Pick the mountain. The pass is the cheapest {SCENARIO.ski.skiDays}-day
            access a {SCENARIO.ski.age}-year-old can buy there, the houses are the
            ones near it, and the number on the right is what you pay. The bar
            to beat is ${BENCHMARK_PER_DAY} a day on lift, Boreal&rsquo;s 4-pack.
          </p>
          <p className="mt-6 text-[13px] text-muted">
            <Link href="/" className="underline underline-offset-2 hover:text-sodium">
              All trips
            </Link>
            {" · "}
            <Link href="/explore" className="underline underline-offset-2 hover:text-sodium">
              Change anything in the explorer
            </Link>
          </p>
        </div>
      </section>
      <div className="wrap">
        <Scenario />
      </div>
    </>
  );
}
