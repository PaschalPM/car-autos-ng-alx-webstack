import { create, StateCreator } from "zustand";

type StateCreatorValueTypes = {
  snackbar: Snackbar;
  myAlert: Alert;
  pageTitle: string;
  viewActiveAd: boolean;

  setViewActiveAd: (val: boolean) => void;
  setPageTitle: (page: string) => void;

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
  snackbar: { isOpen: false, message: "" } as Snackbar,
  myAlert: { isOpen: false, message: "", severity: "success" } as Alert,
  pageTitle: "",
  viewActiveAd: true,

  // methods
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
