import { SCENARIO, type Trip } from "@/lib/types";

/**
 * Every trip Bill is planning, one page each at /trips/<slug>. Ski trips are
 * decisions the Tahoe board at /ski led to: a mountain, a headcount, a house.
 * Anything else is priced from its own stays and costs. Add the next one here
 * and it gets a page and a card on the home page.
 */
export const TRIPS: Trip[] = [
  {
    slug: "boreal-new-year",
    title: "Boreal over New Year",
    kind: "ski",
    place: "Boreal",
    status: "upcoming",
    group: "boreal-new-year",
    variant: "5 people · 4 days",
    // Bill: "We are going to boreal", and the group for this one is four.
    people: 5,
    nights: 5,
    checkIn: "2026-12-29",
    checkOut: "2027-01-03",
    ski: {
      skiDays: SCENARIO.ski.skiDays,
      age: SCENARIO.ski.age,
      skiDates: ["2026-12-30", "2026-12-31", "2027-01-01", "2027-01-02"],
      resort: "boreal",
    },
    blurb:
      "That is New Year week, when most passes in Tahoe are blacked out; Boreal’s 4-pack has no blackout dates at all.",
    // Five of us now, so only houses quoted at five: the hostel and the
    // hotel. No house is marked as the plan yet, so the page opens on the
    // cheapest. The four-person houses (Castle Creek, the Donner Lake
    // studio, the Soda Springs place) sleep four at most and dropped off.
    shortlist: ["boreal-hostel-5", "boreal-hotel-5"],
    deadline: {
      lead: "Buy your Boreal iRide 4-Pack online before Oct 1.",
      detail:
        "It is $239 until then and goes up after; Boreal’s own FAQ already quotes $259. It is not sold at the window, so everyone buys their own.",
    },
  },
  {
    // The same trip a day shorter: check in Dec 30, ski Dec 31 – Jan 2.
    slug: "boreal-new-year-3-days",
    title: "Boreal over New Year, 3 days",
    kind: "ski",
    place: "Boreal",
    status: "upcoming",
    group: "boreal-new-year",
    variant: "5 people · 3 days",
    people: 5,
    nights: 4,
    checkIn: "2026-12-30",
    checkOut: "2027-01-03",
    ski: {
      skiDays: 3,
      age: SCENARIO.ski.age,
      skiDates: ["2026-12-31", "2027-01-01", "2027-01-02"],
      resort: "boreal",
    },
    blurb:
      "One day shorter. Boreal’s 4-pack still covers it, with a visit left over: its day tickets are dynamically priced, holiday peak over New Year, and published for no date, so three of them are unlikely to come in under $239.",
    // The same hostel and hotel as the 4-day trip, re-quoted at five for the
    // Dec 30 check-in. No house is marked as the plan, so the page opens on
    // the cheapest. Castle Creek sleeps four at most and dropped off.
    shortlist: ["boreal-hostel-5-4n", "boreal-hotel-5-4n"],
    deadline: {
      lead: "Buy your Boreal iRide 4-Pack online before Oct 1.",
      detail:
        "It is $239 until then and goes up after; Boreal’s own FAQ already quotes $259. It is not sold at the window, so everyone buys their own.",
    },
  },
  {
    // The four-person version: the original trip before the group grew, back
    // because Castle Creek repriced to $1,893. Same dates as the 5-person
    // 4-day trip.
    slug: "boreal-new-year-4-people",
    title: "Boreal over New Year, 4 people",
    kind: "ski",
    place: "Boreal",
    status: "upcoming",
    group: "boreal-new-year",
    variant: "4 people · 4 days",
    people: 4,
    nights: 5,
    checkIn: "2026-12-29",
    checkOut: "2027-01-03",
    ski: {
      skiDays: SCENARIO.ski.skiDays,
      age: SCENARIO.ski.age,
      skiDates: ["2026-12-30", "2026-12-31", "2027-01-01", "2027-01-02"],
      resort: "boreal",
    },
    blurb:
      "The same week for four of us. That is New Year week, when most passes in Tahoe are blacked out; Boreal’s 4-pack has no blackout dates at all.",
    // Castle Creek is the plan. The Donner Lake studio is the cheaper option
    // near Boreal. The Alta House ($1,150) is cheaper still but sits in the
    // foothills well down I-80, so it stays off.
    stay: "truckee-castle-creek",
    shortlist: ["truckee-donner-lake-studio", "truckee-castle-creek"],
    deadline: {
      lead: "Buy your Boreal iRide 4-Pack online before Oct 1.",
      detail:
        "It is $239 until then and goes up after; Boreal’s own FAQ already quotes $259. It is not sold at the window, so everyone buys their own.",
    },
  },
  {
    // Bill, 2026-10-16: "Tentative trip to oahu thanksgiving break 5 days 4
    // nights". Thanksgiving is Thu Nov 26, so Wed Nov 25 – Sun Nov 29 is our
    // reading of the dates, not his. No headcount and nothing priced yet.
    slug: "oahu-thanksgiving",
    title: "Oahu over Thanksgiving",
    kind: "beach",
    place: "Oahu",
    status: "upcoming",
    checkIn: "2026-11-25",
    checkOut: "2026-11-29",
    blurb: "Tentative. Thanksgiving break, 5 days and 4 nights, nothing booked yet.",
    stays: [],
    costs: [],
  },
  {
    // From the vacation-booker notes and research/channel-islands-*.json in
    // the personal repo. The June target in those notes has passed, so no
    // dates, and nothing is priced until it is read off a real page.
    slug: "channel-islands",
    title: "Channel Islands",
    kind: "diving",
    place: "Channel Islands",
    status: "idea",
    blurb:
      "Ventura, then the Island Packers boat to Santa Cruz Island: sea-cave kayaking at Painted Cave or Scorpion, and a dive in the kelp forest. Flights on American points from SFO, and a Hyatt if there is one.",
    stays: [],
    costs: [],
  },
  {
    // From research/hyatt-nm-*.json and the Hyatt extracts in the personal
    // repo: Hyatts in Albuquerque, Santa Fe, Tamaya and Carlsbad.
    slug: "new-mexico",
    title: "New Mexico",
    kind: "road-trip",
    place: "New Mexico",
    status: "idea",
    blurb:
      "Albuquerque and Santa Fe, then south to White Sands and Carlsbad Caverns, sleeping at Hyatts along the way.",
    stays: [],
    costs: [],
  },
];

export const getTrip = (slug: string) => TRIPS.find((t) => t.slug === slug);

/** Every version of a trip, in the order they are listed above. */
export const tripGroup = (trip: Trip) =>
  trip.group ? TRIPS.filter((t) => t.group === trip.group) : [trip];

/** One trip per group: the first version of each, for the header and the home page. */
export const TRIP_HEADS = TRIPS.filter(
  (t, i) => !t.group || TRIPS.findIndex((u) => u.group === t.group) === i
);
