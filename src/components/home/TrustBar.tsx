import { Banknote, PackageCheck, RotateCcw, ShieldCheck } from "lucide-react";

const PERKS = [
  { icon: PackageCheck, title: "Free delivery", text: "On orders over ৳5,000" },
  { icon: ShieldCheck, title: "2-year warranty", text: "On every device we sell" },
  { icon: RotateCcw, title: "7-day returns", text: "No-questions-asked policy" },
  { icon: Banknote, title: "Demo checkout", text: "Frontend-only, no payments" },
];

/** Trust strip shown beneath the featured rail. */
export function TrustBar() {
  return (
    <section aria-label="Store promises" className="border-y border-neutral-200 bg-neutral-50">
      <ul className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-4 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-8">
        {PERKS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-zinc-700 shadow-card">
              <Icon aria-hidden="true" className="size-4.5" />
            </span>
            <span>
              <span className="block text-sm font-medium text-zinc-900">{title}</span>
              <span className="block text-xs text-zinc-500">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
