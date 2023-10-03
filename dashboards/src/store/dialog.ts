import { create, type StateCreator } from "zustand";

type StateCreatorValueType = {
  dialogs: DialogType[];
  setDialogs: (dialog: DialogType) => void;
  popDialog: (idx: number) => void;
};

const stateCreator: StateCreator<StateCreatorValueType> = (set) => ({
  dialogs: [],

  setDialogs: (dialog) =>
    set((state) => ({
      ...state,
      dialogs: [...state.dialogs, {open: true, ...dialog}],
    })),

  popDialog: (idx) =>
    set((state) => {
      state.dialogs[idx].open = false;
      state.dialogs = state.dialogs.filter((_, index) => index !== idx);

      return {
        ...state,
      };
    }),
});

const useDialogStore = create(stateCreator);

export default useDialogStore;
