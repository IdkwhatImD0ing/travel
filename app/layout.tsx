import type { Metadata, Viewport } from "next";
import { Archivo, Public_Sans, Chivo_Mono } from "next/font/google";
import "./globals.css";
import { HeadcountProvider } from "@/components/headcount";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OG_BASE, SITE_NAME, SITE_URL } from "@/lib/site";

/* Archivo carries a width axis — set wide for the signage voice. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

/* Chivo Mono is Archivo's sibling out of Omnibus-Type: same grotesque
   skeleton, tabular figures. Every dollar figure on this site is set in it. */
const chivoMono = Chivo_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

/**
 * The home page's card: every trip, whatever kind. The Tahoe board at /ski,
 * the explorer and each trip page set their own, and the title template
 * keeps the site name on all of them. The share image is
 * app/opengraph-image.tsx.
 */
const HOME_TITLE = `${SITE_NAME} — every trip we're planning`;
const HOME_DESCRIPTION =
  "Every trip Bill is planning from San Jose, and what one person pays for " +
  "each. Every price links to the page it came from.";

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  applicationName: SITE_NAME,
  title: { default: HOME_TITLE, template: `%s · ${SITE_NAME}` },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    ...OG_BASE,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#080c17",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${publicSans.variable} ${chivoMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <HeadcountProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </HeadcountProvider>
      </body>
    </html>
  );
}
