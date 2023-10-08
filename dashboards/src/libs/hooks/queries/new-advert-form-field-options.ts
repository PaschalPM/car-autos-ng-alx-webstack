import { useQueries } from "react-query";
import { axiosClient } from "../../requests/@config";
import { AxiosResponse } from "axios";
import { ucfirst } from "../../utils";
import useAuthUserProfile from "../../../store/auth-user";

const fetchUserOptions = () => axiosClient.get("/users");
const fetchBrandOptions = () => axiosClient.get("/brands");
const fetchModelOptions = () => axiosClient.get("/models");
const fetchYearOptions = () => axiosClient.get("/years");
const fetchStateOptions = () => axiosClient.get("/states");
const fetchCityOptions = () => axiosClient.get("/cities");

const useFieldOptions = () => {
  const userProfile = useAuthUserProfile((state) => state.userProfile);

  return useQueries([
    {
      queryKey: ["options", "users"],
      queryFn: fetchUserOptions,
      select: (data: AxiosResponse<ServerUser[]>): OptionType[] => {
        const brandOptions: OptionType[] = data.data
          .filter(
            ({ team_manager }) =>
              userProfile.isManager && userProfile.id === team_manager
          )
          .map(({ id, first_name, last_name }) => ({
            value: id.toString(),
            text: `${ucfirst(first_name)} ${ucfirst(last_name)}`,
          }));
        return brandOptions;
      },
    },
    {
      queryKey: ["options", "brands"],
      queryFn: fetchBrandOptions,
      select: (
        data: AxiosResponse<BrandAndStateServerDataType[]>
      ): OptionType[] => {
        const brandOptions: OptionType[] = data.data.map(({ id, name }) => ({
          value: id.toString(),
          text: ucfirst(name),
        }));
        return brandOptions;
      },
    },
    {
      queryKey: ["options", "models"],
      queryFn: fetchModelOptions,
      select: (
        data: AxiosResponse<ModelServerDataType[]>
      ): (OptionType & { brandId: number })[] => {
        const modelOptions: (OptionType & { brandId: number })[] =
          data.data.map(({ id, brand, name }) => ({
            brandId: brand,
            value: id.toString(),
            text: ucfirst(name),
          }));
        return modelOptions;
      },
    },
    {
      queryKey: ["options", "years"],
      queryFn: fetchYearOptions,
      select: (data: AxiosResponse<YearServerDataType[]>): OptionType[] => {
        const yearOptions: OptionType[] = data.data.map(({ id, year }) => ({
          value: id.toString(),
          text: year.toString(),
        }));
        return yearOptions;
      },
    },
    {
      queryKey: ["options", "states"],
      queryFn: fetchStateOptions,
      select: (
        data: AxiosResponse<BrandAndStateServerDataType[]>
      ): OptionType[] => {
        const stateOptions: OptionType[] = data.data.map(({ id, name }) => ({
          value: id.toString(),
          text: ucfirst(name),
        }));
        return stateOptions;
      },
    },
    {
      queryKey: ["options", "cities"],
      queryFn: fetchCityOptions,
      select: (
        data: AxiosResponse<CityServerDataType[]>
      ): (OptionType & { stateId: number })[] => {
        const cityOptions: (OptionType & { stateId: number })[] = data.data.map(
          ({ id, state, name }) => ({
            stateId: state,
            value: id.toString(),
            text: ucfirst(name),
          })
        );
        return cityOptions;
      },
    },
  ]);
};

export default useFieldOptions;
