import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MySelect from "../../../my-formik/MySelect";
import { useField } from "formik";
import { FaNairaSign } from "react-icons/fa6";

export const ModelSelect = ({ brand, options }: { brand: string, options: OptionType[] }) => {
  return (
    !!brand && (
      <MySelect
        name={"model"}
        label="Model"
        options={options}
      ></MySelect>
    )
  );
};

export const YearSelect = ({ condition, options }: { condition: boolean, options: OptionType[] }) => {
  return (
    condition && (
      <MySelect
        name={"year"}
        label="Year"
        defaultValue="test"
        options={options}
      ></MySelect>
    )
  );
};

export const CitySelect = ({ state, options }: { state: string, options: OptionType[] }) => {
  return (
    !!state && (
      <MySelect
        name={"city"}
        label="City"
        options={options}
      ></MySelect>
    )
  );
};

export const PriceInput = () => {
  const [field, meta, helpers] = useField("price");

  const formatPrice = (input: string) => {
    const formatedPrice = input.replace(/[^\d]/g, "");
    return !isNaN(parseInt(formatedPrice))
      ? parseInt(formatedPrice).toLocaleString()
      : "";
  };
  return (
    <TextField
      {...field}
      fullWidth
      size="small"
      label="Price"
      required
      error={!!meta.error && meta.touched}
      helperText={!!meta.error && meta.touched && meta.error}
      sx={{ mb:2 }}
      onChange={(ev) => {
        const value = ev.target.value;

        helpers.setValue(formatPrice(value));
      }}
      InputProps={{
        startAdornment: (
          <Typography mr={1}>
            <FaNairaSign />
          </Typography>
        ),
      }}
    />
  );
};
