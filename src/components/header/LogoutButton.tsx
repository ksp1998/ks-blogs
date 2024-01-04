import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/slices/authSlice";

const LogoutButton = ({ className = "" }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => dispatch(logout()));
  };
  return (
    <button
      type="button"
      className={`rounded-md border-2 border-teal-900 bg-teal-900 px-3 py-2 text-sm font-semibold text-white shadow-sm duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${className}`}
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
