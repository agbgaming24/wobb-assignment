import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Platform, UserProfileSummary } from "@/types";

export interface SelectedProfile extends UserProfileSummary {
  platform: Platform;
  addedAt: number;
}

interface SelectedListState {
  selectedProfiles: SelectedProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => boolean;
  removeProfile: (profileKey: string) => void;
  clearList: () => void;
  isSelected: (profileKey: string) => boolean;
}

function buildProfileKey(platform: Platform, userId: string) {
  return `${platform}:${userId}`;
}

export function getSelectedProfileKey(profile: {
  user_id: string;
  platform: Platform;
}) {
  return buildProfileKey(profile.platform, profile.user_id);
}

export const useSelectedListStore = create<SelectedListState>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],
      addProfile: (profile, platform) => {
        const profileKey = buildProfileKey(platform, profile.user_id);

        if (get().selectedProfiles.some((item) => buildProfileKey(item.platform, item.user_id) === profileKey)) {
          return false;
        }

        set((state) => ({
          selectedProfiles: [
            {
              ...profile,
              platform,
              addedAt: Date.now(),
            },
            ...state.selectedProfiles,
          ],
        }));

        return true;
      },
      removeProfile: (profileKey) => {
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter((profile) => buildProfileKey(profile.platform, profile.user_id) !== profileKey),
        }));
      },
      clearList: () => set({ selectedProfiles: [] }),
      isSelected: (profileKey) =>
        get().selectedProfiles.some((profile) => buildProfileKey(profile.platform, profile.user_id) === profileKey),
    }),
    {
      name: "selected-profile-list",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selectedProfiles: state.selectedProfiles }),
    }
  )
);