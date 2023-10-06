import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

type Props = React.PropsWithChildren<{
  isLoading: boolean;
  isError: boolean;
  reason?: string;
  handleRetry?: () => void;
}>;

const DashboardFeedback = ({
  isLoading,
  isError,
  reason,
  handleRetry,
  children,
}: Props) => {

  const FeedbackShell = ({ children }: React.PropsWithChildren) => (
    <Box
      height={"calc(100vh - 155px)"}
      m={0}
      p={0}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {children}
    </Box>
  );

  type ErrorPageProps = {
    reason?: string;
    handleRetry?: () => void;
  };

  const ErrorPage = ({ reason, handleRetry }: ErrorPageProps) => {
    const text = reason ?? "Oops... Something went wrong!";
    return (
      <FeedbackShell>
        <>
          <Box>
            <Typography variant="h6" gutterBottom>
              {text}
            </Typography>
            <Button variant="contained" onClick={handleRetry}>
              Try again
            </Button>
          </Box>
        </>
      </FeedbackShell>
    );
  };

  const LoadingPage = () => {
    return (
      <FeedbackShell>
        <>
          <Box display={"flex"} alignItems={"center"} flexDirection={"column"}>
            <Typography gutterBottom>
              <CircularProgress size={65} />
            </Typography>
            <Typography variant="h6">Loading...</Typography>
          </Box>
        </>
      </FeedbackShell>
    );
  };
  return isLoading ? (
    <LoadingPage />
  ) : isError ? (
    <ErrorPage reason={reason} handleRetry={handleRetry} />
  ) : (
    children
  );
};

export default DashboardFeedback