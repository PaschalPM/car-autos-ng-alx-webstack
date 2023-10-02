import { create, StateCreator } from "zustand";

type StateCreatorValueTypes = {
  acceptedImages: ImageWithPreview[];
  securedURLWithImageID: string[];
  addSecuredURLWithImageID: (securedURLWithImageID: string) => void;
  deleteSecuredURLWithImageID: (imageID: string) => void;
  setAcceptedImages: (imageList: ImageWithPreview[]) => void;
  rejectImage: (image: ImageWithPreview) => void;
  resetAccepedImages: () => void;
};

const stateCreator: StateCreator<StateCreatorValueTypes> = (set) => ({
  acceptedImages: [],
  securedURLWithImageID: [],
  addSecuredURLWithImageID: (securedURLWithImageID) =>
    set((state) => ({
      ...state,
      securedURLWithImageID: [
        ...state.securedURLWithImageID,
        securedURLWithImageID,
      ],
    })),
  deleteSecuredURLWithImageID: (imageID) =>
    set((state) => ({
      ...state,
      securedURLWithImageID: state.securedURLWithImageID.filter(
        (swID) => !swID.startsWith(imageID)
      ),
    })),
  setAcceptedImages: (imageList) =>
    set((state) => ({
      ...state,
      acceptedImages: [...state.acceptedImages, ...imageList],
    })),
  rejectImage: (image) =>
    set((state) => ({
      ...state,
      acceptedImages: state.acceptedImages.filter(
        (img) =>
          img.file.name + img.file.size !== image.file.name + image.file.size
      ),
    })),
  resetAccepedImages: () =>
    set((state) => ({
      ...state,
      acceptedImages: [],
    })),
});

const useCloudImagesStore = create(stateCreator);
export default useCloudImagesStore;
