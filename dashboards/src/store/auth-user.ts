import { create, StateCreator } from "zustand"
import { persist } from "zustand/middleware"


type UserProfileStateCreator = StateCreator<{
    userProfile: UserValues;
    setUserProfile: (user: UserValues) => void;
    resetUserProfile: () => void;
}>
const userProfileStateCreator: UserProfileStateCreator = ((set) => ({
    userProfile: {} as UserValues,
    setUserProfile: (user: UserValues) =>
        set((state) => ({ ...state, userProfile: user })),
    resetUserProfile: () =>
        set((state) => ({ ...state, userProfile: {} as UserValues }))
}))

const useAuthUserProfile = create(persist(userProfileStateCreator, { name: 'auth-user' }))
export default useAuthUserProfile



