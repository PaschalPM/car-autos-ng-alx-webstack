import React from "react";
import viewContext from "./context";
import useFieldOptions from "../../../libs/hooks/queries/new-advert-form-field-options";
import DashboardFeedback from "../DashboardFeedback";

export default function ViewProvider({ children }: React.PropsWithChildren) {
  const queries = useFieldOptions();
  const brandsQuery = queries[0];
  const modelsQuery = queries[1];
  const yearsQuery = queries[2];
  const statesQuery = queries[3];
  const citiesQuery = queries[4];

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  return (
    <DashboardFeedback
      isLoading={isLoading}
      isError={isError}
      handleRetry={() => queries.map((query) => query.refetch())}
    >
      <viewContext.Provider
        value={{
          brandOptions: brandsQuery.data as OptionType[],
          modelOptions: modelsQuery.data as (OptionType & {
            brandId: number;
          })[],
          yearOptions: yearsQuery.data as OptionType[],
          stateOptions: statesQuery.data as OptionType[],
          cityOptions: citiesQuery.data as (OptionType & { stateId: number })[],
        }}
      >
        {children}
      </viewContext.Provider>
    </DashboardFeedback>
  );
}
