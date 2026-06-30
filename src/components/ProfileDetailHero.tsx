import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, Platform } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { getPlatformLabel } from "@/utils/dataHelpers";

interface ProfileDetailHeroProps {
  user: FullUserProfile;
  platform: Platform;
}

export function ProfileDetailHero({ user, platform }: ProfileDetailHeroProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/50 p-6 shadow-[0_16px_40px_rgba(8,15,40,0.16)] backdrop-blur-md">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <img
          src={user.picture}
          alt={user.fullname}
          className="h-24 w-24 rounded-2xl object-cover ring-1 ring-white/10"
        />

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-semibold text-white">@{user.username}</h2>
            <VerifiedBadge verified={user.is_verified} />
            <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-medium text-violet-100">
              {getPlatformLabel(platform)}
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-300">{user.fullname}</p>

          {user.description && (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              {user.description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">
              {formatFollowers(user.followers)} followers
            </span>
            <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">
              {user.posts_count ?? 0} posts
            </span>
            <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">
              {formatEngagementRate(user.engagement_rate)} engagement
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}