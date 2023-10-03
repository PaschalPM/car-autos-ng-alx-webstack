import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState, useRef } from "react";
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

//
// Preview And Uploader Tile HERE!!!!
//
type PreviewAndUploaderTileProps = {
  imgObj: ImageGrandObject;
  handleDelete?: (imgObj: ImageGrandObject) => void;
};

export const PreviewAndUploaderTile = ({
  imgObj,
  handleDelete,
}: PreviewAndUploaderTileProps) => {
  const { setDialogs, popDialog } = useDialogStore((state) => state);
  const { rejectImage, updateImageSecureURL } = useCloudImagesStore(
    (state) => state
  );
  const imageRef = useRef<HTMLImageElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleSuccess = (data: CloudinaryResponse) => {
    updateImageSecureURL(imgObj, data.secure_url);
    setIsUploading(false);
  };
  const handleError = (reason: string) => {
    setDialogs({
      title: imgObj.file.name,
      description: reason,
      imgSrc: URL.createObjectURL(imgObj.file),
      handleClose: (idx) => {
        popDialog(idx);
      },
    });
    setIsUploading(false);
    setError(reason);
    rejectImage(imgObj);
  };

  imageRef.current?.addEventListener("load", (ev) => {
    URL.revokeObjectURL((ev.target as HTMLImageElement).src as string);
  });

  useEffect(() => {
    setIsUploading(true);
    postToCloud(imgObj, handleSuccess, handleError);
    return () => {
      setError("");
      rejectImage(imgObj);
    };
  }, []);
  return (
    <>
      {error ? (
        ""
      ) : (
        <Box sx={{ ...dropboxStyle(), position: "relative" }}>
          <img
            ref={imageRef}
            style={{ objectFit: "cover" }}
            src={URL.createObjectURL(imgObj.file)}
            width={"100%"}
            height={"100%"}
          />
          <Box sx={{ position: "absolute" }}>
            {isUploading ? (
              <CircularProgress />
            ) : (
              <IconButton onClick={() => handleDelete && handleDelete(imgObj)}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
