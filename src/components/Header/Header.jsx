import React from "react";
import Logo from "../../img/chef-logo-1.png";
import Avatar from "../../img/avatar.png";
import { MdShoppingCart } from "react-icons/md";

const lists = ["Home", "Menu", "About Us", "Services"];
const listItems = lists.map((list) => (
  <li className="textbase text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
    {list}
  </li>
));

const Header = () => {
  return (
    <header class="fixed z-50 w-screen p-6 px-16">
      {/* Desktop  & tablet*/}
      <nav className="hidden md:flex w-full p-4 align-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </div>

        {/* Menu */}
        <div className="flex align-center gap-8">
          {/* List Item */}

          <ul className="flex items-center gap-8 ">{listItems}</ul>

          {/* Cart Icon */}

          <div className="relative flex justify-center items-center">
            <MdShoppingCart className="text-textColor text-2xl  cursor-pointer" />
            <span className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -right-2 -top-2">
              <p className="text-xs  text-white font-semibold">2</p>
            </span>
          </div>

          <img
            src={Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
            alt="userprofile"
          />
        </div>

        {/* Mobile */}
        <div className="flex md:hidden w-full h-full bg-blue-600 p-4"></div>
      </nav>
    </header>
  );
};

export default Header;
