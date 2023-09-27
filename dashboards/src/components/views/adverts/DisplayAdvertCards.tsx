import SingleAdvertCard from "./SingleAdvertCard";
import { carAdverts } from "../../../libs/faker/adverts";
import useAppStore from "../../../store/app";
import { useMemo } from "react";

export default function DisplayAdvertCards() {
  const viewActiveAd = useAppStore((state) => state.viewActiveAd);
  const filteredCarAdverts = useMemo(() => {
    return viewActiveAd
      ? carAdverts.filter((carAd) => carAd.isActive)
      : carAdverts.filter((carAd) => !carAd.isActive);
  }, [viewActiveAd]);
  return filteredCarAdverts.map((carAd) => (
    <>
      <SingleAdvertCard key={carAd.id} carAdvert={carAd} />
    </>
  ));
}
