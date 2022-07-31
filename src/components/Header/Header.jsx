import React, { useState } from "react";
import LogoImg from "../../img/chef-logo-1.png";
import Avatar from "../../img/avatar.png";
import { MdShoppingCart, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase.config.js";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const Logo = (
  <Link to="/" className="flex items-center gap-2">
    <img src={LogoImg} className="w-8 object-cover" alt="logo" />
    <p className="text-headingColor text-xl font-bold">City</p>
  </Link>
);

const lists = ["Home", "Menu", "About Us", "Services"];

const shoppingCart = (
  <div className="relative flex justify-center items-center">
    <MdShoppingCart className="text-textColor text-2xl  cursor-pointer" />
    <span className="w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center absolute -right-2 -top-2">
      <p className="text-xs  text-white font-semibold">2</p>
    </span>
  </div>
);

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [openMenu, setOpenMenu] = useState(false);
  // Login
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      console.log(refreshToken, providerData);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setOpenMenu(!openMenu);
    }
  };
  const logOut = () => {
    setOpenMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  console.log("Header Render");

  return (
    <header className="fixed z-50 w-screen p-4  md:p-6 md:px-10">
      {/* Desktop  & tablet*/}
      <nav className="hidden md:flex w-full align-center justify-between">
        {/* Logo */}
        {Logo}

        {/* Menu */}
        <div className="flex align-center gap-8">
          {/* List Item */}

          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-6 lg:gap-8 "
          >
            {lists.map((list, index) => (
              <li
                key={index}
                className="textbase text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              >
                {list}
              </li>
            ))}
          </motion.ul>

          {/* Cart Icon */}

          {shoppingCart}
          {/* User Icon */}
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.8 }}
              src={user ? user.photoURL.replaceAll(`"`, "") : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer"
              alt="userprofile"
              onClick={login}
            />

            {/* Pop up */}
            {openMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="absolute w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col p-2 top-12 -right-6 gap-4"
              >
                {/* Admin only Button */}
                {user && user.email === "kiritokirikaya80@gmail.com" && (
                  <Link to="/create-item">
                    <p className="px-4 py-2 flex items-center justify-between rounded-md gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item
                      <MdAdd />
                    </p>
                  </Link>
                )}
                {/* Logout Button */}
                <p
                  className=" px-4 py-2 shadow-md bg-red-600 flex items-center justify-between rounded-md gap-3 cursor-pointer hover:bg-red-600/90 transition-all duration-100 ease-in-out text-white text-base"
                  onClick={logOut}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile */}
      <nav className="flex justify-between md:hidden w-full h-full">
        {shoppingCart}
        {Logo}

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.8 }}
            src={user ? user.photoURL.replaceAll(`"`, "") : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer"
            alt="userprofile"
            onClick={login}
          />

          {/* Pop up */}
          {openMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute w-40 gap-[7px] bg-gray-50 shadow-xl rounded-lg flex flex-col p-2 top-12 right-0 "
            >
              {/* Admin only Button */}
              {user && user.email === "kiritokirikaya80@gmail.com" && (
                <Link to="/create-item">
                  {
                    <p className="px-4 py-2 flex items-center justify-between rounded-md gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item
                      <MdAdd />
                    </p>
                  }
                </Link>
              )}
              <ul className="flex flex-col gap-[7px]">
                {lists.map((list, index) => (
                  <li
                    key={index}
                    className="textbase  px-4 py-2 text-textColor rounded-md hover:bg-slate-100 transition-all duration-100 ease-in-out cursor-pointer"
                  >
                    {list}
                  </li>
                ))}
              </ul>
              {/* Logout Button */}
              <p
                className=" px-4 py-2 shadow-md bg-red-600 flex items-center justify-between rounded-md gap-3 cursor-pointer hover:bg-red-600/90 transition-all duration-100 ease-in-out text-white text-base"
                onClick={logOut}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
