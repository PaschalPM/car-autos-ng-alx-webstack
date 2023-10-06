import { createContext } from "react";

type DataType = {
  brandOptions: OptionType[];
  modelOptions: (OptionType & { brandId: number })[];
  yearOptions: OptionType[];
  stateOptions: OptionType[];
  cityOptions: (OptionType & { stateId: number })[];
};

const viewContext = createContext<DataType>({} as DataType);
export default viewContext;
