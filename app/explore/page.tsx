import type { Metadata } from "next";
import Link from "next/link";
import { Configurator } from "@/components/configurator";
import { OG_BASE, SITE_NAME } from "@/lib/site";

const DESCRIPTION =
  "Every Tahoe pass, house, and headcount we have a price for. The Tahoe board holds eight people and four days still; here nothing is held.";

export const metadata: Metadata = {
  title: "Explore every ski option",
  description: DESCRIPTION,
  alternates: { canonical: "/explore" },
  openGraph: {
    ...OG_BASE,
    title: `Explore every ski option · ${SITE_NAME}`,
    description: DESCRIPTION,
    url: "/explore",
  },
};

export default function Explore() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">Ski explorer · every priced option</p>
          <h1 className="display hero-h">Change anything.</h1>
          <p className="hero-sub">
            The Tahoe board holds the trip still — eight of us, four days, five
            nights. Here nothing is held: set the headcount, pick any pass at
            any tier, and see what it does to your share.
          </p>
          <p className="mt-6 text-[13px] text-muted">
            <Link href="/ski" className="underline underline-offset-2 hover:text-sodium">
              Back to the Tahoe board
            </Link>
          </p>
        </div>
      </section>
      <div className="wrap">
        <Configurator />
      </div>
    </>
  );
}
