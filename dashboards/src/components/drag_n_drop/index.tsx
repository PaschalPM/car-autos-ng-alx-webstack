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
      const imageList: ImageWithPreview[] = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      rejectedFiles.forEach((rejectedFile) => {
        setDialogs({
          open: true,
          title: `${rejectedFile.errors[0].message}`,
          description: `${rejectedFile.file.name}`,
          handleClose: (idx) => {
            popDialog(idx);
          },
        });
      });
      setAcceptedImages(imageList);
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 10,
    maxSize: 5 * 1024 * 1024
  });

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
      >
        <AddTile dropzoneProps={{ getRootProps, getInputProps }} />
        {[...acceptedImages].map((img, idx) => (
          <PreviewAndUploaderTile
            key={idx}
            imgObj={img}
            handleDelete={(img) => rejectImage(img)}
            handleErrorOnUpload={(reason, img) =>{
              setDialogs({
                title: img.file.name,
                description: reason,
                open: true,
                handleClose: (idx) => {
                  rejectImage(img)
                  popDialog(idx);
                },
              })
            }
            }
          />
        ))}
      </Stack>
      validations go here
    </Box>
  );
}
