import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Boreal trip had three versions before it was booked. Links to the
  // two that are gone land on the booked trip instead of a 404.
  async redirects() {
    return ["boreal-new-year-3-days", "boreal-new-year-4-people"].map(
      (slug) => ({
        source: `/trips/${slug}`,
        destination: "/trips/boreal-new-year",
        permanent: false,
      })
    );
  },
};

export default nextConfig;
