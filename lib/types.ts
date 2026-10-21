/** Provenance. Every price on this site carries where it came from. */
export type Provenance = {
  /**
   * verified: confirmed against a real source for the season we're pricing.
   * estimate: a working number someone gave us, good enough to plan with.
   * last-season: a real price from a real page, but the previous season's —
   *   the resort hasn't published this one yet. Bill would rather see last
   *   year's number than nothing, and it is not an invented price: it is a
   *   true price with a stale date. It must never be shown as if it were
   *   current, so it always carries its season on the face of it.
   * researching: nobody has confirmed it, price is null.
   */
  status: "verified" | "estimate" | "last-season" | "researching";
  /** Where it came from, in words: "rideboreal.com — iRide 4-Pack". */
  source?: string;
  /**
   * The page that proves it. This is the whole point of `source`: a price you
   * cannot go and check is a price someone has to take on trust, and the
   * receipt at the bottom of this site asks people to spend real money. Any
   * option carrying a number should carry the link that shows the number.
   */
  sourceUrl?: string;
  asOf?: string;
  /** Which season the price is for, e.g. "2026-27". */
  season?: string;
  note?: string;
};

/**
 * A real quote pulled for a specific guest count, on a specific day.
 *
 * The date is not bookkeeping. Airbnb reprices continuously, so two quotes
 * taken weeks apart differ for reasons that have nothing to do with guest
 * count — the Soda Springs house read $3,254 at 7 guests in August and $2,959
 * at 8 guests today. Drawing a line through those two points would "prove"
 * that adding a guest saves $295, which is a pricing change wearing a guest
 * curve as a disguise. It is the same mistake the earlier per-guest claim made
 * and had to retract. So a curve may only be built from points measured on the
 * same day; see `stayTotalFor`.
 */
export type StayQuote = { guests: number; totalUsd: number; asOf?: string };

/**
 * Budget / normal / expensive. Bill wants one of each per location, so the
 * tier is a real attribute rather than something inferred from sort order:
 * "cheapest of three" and "the budget option" stop being the same statement
 * the moment a fourth house lands, or a holiday reprice reorders them.
 * Untiered stays stay in the data and off the trip page.
 */
export type StayTier = "budget" | "normal" | "expensive";

export type Stay = Provenance & {
  id: string;
  name: string;
  kind: "house" | "motel" | "hotel" | "hostel";
  tier?: StayTier;
  /** How many people sleep here comfortably — not the listing's optimistic max. */
  sleeps: number;
  /** Absolute ceiling, air mattresses and couches included. Omit if same as sleeps. */
  sleepsMax?: number;
  /**
   * How the beds actually work, when "sleeps 4" hides something worth knowing
   * before you book — a sofa bed, a shared room. Shown on the house's card as
   * a caption, not a warning.
   */
  sleepNote?: string;
  nights: number;
  /**
   * Quoted totals by guest count. Many listings price per guest, so a single
   * total that you divide is wrong — adding people can raise everyone's share.
   */
  quotes: StayQuote[];
  url?: string;
  /** Ski trips only: how far the house is from the lifts. */
  toLift?: string;
  perks: string[];
};

/**
 * A price variant. Most are age bands, but not all — "Add peak dates" costs
 * *more* than the base, so a tier is not automatically a discount. Only tiers
 * that carry an age range are age bands; the rest are upgrades, and asking
 * "what does a 21-year-old pay" must not silently hand back a child fare.
 */
export type PriceTier = {
  label: string;
  totalUsd: number;
  /** Inclusive age bounds. Omit both when the variant is not about age. */
  minAge?: number;
  maxAge?: number;
  /**
   * This variant buys back the product's `offDates` — Epic's "Add peak dates"
   * is the same four days with the holiday restriction lifted. Weekday limits
   * still apply.
   */
  liftsOffDates?: boolean;
};

/** An inclusive ISO date range: { from: "2026-12-26", to: "2026-12-30" }. */
export type DateRange = { from: string; to: string };

