import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protect = ({ children = <></>, authenticate = false }) => {
  const isLoggedIn = useSelector((state: any) => state.loggodIn);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authenticate && isLoggedIn !== authenticate) {
      navigate("/signin");
    } else if (!authenticate && isLoggedIn !== authenticate) {
      navigate("/");
    }
    setLoader(false);
  }, [authenticate, isLoggedIn, navigate, setLoader]);

  return loader ? <h1>Loading...</h1> : children;
};

export default Protect;
