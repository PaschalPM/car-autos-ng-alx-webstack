import { create, StateCreator } from "zustand";

type StateCreatorValueTypes = {
    userProfile: UserValues,
    jwttoken: string,

    setUserProfile: (user: UserValues) => void,
    setUserToken: (token: string) => void,
    resetJWTToken: () => void,
}
const stateCreator: StateCreator<StateCreatorValueTypes> = (set) => ({
    userProfile: {} as UserValues,
    jwttoken: '',

    // methods
    setUserProfile: (user: UserValues) => set({userProfile: user}),
    setUserToken: (jwttoken: string) => set((state) => ({ ...state, jwttoken })),
    resetJWTToken: () => set((state) => ({ ...state, jwttoken: '' })),
})

const useAppStore = create(stateCreator)
export default useAppStore