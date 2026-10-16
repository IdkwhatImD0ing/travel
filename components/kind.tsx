import type { TripKind } from "@/lib/types";

/* Each kind of trip has its own colour, used only to say which kind it is:
   the tag, and the bar along the top of a trip card. Sodium and glacier keep
   their jobs. The class names are whole literal strings so Tailwind's scanner
   finds them — never build one by interpolation. */
export const KIND: Record<
  TripKind,
  /** `trip` is the label as a phrase: "diving trip", but "road trip". */
  { label: string; trip: string; tag: string; bar: string }
> = {
  ski: { label: "Ski", trip: "Ski trip", tag: "border-kind-ski/50 text-kind-ski", bar: "bg-kind-ski" },
  beach: { label: "Beach", trip: "Beach trip", tag: "border-kind-beach/50 text-kind-beach", bar: "bg-kind-beach" },
  city: { label: "City", trip: "City trip", tag: "border-kind-city/50 text-kind-city", bar: "bg-kind-city" },
  diving: { label: "Diving", trip: "Diving trip", tag: "border-kind-diving/50 text-kind-diving", bar: "bg-kind-diving" },
  "road-trip": { label: "Road trip", trip: "Road trip", tag: "border-kind-road/50 text-kind-road", bar: "bg-kind-road" },
};

export function KindTag({ kind }: { kind: TripKind }) {
  return (
    <span
      className={`inline-block rounded-[2px] border px-1.5 py-px font-data text-[10px] font-medium uppercase tracking-[0.12em] ${KIND[kind].tag}`}
    >
      {KIND[kind].label}
    </span>
  );
}
