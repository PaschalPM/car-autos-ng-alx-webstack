import usePageTitleSetter from "../../libs/hooks/setPageTitle";
import FirstBar from "../../components/views/adverts/FirstBar";
import SecondBar from "../../components/views/adverts/SecondBar";
import DisplayAdvertCards from "../../components/views/adverts/DisplayAdvertCards";
import FloatingButton from "../../components/views/adverts/FloatingButton";
import { urlPath } from "../../libs/utils";

export default function Adverts() {
  usePageTitleSetter("Adverts");

  return (
    <>
      <FirstBar />
      <SecondBar />
      <DisplayAdvertCards />
      <FloatingButton urlPath={urlPath("my-adverts:new")} />
    </>
  );
}
