import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 shadow-[0_16px_40px_rgba(8,15,40,0.16)] backdrop-blur-md sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-violet-200/70">Browse</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Choose a platform and refine your search</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Search by creator name or handle, then add profiles to your shortlist.
          </p>
        </div>

        <label className="relative block w-full max-w-xl">
          <span className="sr-only">Search profiles</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by username or name..."
            className="w-full rounded-full border border-white/10 bg-slate-900/60 px-5 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-violet-300/50 focus:bg-slate-900"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {PLATFORMS.map((platform) => {
          const active = selected === platform;

          return (
            <button
              key={platform}
              type="button"
              onClick={() => onChange(platform)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-[0_10px_22px_rgba(79,70,229,0.28)]"
                  : "border border-white/10 bg-white/5 text-slate-200 hover:border-violet-300/30 hover:bg-white/10"
              }`}
            >
              {getPlatformLabel(platform)}
            </button>
          );
        })}
      </div>
    </section>
  );
}
