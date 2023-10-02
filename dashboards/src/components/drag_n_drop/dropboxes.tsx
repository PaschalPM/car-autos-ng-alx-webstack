import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { postToCloud } from "../../libs/requests/cloudinary";
import useDialogStore from "../../store/dialog";
import useCloudImagesStore from "../../store/cloudImages";

const dropboxStyle = () => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid green",
  borderColor: "primary.light",
  height: "95px",
  borderRadius: "0.75em",
  overflow: "hidden",
});

type AddTileProps = {
  dropzoneProps: {
    getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  };
};

export const AddTile = ({
  dropzoneProps: { getInputProps, getRootProps },
}: AddTileProps) => {
  return (
    <Box
      sx={{ cursor: "pointer", backgroundColor: "primary.dark" }}
      {...getRootProps(dropboxStyle())}
    >
      <input {...getInputProps()} />
      <AddIcon fontSize="large" />
    </Box>
  );
};

type PreviewAndUploaderTileProps = {
  imgObj: ImageWithPreview;
  handleDelete?: (imgObj: ImageWithPreview) => void;
  handleErrorOnUpload?: (reason: string, imgObj: ImageWithPreview) => void;
};

export const PreviewAndUploaderTile = ({
  imgObj,
  handleDelete,
  handleErrorOnUpload,
}: PreviewAndUploaderTileProps) => {
  const { setDialogs, popDialog } = useDialogStore((state) => state);
  const { rejectImage, addSecuredURLWithImageID, deleteSecuredURLWithImageID } =
    useCloudImagesStore((state) => state);

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const imageId = imgObj.file.name + "." + imgObj.file.size;
  const handleSuccess = (data: CloudinaryResponse) => {
    addSecuredURLWithImageID(imageId + "%%" + data.secure_url);
    setIsUploading(false);
  };
  const handleError = (reason: string) => {
    setError(reason);
    setIsUploading(false);

    setDialogs({
      title: imgObj.file.name,
      description: reason,
      open: true,
      imgSrc: imgObj.preview,
      handleClose: (idx) => {
        rejectImage(imgObj);
        popDialog(idx);
        URL.revokeObjectURL(imgObj.preview);
      },
    });
  };

  useEffect(() => {
    setIsUploading(true);
    postToCloud(imgObj, handleSuccess, handleError);
    return () => {
      setError("");
      URL.revokeObjectURL(imgObj.preview);
      deleteSecuredURLWithImageID(imageId);
    };
  }, []);
  return (
    <>
      <Box sx={{ ...dropboxStyle(), position: "relative" }}>
        <img
          style={{ objectFit: "cover" }}
          src={imgObj.preview}
          width={"100%"}
          height={"100%"}
        />
        <Box sx={{ position: "absolute" }}>
          {isUploading ? (
            <CircularProgress />
          ) : error ? (
            <IconButton
              onClick={() => {
                handleErrorOnUpload && handleErrorOnUpload(error, imgObj);
              }}
            >
              <BsExclamationCircleFill size={36} color={"red"} />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleDelete && handleDelete(imgObj)}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
};
