import { RouterProvider } from "react-router-dom";
import router from "./pages/@router";
import { createTheme, ThemeProvider } from "@mui/material";
import { orange } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import MyErrorDialog from "./components/MyErrorDialog";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#558b2f",
    },
    secondary: orange,
    text: {
      primary: "#ddd",
    },
  },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <MyErrorDialog />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} position="top-right" />
    </QueryClientProvider>
  );
}
