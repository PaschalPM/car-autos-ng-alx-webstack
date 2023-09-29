import { MdDesktopAccessDisabled } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme, useMediaQuery } from "@mui/material";

const smallSize = 18;
const normalSize = 24;

type Props = {
  isForAdDetails?: boolean;
  handleClick?: () => void;
};

type ToggleEnableDisableButtonProps = Props & {
  isActive: boolean;
};

export const ToggleEnableDisableButton = ({
  isActive,
  isForAdDetails,
  handleClick,
}: ToggleEnableDisableButtonProps) => {
  const theme = useTheme();
  const mdMatchDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgMatchDown = useMediaQuery(theme.breakpoints.down("lg"));
  const activeColor = theme.palette.primary.main;
  const deactiveColor = theme.palette.secondary.main;

  const MainButton = () => (
    <Button
      onClick={handleClick}
      color={isActive ? "secondary" : "primary"}
      startIcon={
        isActive ? (
          <MdDesktopAccessDisabled color={deactiveColor} />
        ) : (
          <VscVmActive color={activeColor} />
        )
      }
    >
      <Typography
        variant="caption"
        color={isActive ? "secondary.main" : "primary.main"}
      >
        {isActive ? "deactivate" : "activate"}
      </Typography>
    </Button>
  );
  if (isForAdDetails) return <MainButton/>
  return lgMatchDown ? (
    <IconButton onClick={handleClick}>
      {isActive ? (
        <MdDesktopAccessDisabled
          color={deactiveColor}
          size={mdMatchDown ? smallSize : normalSize}
        />
      ) : (
        <VscVmActive color={activeColor} />
      )}
    </IconButton>
  ) : (
    <MainButton />
  );
};

export const DeleteButton = ({ isForAdDetails, handleClick }: Props) => {
  const theme = useTheme();
  const mdMatchDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgMatchDown = useMediaQuery(theme.breakpoints.down("lg"));

  const MainButton = () => (
    <Button
      color="error"
      onClick={handleClick}
      startIcon={<BsTrash color={theme.palette.error.main} />}
    >
      <Typography color={"error"} variant="caption">
        drop
      </Typography>
    </Button>
  );
  if (isForAdDetails) return <MainButton/>
  return lgMatchDown ? (
    <IconButton onClick={handleClick}>
      <BsTrash
        color={theme.palette.error.main}
        size={mdMatchDown ? smallSize : normalSize}
      />
    </IconButton>
  ) : (
    <MainButton />
  );
};

export const EditButton = ({ isForAdDetails, handleClick }: Props) => {
  const theme = useTheme();
  const mdMatchDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgMatchDown = useMediaQuery(theme.breakpoints.down("lg"));

  const MainButton = () => (
    <Button
      color="info"
      onClick={handleClick}
      startIcon={<AiOutlineEdit color={theme.palette.info.main} />}
    >
      <Typography color={"info.main"} variant="caption">
        edit
      </Typography>
    </Button>
  );
  if (isForAdDetails) return <MainButton/>

  return lgMatchDown ? (
    <IconButton onClick={handleClick}>
      <AiOutlineEdit
        color={theme.palette.info.main}
        size={mdMatchDown ? smallSize : normalSize}
      />
    </IconButton>
  ) : (
    <MainButton />
  );
};
