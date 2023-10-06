import { create, StateCreator } from "zustand";

type StateCreatorValueTypes = {
  acceptedImages: ImageGrandObject[];
  imageIsSubmitted: (image: ImageGrandObject) => void;
  setAcceptedImages: (imageList: ImageGrandObject[]) => void;
  rejectImage: (imgObj: ImageGrandObject) => void;
  updateImageSecureURL: (image: ImageGrandObject, securedURL: string) => void;
  resetAccepedImages: () => void;
};

const stateCreator: StateCreator<StateCreatorValueTypes> = (set) => ({
  acceptedImages: [],
  setAcceptedImages: (imageList) =>
    set((state) => ({
      ...state,
      acceptedImages: [...state.acceptedImages, ...imageList],
    })),
  imageIsSubmitted: (image) => set((state) => {
    const selectedImage = state.acceptedImages.find((img) => img === image)
    selectedImage!.isSubmitted = true
    return ({
      ...state,
      acceptedImages: [...state.acceptedImages]
    })
  }),
  rejectImage: (imgObj) =>
    set((state) => ({
      ...state,
      acceptedImages: state.acceptedImages.filter((img) => img !== imgObj),
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
