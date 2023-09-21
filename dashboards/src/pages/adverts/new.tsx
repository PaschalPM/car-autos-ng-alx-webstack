import useAppStore from "../../store/app";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

export default function AddAdvert() {
  const setPageTitle = useAppStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle("Adverts");
    // eslint-disable-next-line
  }, []);
  return (
    <Container maxWidth={"sm"} disableGutters>
      <Paper>
        <Container  >
          Hello
        </Container>
      </Paper>
    </Container>
  );
}
