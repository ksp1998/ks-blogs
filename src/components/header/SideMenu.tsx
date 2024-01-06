import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const SideMenu = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const isLoggedIn = useSelector((state: any) => state.loggodIn);

  const menuItems = useMemo(
    () => [
      { text: "Home", href: "/", active: true },
      { text: "Blogs", href: "/blogs", active: true },
      { text: "Post a Blog", href: "/create", active: true },
      { text: "My Blogs", href: "/my-blogs", active: isLoggedIn },
    ],
    [isLoggedIn]
  );

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      {!isLoggedIn && (
        <div className="flex gap-2 sm:gap-4">
          <Link
            to="/signin"
            className=" rounded-md border-2 border-teal-900 px-3 py-2 text-sm font-semibold text-teal-900 shadow-sm hover:scale-95 duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Sign In
          </Link>
          <Link
            to="signup"
            className=" rounded-md border-2 border-teal-900 bg-teal-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:scale-95 duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Sign Up
          </Link>
        </div>
      )}

      {/* Menu bar Icon */}
      {!isSidebarOpen && (
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="scale-150 text-teal-900 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      )}

      {/* Close button */}
      {isSidebarOpen && (
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="scale-150 text-teal-50 focus:outline-none z-30"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}

      {/* Sidebar (hidden by default) */}
      <nav
        className={`fixed top-0 right-0 h-full w-full bg-teal-800 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out z-20 overflow-hidden`}
      >
        <div className="h-full flex flex-col justify-center text-white pt-24">
          {menuItems.map(
            (item) =>
              item.active && (
                <Link
                  key={item.text}
                  to={item.href}
                  className="w-full text-white text-center font-bold duration-300 p-5 text-5xl hover:scale-125 hover:text-teal-950"
                  onClick={toggleSidebar}
                >
                  {item.text}
                </Link>
              )
          )}

          {isLoggedIn && (
            <LogoutButton className="my-24 w-full text-white text-center font-bold duration-300 p-5 text-5xl hover:scale-125 hover:text-teal-950" />
          )}
        </div>
      </nav>
    </>
  );
};

export default SideMenu;
