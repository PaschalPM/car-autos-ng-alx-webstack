import Paper from "@mui/material/Paper";
import MyTextFieldWithValCounter from "../../formFields/MyTextAreaWithValCounter";
import Dropzone from "../../drag_n_drop";


export default function Body<T>({ initialValues }: { initialValues: T }) {
  return (
    <Paper sx={{ p: 3 }}>
      <MyTextFieldWithValCounter
        initialValues={initialValues}
        label="Title"
        name="title"
        maxValLen={60}
        fullWidth={true}
        required={true}
      />
      <Dropzone label={"Add at least 5 photos"} />
      <button type="submit"> Submit</button>
    </Paper>
  );
}
