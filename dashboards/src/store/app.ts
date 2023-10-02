import { create, StateCreator } from "zustand";

type StateCreatorValueTypes = {
  userProfile: UserValues;
  userjwttoken: string;
  snackbar: Snackbar;
  myAlert: Alert;
  pageTitle: string;
  viewActiveAd: boolean;

  setViewActiveAd: (val: boolean) => void;
  setUserProfile: (user: UserValues) => void;
  resetUserProfile: () => void;
  setUserJWTToken: (token: string) => void;
  resetUserJWTToken: () => void;
  setPageTitle: (page: string) => void;
  logout: () => void;

  openAlert: (
    message: string,
    handleClose: () => void,
    severity: "success" | "error" | "warning"
  ) => void;
  resetAlert: () => void;

  openSnackbar: (
    message: string,
    actionCb: () => void,
    onClose: () => void
  ) => void;
  resetSnackbar: () => void;
};

const stateCreator: StateCreator<StateCreatorValueTypes> = (set) => ({
  userProfile: {} as UserValues,
  userjwttoken: "",
  snackbar: { isOpen: false, message: "" } as Snackbar,
  myAlert: { isOpen: false, message: "", severity: "success" } as Alert,
  pageTitle: "",
  viewActiveAd: true,

  // methods
  logout: () =>
    set((state) => ({
      ...state,
      userjwttoken: "",
      userProfile: {
        email: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        username: "",
      } as UserValues,
      myAlert: { isOpen: false, message: "" } as Alert,
      snackbar: { isOpen: false, message: "" } as Snackbar,
      viewActiveAd: true,
    })),
  setUserProfile: (user: UserValues) =>
    set((state) => ({ ...state, userProfile: user })),
  resetUserProfile: () =>
    set((state) => ({ ...state, userProfile: {} as UserValues })),
  setUserJWTToken: (userjwttoken: string) =>
    set((state) => ({ ...state, userjwttoken })),
  resetUserJWTToken: () => set((state) => ({ ...state, userjwttoken: "" })),
  setPageTitle: (pageTitle) => set((state) => ({ ...state, pageTitle })),
  setViewActiveAd: (val) => set((state) => ({ ...state, viewActiveAd: val })),

  // Snackbar Methods
  openSnackbar: (message, actionCb, onClose) =>
    set((state) => ({
      ...state,
      snackbar: {
        isOpen: true,
        message,
        actionCb,
        onClose,
      },
    })),
  resetSnackbar: () =>
    set((state) => ({
      ...state,
      snackbar: {
        isOpen: false,
        message: "",
        actionCb: () => {},
        onClose: () => {},
      },
    })),

  // Alert Methods
  openAlert: (message, handleClose, severity = "success") =>
    set((state) => ({
      ...state,
      myAlert: {
        isOpen: true,
        message,
        severity,
        handleClose,
      },
    })),
  resetAlert: () =>
    set((state) => ({
      ...state,
      myAlert: {
        isOpen: false,
        message: "",
        severity: "success",
        handleClose: () => {},
      },
    })),
});

const useAppStore = create(stateCreator);
export default useAppStore;
