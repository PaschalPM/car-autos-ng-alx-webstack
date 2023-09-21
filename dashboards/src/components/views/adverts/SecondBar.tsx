import Box  from "@mui/material/Box";
import IconButton  from "@mui/material/IconButton";
import Input  from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";

export default function SeondBar() {
  return (
    <>
      <Box sx={{ py: "16px", mb: 1 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
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
        </Box>
      </Box>
    </>
  );
}