export type LiftOption = Provenance & {
  id: string;
  name: string;
  /** Display label. May name several mountains: "Heavenly / Kirkwood / Northstar". */
  resort: string;
  /**
   * Which resorts this actually gets you onto. The display string can't be
   * split reliably — "Palisades Tahoe" and "Palisades" are the same mountain —
   * so access is explicit.
   */
  resortSlugs: string[];
  /** Visits included. Only meaningful when `coverage` is "pack". */
  days: number;
  /**
   * How `totalUsd` relates to days on snow. Without this, `days` was doing
   * two jobs — a real product attribute on a 4-pack, and a guessed visit
   * count on a season pass — and the per-day figures were not comparable.
   *
   *   "pack"      buys `days` visits; buy another pack to cover a longer trip
   *   "unlimited" buys the season, so one price covers the whole trip
   *   "day"       buys one day; multiply by the trip
   *   "trip"      `totalUsd` already IS the cost of covering the trip, because
   *               the cheapest route is an assembly of different tickets that
   *               no single unit price describes. Donner Ski Ranch's cheapest
   *               four days is three midweek "Old School" tickets at $69 plus
   *               one full-price $119 day, because the discount only runs
   *               Tue-Thu — $326, which is neither 4x$69 nor 4x$119.
   */
  coverage: "pack" | "unlimited" | "day" | "trip";
  /**
   * Full days on snow this can actually deliver inside ONE trip. Omit when it
   * can cover the whole trip. 0 means it is not a full-day product at all —
   * a night pass sells evenings, and no number of them is a full day.
   */
  fullDaysPerTrip?: number;
  /**
   * Dates the product will not scan: blackouts, void dates, holiday periods.
   * The caption in `blackouts` is what people read; this is what the page
   * counts against `SCENARIO.skiDates`. Omit when there are none — or when
   * nobody has published them, in which case say so in the caption.
   */
  offDates?: DateRange[];
  /** Days of the week it will not scan, 0 = Sunday. A weekday pass is [0, 6]. */
  offWeekdays?: number[];
  /** Adult / default price for the whole product. null while researching. */
  totalUsd: number | null;
  /** Cheaper age bands, if the product has them. */
  tiers?: PriceTier[];
  blackouts: string;
  transferable: boolean | null;
};

export type Rental = Provenance & {
  id: string;
  where: "on-site" | "san-jose" | "town";
  shop: string;
  perDayUsd: number | null;
  catch?: string;
};

export type SkiLocation = {
  slug: string;
  name: string;
  blurb: string;
  route: string;
  driveFromSanJose: string;
  resorts: string[];
  stays: Stay[];
  lift: LiftOption[];
  rentals: Rental[];
};

/** The yardstick: $60/day on lift, from the Boreal 4-pack at ~$240. */
export const BENCHMARK_PER_DAY = 60;

/**
 * Where the trail markers fall: green under $80/day, blue under $100, diamond
 * at or over it. These are deliberately NOT derived from BENCHMARK_PER_DAY.
 * They used to be ($60 ± $5), which made green mean "beats the bar" — and
 * since nothing in Tahoe does that over four full days, the board came out
 * with no green on it at all and ten diamonds. The bar is still the bar; the
 * markers are just a readable spread over the prices that actually exist.
 */
export const RATING_GREEN_UNDER = 80;
export const RATING_BLUE_UNDER = 100;

/**
 * The trip: four full days on snow. Bill asked for it directly, so it is a
 * property of the trip and not of whichever pass happens to be selected.
 *
 * It used to be `lift.days`, which meant the pass silently redefined the trip
 * — picking a $35 Friday ticket produced a one-day trip, and the two season
 * passes were quoted per-day against an assumed five visits they would never
 * get. Every lift product is now priced for covering these four days.
 */
export const SKI_DAYS = 4;

/**
 * A photograph we have the right to publish. Only freely-licensed images go
 * here (Wikimedia Commons, CC, public domain) — the credit is not decoration,
 * it is the licence term, so it renders wherever the image does.
 */
