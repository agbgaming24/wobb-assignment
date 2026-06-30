import { memo, type MouseEvent } from "react";
import { Link } from "react-router-dom";

import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { getSelectedProfileKey, useSelectedListStore } from "@/store/selectedListStore";
import { useShallow } from "zustand/react/shallow";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

export function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  const { addProfile, isSelected } = useSelectedListStore(
    useShallow((state) => ({
      addProfile: state.addProfile,
      isSelected: state.isSelected,
    }))
  );

  const profileKey = getSelectedProfileKey({ platform, user_id: profile.user_id });
  const selected = isSelected(profileKey);

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    addProfile(profile, platform);
  };

  return (
    <article
      className="group flex min-h-[88px] cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-left shadow-[0_10px_24px_rgba(8,15,40,0.1)] transition hover:border-violet-300/30 hover:bg-slate-950/60"
    >
      <Link
        to={`/profile/${profile.username}?platform=${platform}`}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        <img
          src={profile.picture}
          alt={profile.fullname}
          className="h-14 w-14 rounded-2xl object-cover ring-1 ring-white/10"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-base font-semibold text-white">
            <span className="truncate">@{profile.username}</span>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <p className="truncate text-sm text-slate-300">{profile.fullname}</p>
          <p className="mt-1 text-sm text-slate-400">{formatFollowers(profile.followers)} followers</p>
        </div>
      </Link>
      <button
        type="button"
        onClick={handleAdd}
        disabled={selected}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          selected
            ? "cursor-not-allowed border border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
            : "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-[0_10px_22px_rgba(79,70,229,0.2)] hover:from-violet-500 hover:to-blue-500"
        }`}
      >
        {selected ? "Added" : "Add to List"}
      </button>
    </article>
  );
}

export const MemoProfileCard = memo(ProfileCard);
