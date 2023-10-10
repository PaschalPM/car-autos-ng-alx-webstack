import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type UserProfileStateCreator = StateCreator<{
  userProfile: UserValues;
  isLoggedIn: boolean;
  setUserProfile: (user: UserValues) => void;
  resetUserProfile: () => void;
  setIsLoggedIn: (value: boolean) => void;
}>;
const userProfileStateCreator: UserProfileStateCreator = (set) => ({
  userProfile: {} as UserValues,
  isLoggedIn: false,
  setUserProfile: (user: UserValues) =>
    set((state) => ({ ...state, userProfile: user })),
  resetUserProfile: () =>
    set((state) => ({ ...state, userProfile: {} as UserValues })),
  setIsLoggedIn: (value) =>
    set((state) => ({
      ...state,
      isLoggedIn: value,
    })),
});

const useAuthUserProfile = create(
  persist(userProfileStateCreator, { name: "auth-user" })
);
export default useAuthUserProfile;
