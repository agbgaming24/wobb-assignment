import type { FullUserProfile, Platform } from "@/types";

interface ProfileDetailActionsProps {
  user: FullUserProfile;
  platform: Platform;
  profileKey: string;
  isSelected: boolean;
  onAdd: () => void;
  selectedCount: number;
}

export function ProfileDetailActions({
  user,
  platform,
  profileKey,
  isSelected,
  onAdd,
  selectedCount,
}: ProfileDetailActionsProps) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 shadow-[0_16px_40px_rgba(8,15,40,0.16)] backdrop-blur-md">
      <p className="text-xs uppercase tracking-[0.24em] text-violet-200/70">
        Action
      </p>
      <h3 className="mt-2 text-xl font-semibold text-white">
        Select profile & add to list
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        {isSelected
          ? "This creator is already saved in your shortlist."
          : "Save this creator locally so you can compare and return later."}
      </p>

      <button
        type="button"
        onClick={onAdd}
        disabled={isSelected}
        className={`mt-5 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition ${
          isSelected
            ? "cursor-not-allowed border border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
            : "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-500 hover:to-blue-500"
        }`}
      >
        {isSelected ? "Already in list" : "Add to list"}
      </button>

      <div className="mt-6 rounded-xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-300">
        <div className="flex items-center justify-between">
          <span>List size</span>
          <span className="font-semibold text-white">{selectedCount}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Current key</span>
          <span className="truncate font-mono text-xs text-slate-400">
            {profileKey}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Platform</span>
          <span className="text-slate-400">{platform}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Creator</span>
          <span className="truncate text-slate-400">@{user.username}</span>
        </div>
      </div>
    </aside>
  );
}