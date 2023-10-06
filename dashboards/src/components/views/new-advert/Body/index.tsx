import Paper from "@mui/material/Paper";
import MyTextFieldWithValCounter from "../../../formFields/MyTextAreaWithValCounter";
import Dropzone from "../../../drag_n_drop";
import MySelect from "../../../my-formik/MySelect";
import { useFormikContext } from "formik";
import { type CarAdvert } from "../../../../libs/form-configs/new-advert";
import { ModelSelect, YearSelect, CitySelect, PriceInput } from "./fields";
import SubmitButton from "./SubmitButton";
import { useContext } from "react";
import viewContext from "../context";

const filterModelOptions = (
  modelOptions: (OptionType & { brandId: number })[],
  brandId: number
): OptionType[] => {
  return modelOptions
    .filter((model) => model.brandId === brandId)
    .map(({ value, text }) => ({
      value,
      text,
    }));
};

const filterCityOptions = (
  cityOptions: (OptionType & { stateId: number })[],
  stateId: number
): OptionType[] => {
  return cityOptions
    .filter((city) => city.stateId === stateId)
    .map(({ value, text }) => ({
      value,
      text,
    }));
};

export default function Body<T>({ initialValues }: { initialValues: T }) {
  const { brandOptions, modelOptions, yearOptions, stateOptions, cityOptions } =
    useContext(viewContext);
  const { values } = useFormikContext<CarAdvert>();

  const filteredModelOptions = filterModelOptions(
    modelOptions,
    parseInt(values.brand)
  );
  const filteredCityOptions = filterCityOptions(
    cityOptions,
    parseInt(values.state)
  );

  return (
    <Paper sx={{ p: 3 }}>
      <MySelect
        name={"user"}
        label="User"
        options={[
          { text: "test-value", value: "test" },
          { text: "test-value2", value: "test2" },
        ]}
      ></MySelect>
      <MyTextFieldWithValCounter
        initialValues={initialValues}
        label="Title"
        name="title"
        maxValLen={60}
        fullWidth={true}
        required={true}
      />
      <Dropzone label={"Add at least 5 photos"} />
      <MySelect name={"brand"} label="Brand" options={brandOptions}></MySelect>
      <ModelSelect brand={values.brand} options={filteredModelOptions} />
      <YearSelect
        condition={!!values.brand && !!values.model}
        options={yearOptions}
      />
      <MySelect name={"state"} label="State" options={stateOptions}></MySelect>
      <CitySelect state={values.state} options={filteredCityOptions} />
      <PriceInput />
      <MyTextFieldWithValCounter
        initialValues={initialValues}
        label="Description"
        name="description"
        maxValLen={350}
        fullWidth={true}
        required={true}
        multiline={true}
      />
      <SubmitButton text="Add" suspenseText="Adding" />
    </Paper>
  );
}
