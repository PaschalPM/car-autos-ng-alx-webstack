import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormikContext } from "formik";
import { type CarAdvert } from "../../../../libs/form-configs/new-advert";
import useCloudImagesStore from "../../../../store/cloudImages";

type Props = {
  text: string;
  suspenseText: string;
};

export default function SubmitButton({ text, suspenseText }: Props) {
  const { isValid, dirty, isSubmitting } = useFormikContext<CarAdvert>();
  const acceptedImages = useCloudImagesStore((state) => state.acceptedImages);

  const isImageListLengthInvalid = () =>
    acceptedImages.length < 5 || acceptedImages.length > 10;

  const areAllImagesSubmitted = () => {
    const allStatus: boolean[] = acceptedImages.map(
      (image) => image.isSubmitted as boolean
    );
    let isvalid: boolean = true;

    allStatus.forEach((status) => {
      if (!status) {
        isvalid = false;
      }
    });
    return isvalid;
  };
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={
        !(isValid && dirty) || isSubmitting || isImageListLengthInvalid() ||!areAllImagesSubmitted()
      }
    >
      {!isSubmitting ? (
        <> {text} </>
      ) : (
        <>
          <span style={{ marginRight: "8px" }}> {suspenseText} </span>
          <CircularProgress size={15} sx={{ color: "#a6a6a6" }} />
        </>
      )}
    </Button>
  );
}
