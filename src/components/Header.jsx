import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }

    navigate("/user");
  };
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0  z-40 flex  flex-col gap-1 justify-center bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto  flex items-center px-2 justify-between  ">
          {/* logo */}
          <div className="h-full ">
            <Link to="/" className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* Search */}

          <div className="hidden lg:block ">
            <Search />
          </div>

          {/* login and my cart */}
          <div className="">
            {/* user icons display in only mobile version */}
            <button
              className="text-neutral-700 lg:hidden "
              onClick={handleMobileUser}
            >
              <FaCircleUser size={26} />
            </button>
            {/* Desktop */}
            <div className="hidden lg:flex mr-3  gap-10 items-center">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex select-none items-center gap-1 cursor-pointer"
                  >
                    <p>Account</p>
                    {openUserMenu ? (
                      <FaAngleUp size={25} />
                    ) : (
                      <FaAngleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-13">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg px-2">
                  Login
                </button>
              )}

              <button className="flex items-center gap-2 bg-green-700 hover:bg-green-900 px-3 py-3 rounded text-white">
                {/* add to cart icon */}
                <div className="animate-bounce">
                  <FaCartShopping size={26} />
                </div>

                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto  px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
