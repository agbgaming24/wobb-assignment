import { memo } from "react";
import { Link } from "react-router-dom";

import { VerifiedBadge } from "@/components/VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { getPlatformLabel } from "@/utils/dataHelpers";
import { getSelectedProfileKey, useSelectedListStore } from "@/store/selectedListStore";
import { useShallow } from "zustand/react/shallow";

export function SelectedListPanel() {
  const { selectedProfiles, removeProfile, clearList } = useSelectedListStore(
    useShallow((state) => ({
      selectedProfiles: state.selectedProfiles,
      removeProfile: state.removeProfile,
      clearList: state.clearList,
    }))
  );

  const totalFollowers = selectedProfiles.reduce((sum, profile) => sum + profile.followers, 0);

  return (
    <section className="mx-auto w-full max-w-5xl rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-white shadow-[0_16px_40px_rgba(8,15,40,0.16)] backdrop-blur-md sm:p-5">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-violet-200/70">List</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Saved creators</h2>
          <p className="mt-1 text-sm text-slate-300">Your selected profiles are kept here as a simple list.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={clearList}
            disabled={selectedProfiles.length === 0}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-violet-300/30 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear list
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl bg-white/5 p-3">
          <div className="text-xs text-slate-400">Saved profiles</div>
          <div className="mt-1 text-2xl font-semibold text-white">{selectedProfiles.length}</div>
        </div>
        <div className="rounded-xl bg-white/5 p-3">
          <div className="text-xs text-slate-400">Followers total</div>
          <div className="mt-1 text-2xl font-semibold text-white">{formatFollowers(totalFollowers)}</div>
        </div>
        <div className="rounded-xl bg-white/5 p-3">
          <div className="text-xs text-slate-400">Status</div>
          <div className="mt-1 text-2xl font-semibold text-white">{selectedProfiles.length > 0 ? "Ready" : "Empty"}</div>
        </div>
      </div>

      {selectedProfiles.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-white/15 bg-white/5 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-400/15 text-violet-200">
            +
          </div>
          <p className="mt-3 text-sm font-medium text-white">No profiles yet</p>
          <p className="mt-1 text-sm text-slate-400">
            Add creators from search results or their profile page.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {selectedProfiles.map((profile) => {
            const profileKey = getSelectedProfileKey(profile);

            return (
              <article
                key={profileKey}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-violet-300/30 hover:bg-white/8"
              >
                <img
                  src={profile.picture}
                  alt={profile.fullname}
                  className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/10"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 truncate text-sm font-semibold text-white">
                    <span className="truncate">@{profile.username}</span>
                    <VerifiedBadge verified={profile.is_verified} />
                  </div>
                  <p className="truncate text-sm text-slate-300">{profile.fullname}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {getPlatformLabel(profile.platform)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Link
                    to={`/profile/${profile.username}?platform=${profile.platform}`}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-violet-300/30 hover:bg-white/10"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeProfile(profileKey)}
                    className="text-xs font-medium text-rose-200 transition hover:text-rose-100"
                  >
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export const MemoSelectedListPanel = memo(SelectedListPanel);