import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  //useLocation : 사용자가 현재 머물러있는 페이지에 대한 정보를 알려주는 hooks
  const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;