export type ResortImage = {
  /** Local path under /public. Downloaded, not hot-linked, so it can't rot. */
  src: string;
  alt: string;
  /** Photographer, exactly as the licence requires them to be credited. */
  author: string;
  license: string;
  /** The file's page, where the licence can be checked. */
  sourceUrl: string;
};

/** A mountain, and the houses near enough to sleep in while skiing it. */
export type Resort = {
  slug: string;
  name: string;
  /** Whose houses serve this mountain. */
  locationSlug: string;
  /** Roughly, from the houses at that location. */
  toLift: string;
  image?: ResortImage;
};

/**
 * What kind of trip. Every kind gets its own colour on the page; "ski" also
 * gets the ski calculator (passes, blackout dates, gear, cars).
 */
export type TripKind = "ski" | "beach" | "city" | "diving" | "road-trip";

/**
 * Upcoming trips have dates and a headcount and lead the home page. Ideas are
 * places Bill has looked into, with nothing settled and nothing priced.
 */
export type TripStatus = "upcoming" | "idea";

/** What every trip has, whatever kind it is. */
type TripBase = {
  /** Its page is /trips/<slug>. The Tahoe board's open plan has none. */
  slug?: string;
  /** What the trip is called, on its page and in the trip list. */
  title: string;
  kind: TripKind;
  /** Where, short enough for a header link: "Boreal", "New Mexico". */
  place: string;
  status: TripStatus;
  /** A sentence for the top of the trip's page: why here, why these dates. */
  blurb?: string;
  /**
   * Trips that are versions of one trip — the same place over the same week,
   * at different lengths or headcounts — share a group. The header and the
   * home page list each group once, and a trip page shows its siblings as a
   * switch.
   */
  group?: string;
  /** This version's name in that switch: "5 people · 4 days". */
  variant?: string;
  /** The one date this trip can lose money by missing, said in amber. */
  deadline?: { lead: string; detail: string };
  /** The house, once it is picked. */
  stay?: string;
  /** True once `stay` is paid for: its card says "booked" instead of "the plan". */
  booked?: boolean;
};

/**
 * A ski trip, held still: headcount, dates and days on snow are settled,
 * because the whole ski calculator prices against them. Its houses live with
 * the ski area in data/locations.ts, since several trips share them, and the
 * trip names which ones it wants. Plain data, because the trip pages are
 * server components handing it to the client-side scenario.
 */
export type SkiTrip = TripBase & {
  kind: "ski";
  people: number;
  nights: number;
  /** The nights we are actually pricing. ISO, because Airbnb wants ISO. */
  checkIn: string;
  checkOut: string;
  /**
   * This trip's own houses, by id. `Stay.tier` is the shortlist for the Tahoe
   * board's headcount; a trip of a different size needs houses quoted at its
   * size, and says which here. Shown cheapest first, with the cheapest and
   * the trip's own `stay` marked — a list rather than budget/pick/splurge
   * slots, because two houses $11 apart are not a budget and a pick.
   */
  shortlist?: readonly string[];
  /** Everything only a ski trip has. */
  ski: {
    skiDays: number;
    /** Everybody is priced at this age, which decides the age-band fares. */
    age: number;
    /**
     * The days on snow. Lift coverage is counted against these, so a pass
     * that is blacked out on one of them delivers one day fewer.
     */
    skiDates: readonly string[];
    /** The mountain, once it is decided. Omit to leave the board open. */
    resort?: string;
  };
};

/**
 * Anything a non-ski trip costs besides where we sleep: a flight, a ferry, a
 * dive boat, a rental car, a hotel night on a road trip. It carries its
 * provenance like every other price on this site.
 */
export type Cost = Provenance & {
  id: string;
  label: string;
  /** A few words on what exactly: "Island Packers, Ventura to Scorpion". */
  detail?: string;
  /** "person": each of us pays this. "group": split across everyone. */
  per: "person" | "group";
  /** null while researching, and then the trip shows no total. */
  usd: number | null;
};

