import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate } from "react-router-dom";

type Props = React.PropsWithChildren<{
  isAuthenticating: boolean;
  isAuth: boolean;
}>;

const BeforeEnterFeedback = ({ isAuthenticating, isAuth, children }: Props) => {
  const FeedbackShell = ({ children }: React.PropsWithChildren) => (
    <Box
      height={"100vh"}
      m={0}
      p={0}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {children}
    </Box>
  );

  const LoadingPage = () => {
    return (
      <FeedbackShell>
        <>
          <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <Typography gutterBottom>
              <CircularProgress size={65} />
            </Typography>
            <Typography variant="h6">Authenticating...</Typography>
          </Box>
        </>
      </FeedbackShell>
    );
  };
  return isAuthenticating ? (
    <LoadingPage />
  ) : !isAuth ? (
    <Navigate to="/login" />
  ) : (
    children
  );
};

export default BeforeEnterFeedback;
