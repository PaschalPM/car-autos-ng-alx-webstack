import { create, StateCreator } from "zustand";

type StateCreatorValueTypes = UserValues & {
    token: string,
    setUserProfile: (user:UserValues) => void,
    setUserToken: (token:string)=>void
}
const stateCreator:StateCreator<StateCreatorValueTypes> = (set)=> ({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    phoneNumber: '',
    username: '',
    token: '',

    setUserProfile: (user:UserValues) => set({...user}),
    setUserToken: (token:string)=>set((state)=>({...state, token}))

})

const useUserProfile = create(stateCreator)
export default useUserProfile