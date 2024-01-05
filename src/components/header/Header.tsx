import { Link } from "react-router-dom";
import { Logo } from "..";
import SideMenu from "./SideMenu";

const Header = () => {
  return (
    <header className="w-full sticky top-0 bg-teal-50 p-4 sm:px-8 flex gap-8 justify-between items-center z-20">
      {/* Logo and Title on the left */}
      <div className="flex items-center flex-grow w-min">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <SideMenu />
    </header>
  );
};

export default Header;
