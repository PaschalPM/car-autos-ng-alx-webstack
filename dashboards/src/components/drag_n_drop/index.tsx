import { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AddTile, PreviewAndUploaderTile } from "./dropboxes";
import useCloudImagesStore from "../../store/cloudImages";
import useDialogStore from "../../store/dialog";

type DropzoneProps = {
  label?: string;
};

export default function Dropzone({ label }: DropzoneProps) {
  const setDialogs = useDialogStore((state) => state.setDialogs);
  const popDialog = useDialogStore((state) => state.popDialog);
  const { acceptedImages, setAcceptedImages, rejectImage } =
    useCloudImagesStore((state) => state);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      const imageList: ImageGrandObject[] = acceptedFiles.map((file) => ({
        file,
        securedURL: "",
        isSubmitted: false
      }));

      rejectedFiles.forEach((rejectedFile) => {
        setDialogs({
          title: `${rejectedFile.errors[0].message}`,
          description: `${rejectedFile.file.name}`,
          handleClose: (idx) => {
            popDialog(idx);
          },
        });
      });
      setAcceptedImages(imageList);
    },
    // eslint-disable-next-line
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 10,
    maxSize: 5 * 1024 * 1024,
  });

  const Counter = ({ minLen, maxLen }: { minLen: number; maxLen: number }) => {
    const acceptedImagesLen = acceptedImages.length;

    if (acceptedImagesLen < minLen) {
      return (
        <Typography color="error" variant="caption">
          Add at least {minLen} photos ({acceptedImagesLen} added)
        </Typography>
      );
    } else if (acceptedImagesLen > maxLen){
      return (
        <Typography color="error" variant="caption" mt={1}>
          Add at most {maxLen} photos ({acceptedImagesLen} added)
        </Typography>
      );
    }
    return (
      <Typography color="primary" variant="caption" mt={1}>
        {acceptedImagesLen} photos added...
      </Typography>
    );
  };

  return (
    <Box my={2}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Stack
        display={"grid"}
        gridTemplateColumns={"repeat(auto-fill, 95px)"}
        justifyContent={"space-between"}
        gap={2}
        mb={0.5}
      >
        <AddTile dropzoneProps={{ getRootProps, getInputProps }} />
        {[...acceptedImages].map((img, idx) => (
          <PreviewAndUploaderTile
            key={idx}
            imgObj={img}
            handleDelete={(imgObj) => rejectImage(imgObj)}
          />
        ))}
      </Stack>
      <Counter minLen={5} maxLen={10} />
    </Box>
  );
}
