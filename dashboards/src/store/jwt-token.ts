import { create, StateCreator } from "zustand"

type JWTStateCreator = StateCreator<{
    userjwttoken: string;
    setUserJWTToken: (token: string) => void;
    resetUserJWTToken: () => void;
}>
const jwtStateCreator: JWTStateCreator = ((set) => ({
    userjwttoken: "",
    setUserJWTToken: (userjwttoken: string) =>
        set((state) => ({ ...state, userjwttoken })),
    resetUserJWTToken: () => set((state) => ({ ...state, userjwttoken: "" })),
}))

const useAuthJWTToken = create(jwtStateCreator)
export default useAuthJWTToken