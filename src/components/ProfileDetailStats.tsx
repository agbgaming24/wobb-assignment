import type { FullUserProfile } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";

interface ProfileDetailStatsProps {
  user: FullUserProfile;
}

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4 shadow-[0_10px_24px_rgba(8,15,40,0.08)]">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

export function ProfileDetailStats({ user }: ProfileDetailStatsProps) {
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <StatTile label="Followers" value={formatFollowers(user.followers)} />
      <StatTile
        label="Engagement"
        value={formatEngagementRate(user.engagement_rate)}
      />
      {user.posts_count !== undefined && (
        <StatTile label="Posts" value={user.posts_count} />
      )}
      {user.avg_likes !== undefined && (
        <StatTile label="Avg likes" value={formatFollowers(user.avg_likes)} />
      )}
      {user.avg_comments !== undefined && (
        <StatTile
          label="Avg comments"
          value={formatFollowers(user.avg_comments)}
        />
      )}
      {user.avg_views !== undefined && user.avg_views > 0 && (
        <StatTile label="Avg views" value={formatFollowers(user.avg_views)} />
      )}
    </section>
  );
}