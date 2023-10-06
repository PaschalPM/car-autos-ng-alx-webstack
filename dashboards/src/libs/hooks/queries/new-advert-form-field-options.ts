import { useQueries } from "react-query"
import { axiosClient } from "../../requests/@config"
import { AxiosResponse } from "axios"
import { ucfirst } from "../../utils"

const fetchBrandOptions = () => axiosClient.get('/brands')
const fetchModelOptions = () => axiosClient.get('/models')
const fetchYearOptions = () => axiosClient.get('/years')
const fetchStateOptions = () => axiosClient.get('/states')
const fetchCityOptions = () => axiosClient.get('/cities')


const useFieldOptions = () => useQueries([
    {
        queryKey: ["options", "brands"],
        queryFn: fetchBrandOptions,
        select: (data: AxiosResponse<BrandAndStateServerDataType[]>): OptionType[] => {
            const brandOptions: OptionType[] = data.data.map(({ id, name }) => ({
                value: id.toString(),
                text: ucfirst(name)
            }))
            return brandOptions
        }
    },
    {
        queryKey: ["options", "models"],
        queryFn: fetchModelOptions,
        select: (data: AxiosResponse<ModelServerDataType[]>): (OptionType & { brandId: number })[] => {
            const modelOptions: (OptionType & { brandId: number })[] = data.data.map(({ id, brand_id, name }) => ({
                brandId: brand_id,
                value: id.toString(),
                text: ucfirst(name)
            }))
            return modelOptions
        }
    },
    {
        queryKey: ["options", "years"],
        queryFn: fetchYearOptions,
        select: (data: AxiosResponse<YearServerDataType[]>): OptionType[] => {
            const yearOptions: OptionType[] = data.data.map(({ id, year }) => ({
                value: id.toString(),
                text: year.toString()
            }))
            return yearOptions
        }
    },
    {
        queryKey: ["options", "states"],
        queryFn: fetchStateOptions,
        select: (data: AxiosResponse<BrandAndStateServerDataType[]>): OptionType[] => {
            const stateOptions: OptionType[] = data.data.map(({ id, name }) => ({
                value: id.toString(),
                text: ucfirst(name)
            }))
            return stateOptions
        }
    },
    {
        queryKey: ["options", "cities"],
        queryFn: fetchCityOptions,
        select: (data: AxiosResponse<CityServerDataType[]>): (OptionType & { stateId: number })[] => {
            const cityOptions: (OptionType & { stateId: number })[] = data.data.map(({ id, state_id, name }) => ({
                stateId: state_id,
                value: id.toString(),
                text: ucfirst(name)
            }))
            return cityOptions
        }
    }
])

export default useFieldOptions