import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import useAppStore from "../../../store/app";

type ChipType = {
  color: "primary" | "warning";
  label: string;
  handleClick?: () => void;
  isAdActive: boolean;
};

const MyChip = ({ label, color, isAdActive, handleClick }: ChipType) => {
  const viewActiveAd = useAppStore((state) => state.viewActiveAd);
  return (
    <Chip
      label={label}
      color={color}
      variant={viewActiveAd === isAdActive ? "filled" : "outlined"}
      onClick={() => handleClick && handleClick()}
      sx={{
        margin: 0.5,
        py: 2.5,
        px: 1,
        fontSize: "16px",
        "&:hover": { cursor: "pointer", filter: "brightness(115%)" },
      }}
    />
  );
};
export default function FirstBar() {
  const setViewActiveAd = useAppStore((state) => state.setViewActiveAd);
  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Box sx={{ py: 2 }} flexGrow={1}>
        <MyChip
          label="Active Ads"
          color="primary"
          isAdActive={true}
          handleClick={() => setViewActiveAd(true)}
        />
        <MyChip
          label="Inactive Ads"
          color="warning"
          isAdActive={false}
          handleClick={() => setViewActiveAd(false)}
        />
      </Box>
      <>
        <Box flexGrow={1} sx={{ maxWidth: "450px" }}>
          <Input
            id="search"
            placeholder="Search by ad title..."
            fullWidth
            endAdornment={
              <IconButton aria-label="search">
                <SearchIcon />
              </IconButton>
            }
          />
        </Box>
      </>
      <Divider sx={{ mb: 2 }} />
    </Stack>
  );
}
