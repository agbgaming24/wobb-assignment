import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import { Layout } from "@/components/Layout";
import type { FullUserProfile, Platform, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { getPlatformLabel, isPlatform } from "@/utils/dataHelpers";
import { getSelectedProfileKey, useSelectedListStore } from "@/store/selectedListStore";
import { ProfileDetailActions } from "@/components/ProfileDetailActions";
import { ProfileDetailHero } from "@/components/ProfileDetailHero";
import { ProfileDetailStats } from "@/components/ProfileDetailStats";

function resolveProfilePlatform(platformParam: string | null, profile: FullUserProfile): Platform {
  if (platformParam && isPlatform(platformParam)) {
    return platformParam;
  }

  if (profile.type && isPlatform(profile.type)) {
    return profile.type;
  }

  return "instagram";
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platformParam = searchParams.get("platform");
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addProfile = useSelectedListStore((state) => state.addProfile);
  const selectedProfiles = useSelectedListStore((state) => state.selectedProfiles);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      await Promise.resolve();

      if (cancelled) return;

      setLoading(true);
      setError(null);
      setProfileData(null);

      if (!username) {
        setError("Invalid profile URL.");
        setLoading(false);
        return;
      }

      try {
        const data = await loadProfileByUsername(username);

        if (cancelled) return;

        setProfileData(data);

        if (!data) {
          setError(`Could not load profile details for ${username}.`);
        }
      } catch {
        if (cancelled) return;
        setError(`Could not load profile details for ${username}.`);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (!username) {
    return (
      <Layout title="Profile unavailable">
        <p className="text-slate-300">Invalid profile.</p>
        <Link to="/" className="mt-4 inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950">
          Back to search
        </Link>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout title={`@${username}`} eyebrow="Profile details" description="Loading the full creator dossier." >
        <p className="text-slate-300">Loading...</p>
      </Layout>
    );
  }

  if (error || !profileData) {
    return (
      <Layout title={`@${username}`} eyebrow="Profile details" description="This profile could not be loaded.">
        <p className="text-rose-200 mb-4">{error ?? `Could not load profile details for ${username}.`}</p>
        <Link to="/" className="text-cyan-200 underline">
          Back to search
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const selectedPlatform = resolveProfilePlatform(platformParam, user);
  const profileKey = getSelectedProfileKey({
    platform: selectedPlatform,
    user_id: user.user_id,
  });
  const isSelected = selectedProfiles.some(
    (profile) => getSelectedProfileKey(profile) === profileKey
  );

  return (
    <Layout
      eyebrow="Profile details"
      title={user.fullname}
      description={`@${user.username} · ${getPlatformLabel(selectedPlatform)}`}
    >
      <Link
        to="/"
        className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
      >
        ← Back to search
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <div className="space-y-6">
          <ProfileDetailHero user={user} platform={selectedPlatform} />
          <ProfileDetailStats user={user} />
          {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
            >
              View on platform
            </a>
          )}
        </div>

        <ProfileDetailActions
          user={user}
          platform={selectedPlatform}
          profileKey={profileKey}
          isSelected={isSelected}
          onAdd={() => addProfile(user, selectedPlatform)}
          selectedCount={selectedProfiles.length}
        />
      </div>
    </Layout>
  );
}
