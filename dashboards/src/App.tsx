import { RouterProvider } from "react-router-dom";
import router from "./pages/@router";
import {createTheme, ThemeProvider} from "@mui/material";
import { orange } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#558b2f",
    },
    secondary: orange,
    text:{
      primary:"#ddd"
    }
  },
});
export default function App() {
  return( 
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
  <RouterProvider router={router} />
  </ThemeProvider>
  );
}
