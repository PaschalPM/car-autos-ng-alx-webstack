import useAppStore from "../../store/app";
import { useEffect } from "react";
import FirstBar from "../../components/views/adverts/FirstBar";
import SecondBar from "../../components/views/adverts/SecondBar";
import DisplayAdvertCards from "../../components/views/adverts/DisplayAdvertCards";
import FloatingButton from "../../components/views/adverts/FloatingButton";
import { urlPath } from "../../libs/utils";


export default function Adverts() {
  const setPageTitle = useAppStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle("Adverts");
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <FirstBar />
      <SecondBar />
      <DisplayAdvertCards/>
      <FloatingButton urlPath={urlPath("my-adverts:new")}/>
    </>
  );
}
