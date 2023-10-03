import { create, StateCreator } from "zustand";

type StateCreatorValueTypes = {
  acceptedImages: ImageGrandObject[];
  setAcceptedImages: (imageList: ImageGrandObject[]) => void;
  rejectImage: (image: ImageGrandObject) => void;
  updateImageSecureURL: (image: ImageGrandObject, securedURL:string) => void;
  resetAccepedImages: () => void;
};

const stateCreator: StateCreator<StateCreatorValueTypes> = (set) => ({
  acceptedImages: [],
  setAcceptedImages: (imageList) =>
    set((state) => ({
      ...state,
      acceptedImages: [...state.acceptedImages, ...imageList],
    })),
  rejectImage: (image) =>
    set((state) => ({
      ...state,
      acceptedImages: state.acceptedImages.filter((img) => img !== image),
    })),
    updateImageSecureURL: (image, securedURL) => set((state) => {
      const selectedImage = state.acceptedImages.find((img) => img === image)
      selectedImage!.securedURL = securedURL
      return {
        ...state,
        acceptedImages: [...state.acceptedImages]
      }
    }),
  resetAccepedImages: () =>
    set((state) => ({
      ...state,
      acceptedImages: [],
    })),
});

const useCloudImagesStore = create(stateCreator);
export default useCloudImagesStore;
