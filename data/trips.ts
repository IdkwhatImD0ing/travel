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
    // nights", then "change dates, thursday to monday": Thu Nov 26 (the
    // holiday) to Mon Nov 30. Then: "4 nights lets price it at 1000$
    // for 4 nights for 4 people" — a lodging budget for the group, with no
    // place picked, so it is a cost rather than a house.
    slug: "oahu-thanksgiving",
    title: "Oahu over Thanksgiving",
    kind: "beach",
    place: "Oahu",
    status: "upcoming",
    people: 4,
    checkIn: "2026-11-26",
    checkOut: "2026-11-30",
    blurb: "Tentative. Thanksgiving break, 5 days and 4 nights, nothing booked yet.",
    stays: [],
    costs: [
      {
        id: "oahu-lodging",
        label: "Lodging",
        detail: "4 nights for 4 of us, place not picked yet",
        per: "group",
        usd: 1000,
        status: "estimate",
        source: "Bill’s working number",
        asOf: "2026-10-16",
      },
      {
        // Bill: "Found trip is 576$", with this Google Flights link. Decoded,
        // the link is 1 adult, so $576 is per person. Estimate, because the
        // page wouldn't load in our browser to read it ourselves.
        id: "oahu-flights",
        label: "Flights",
        detail: "Alaska, SFO to Honolulu round trip: AS 811 out Nov 26, AS 855 back Nov 30",
        per: "person",
        usd: 576,
        status: "estimate",
        source: "Google Flights — Bill’s read",
        sourceUrl:
          "https://www.google.com/travel/flights/booking?tfs=CBwQAhpLEgoyMDI2LTExLTI2Ih8KA1NGTxIKMjAyNi0xMS0yNhoDSE5MKgJBUzIDODExKABqDAgCEggvbS8wZDZscHIMCAMSCC9tLzBkZmNuGksSCjIwMjYtMTEtMzAiHwoDSE5MEgoyMDI2LTExLTMwGgNTRk8qAkFTMgM4NTUoAGoMCAMSCC9tLzBkZmNucgwIAhIIL20vMGQ2bHBAAUgBcAGCAQsI____________AZgBAQ&tfu=CmxDalJJVWpWc1kzcDFVMlp5VmpSQlJYUktaV2RDUnkwdExTMHRMUzB0TFMxd1ptNXlPVUZCUVVGQlIzSlRabk5aVFVsVldYbEJFZ1ZCVXpnMU5Sb0xDTERCQXhBQ0dnTlZVMFE0SEhDd3dRTT0SAggAIgA",
        asOf: "2026-10-16",
      },
      {
        // Bill: "price for car rental for those days 253$". One car for the
        // four of us, so it is split.
        id: "oahu-car",
        label: "Car",
        detail: "Rental car, Nov 26 – Nov 30, split across the 4 of us",
        per: "group",
        usd: 253,
        status: "estimate",
        source: "Bill’s read",
        asOf: "2026-10-16",
      },
    ],
    totalNote: "Lodging, flights and the car only.",
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
