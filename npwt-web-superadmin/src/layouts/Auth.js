import React from "react";
import { useLocation, Route} from "react-router-dom";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import backgroundVideo from "../assets/img/brand/video.mp4";

const Auth = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div className="main-content" ref={mainContent}>
        <AuthNavbar />
        <video autoPlay loop muted style={{ position: "fixed", width: "100%", height: "100%", objectFit: "cover", zIndex: "-1",}}>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>     
    </div>     
  );
};

export default Auth;
