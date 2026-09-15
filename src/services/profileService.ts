import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
}

const PROFILE_KEY = "watchstore.profile.v1";

export const defaultProfile: UserProfile = {
  fullName: "Usman Kashif",
  email: "usman@gmail.com",
  phone: "+92 300 1234567",
};

export async function loadProfile(): Promise<UserProfile> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    if (!raw) {
      return defaultProfile;
    }

    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return defaultProfile;
  }
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  try {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    throw new Error("Unable to save profile locally");
  }
}