/**
 * Any other kind of trip. Everything past the name can be open: an idea has
 * no dates, no headcount and no prices yet, and the page says so rather than
 * guessing. Its houses and costs sit on the trip itself.
 */
export type OtherTrip = TripBase & {
  kind: Exclude<TripKind, "ski">;
  people?: number;
  checkIn?: string;
  checkOut?: string;
  /** Places to sleep, as alternatives: the trip is priced on one of them. */
  stays: Stay[];
  /** Everything else, all paid: flights, boats, tours, a car. */
  costs: Cost[];
  /**
   * What the total leaves out, said under it and beside it on the trip's
   * card: "Flights aren't included yet." A share that silently skips a big
   * cost reads as the price of the trip.
   */
  totalNote?: string;
};

export type Trip = SkiTrip | OtherTrip;

/**
 * The open ski trip the Tahoe board at /ski prices: eight of us, four full
 * days, five nights, everybody old enough to drink and young enough for the
 * under-23 fares, and any mountain. The explorer at /explore is where these
 * come loose.
 *
 * The dates are Dec 29 – Jan 3, the dates every house is quoted for. Bill:
 * "my current plan is December 29th to Jan 3rd." That turns every blackout
 * that lands on those days from a caption into a hole in the trip, so lift
 * coverage is counted against the four days we actually ski — drive up the
 * 29th, ski the 30th through the 2nd, drive home the 3rd.
 */
export const SCENARIO: SkiTrip = {
  title: "Tahoe over New Year",
  kind: "ski",
  place: "Tahoe",
  status: "upcoming",
  people: 8,
  nights: 5,
  checkIn: "2026-12-29",
  checkOut: "2027-01-03",
  ski: {
    skiDays: SKI_DAYS,
    age: 21,
    /** Wed Dec 30, Thu Dec 31, Fri Jan 1, Sat Jan 2. */
    skiDates: ["2026-12-30", "2026-12-31", "2027-01-01", "2027-01-02"],
  },
};

/** The dates a label or a listing link needs. Ideas have none yet. */
type Dated = { checkIn?: string; checkOut?: string; people?: number };

/**
 * "Dec 29 – Jan 3", for captions. Built from the trip so it can't drift. null
 * for a trip with no dates yet, so the caller has to say so in words.
 */
export function tripDatesLabel(trip?: { checkIn: string; checkOut: string }): string;
export function tripDatesLabel(trip: Dated): string | null;
export function tripDatesLabel(trip: Dated = SCENARIO): string | null {
  if (!trip.checkIn || !trip.checkOut) return null;
  const fmt = (iso: string) =>
    new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  return `${fmt(trip.checkIn)} – ${fmt(trip.checkOut)}`;
}

/**
 * A listing link that opens on OUR trip, not on today.
 *
 * Airbnb prices per date and per guest count, so a bare /rooms/<id> link shows
 * a friend whatever the cheapest random midweek night happens to be — a
 * number that has nothing to do with what we would pay over New Year at our
 * headcount. Every stay link on this site carries the dates and the headcount so
 * the page you land on is the page the quote came from. A trip without dates
 * yet gets the bare link.
 */
export function listingUrl(url: string, trip: Dated = SCENARIO): string {
  if (!url.includes("airbnb.com")) return url;
  const u = new URL(url);
  if (trip.checkIn) u.searchParams.set("check_in", trip.checkIn);
  if (trip.checkOut) u.searchParams.set("check_out", trip.checkOut);
  if (trip.people) {
    u.searchParams.set("adults", String(trip.people));
    u.searchParams.set("guests", String(trip.people));
  }
  return u.toString();
}

/**
 * Flat per car, per trip. Turo quoted $450; Hertz is close enough that $500
 * covers either. It is a carload-sized cost, so it jumps every time we need
 * one more car.
 */
export const CAR_RENTAL_PER_TRIP = 500;
