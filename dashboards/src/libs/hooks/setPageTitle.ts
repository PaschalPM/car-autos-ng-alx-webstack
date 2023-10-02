import useAppStore from "../../store/app";
import { useEffect } from "react";


const usePageTitleSetter = (pageTitle: string) => {
    const setPageTitle = useAppStore((state) => state.setPageTitle);
    useEffect(() => {
        document.title = pageTitle
        setPageTitle(pageTitle);
        // eslint-disable-next-line
      }, []);
}

export default usePageTitleSetter