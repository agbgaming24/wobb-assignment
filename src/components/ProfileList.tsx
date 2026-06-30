import { memo } from "react";

import type { Platform, UserProfileSummary } from "@/types";
import { MemoProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
}

export function ProfileList({
  profiles,
  platform,
}: ProfileListProps) {
  return (
    <section className="space-y-3">
      {profiles.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-white/15 bg-white/5 px-6 py-14 text-center text-slate-300">
          <p className="text-lg font-medium text-white">No profiles found</p>
          <p className="mt-2 text-sm text-slate-400">
            Try a different search term or switch platforms.
          </p>
        </div>
      ) : (
        profiles.map((profile) => (
          <MemoProfileCard
            key={profile.user_id}
            profile={profile}
            platform={platform}
          />
        ))
      )}
    </section>
  );
}

export const MemoProfileList = memo(ProfileList);
