import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
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
      <FormControl
        variant="standard"
        sx={{ flexGrow: 1, maxWidth: "450px" }}
        size="small"
      >
        <InputLabel htmlFor="users">Select User</InputLabel>
        <Select
          native
          defaultValue=""
          id="users"
          label="Select User"
          sx={{ px: 0.5 }}
        >
          <option value="all"> All </option>
          <option value={"id"}>Myself</option>
          <optgroup label="Marketers">
            <option value={3}>Marketer One</option>
            <option value={4}>Marketer Two</option>
          </optgroup>
        </Select>
      </FormControl>
      <Divider sx={{ mb: 2 }} />
    </Stack>
  );
}
