import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ className = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate("/");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  return (
    <button type="button" className={className} onClick={logoutHandler}>
      Logout
    </button>
  );
};

export default LogoutButton;
