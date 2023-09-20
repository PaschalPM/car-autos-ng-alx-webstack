import { useState } from "react";
import { baseColor } from "../libs/utils";

import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import useUserProfile from "../store/app";

const FormContainer = styled(Paper)({
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

type HandleChange =
  | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  | undefined;

type HandleSubmit = React.FormEventHandler<HTMLFormElement> | undefined;

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const setUserToken = useUserProfile((state) => state.setUserToken);

  const handleChange: HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: HandleSubmit = (e) => {
    e.preventDefault();
    setUserToken("simple-token");
  };

  return (
    <FormContainer elevation={3}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="inherit"
          sx={{
            backgroundColor: baseColor,
            color: "#fff",
            "&:hover": {
              backgroundColor: baseColor,
            },
          }}
        >
          Login
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Login;
