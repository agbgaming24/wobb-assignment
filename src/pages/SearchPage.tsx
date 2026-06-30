import { useDeferredValue, useMemo, useState } from "react";

import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { MemoProfileList } from "@/components/ProfileList";
import { MemoSelectedListPanel } from "@/components/SelectedListPanel";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useSelectedListStore } from "@/store/selectedListStore";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, deferredQuery),
    [allProfiles, deferredQuery]
  );
  const selectedCount = useSelectedListStore((state) => state.selectedProfiles.length);

  return (
    <Layout
      eyebrow="Creator discovery"
      title="Find creators worth tracking"
      description="Search, shortlist, and review profiles in a single workspace. Your selected list persists across reloads."
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="space-y-6">
          <PlatformFilter
            selected={platform}
            onChange={(nextPlatform) => {
              setPlatform(nextPlatform);
              setSearchQuery("");
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="rounded-[24px] border border-white/10 bg-white/6 px-4 py-3 text-sm text-slate-300 shadow-[0_20px_60px_rgba(15,23,42,0.2)] backdrop-blur-xl">
            Showing <span className="font-semibold text-white">{filtered.length}</span> of <span className="font-semibold text-white">{allProfiles.length}</span> creators on <span className="font-semibold text-white">{platform}</span>. {selectedCount} saved.
          </div>

          <MemoProfileList
            profiles={filtered}
            platform={platform}
          />
        </div>

        <MemoSelectedListPanel />
      </div>
    </Layout>
  );
}
