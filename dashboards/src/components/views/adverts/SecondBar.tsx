import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

export default function SeondBar() {
  return (
    <>
      <FormControl
        variant="standard"
        sx={{ width: "100%", maxWidth: "300px", my: 2 }}
        size="small"
      >
        <InputLabel htmlFor="users">Select User(s)</InputLabel>
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
    </>
  );
}
