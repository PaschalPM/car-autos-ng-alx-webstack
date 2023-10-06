import Stack from "@mui/material/Stack";
import { PropsWithChildren } from "react";
import { CircularProgress, Typography } from "@mui/material";

const MyStack = ({ children }: PropsWithChildren) => (
  <Stack alignItems={"center"} p={3}>
    {children}
  </Stack>
);

function SectionFeedBack<T>({
  isLoading,
  isError,
  data,
  reason,
  children,
}: PropsWithChildren<{
  isLoading: boolean;
  isError: boolean;
  data: T[];
  reason?: string;
}>) {
  
  if (isLoading) {
    return (
      <MyStack>
        <CircularProgress />
      </MyStack>
    );
  }

  if (isError) {
    return (
      <MyStack>
        <Typography color={"error"} variant="subtitle2">
          {reason ??
            "Failed to fetch data. Please check your internent connection and try again."}
        </Typography>
      </MyStack>
    );
  }
  
  if (!data || !data.length) {
    return (
      <MyStack>
        <Typography variant="subtitle2">
          No records found...
        </Typography>
      </MyStack>
    );
  }
  return children;
}

export default SectionFeedBack;
