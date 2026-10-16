import Link from "next/link";
import { TripNav } from "@/components/trip-nav";
import { SITE_NAME } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-head">
      <div className="wrap site-head-inner">
        <Link href="/" className="site-mark">
          <span className="site-mark-name">{SITE_NAME}</span>
          <span className="site-mark-route num">Planned from San Jose</span>
        </Link>

        <TripNav />
      </div>
    </header>
  );
}
