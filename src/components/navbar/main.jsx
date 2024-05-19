import React, { useEffect, useState } from "react";
import { Menu, XSquare } from "react-feather";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { textConfig } from "../../config";
import EmailVerify from "../banner/emailVerify";
import { CategoryDropdown } from "./categoryDrop";
import LogoutBtn from "./logoutBtn";
import ThemeMode from "./themeMode";

const Navbar = () => {
  const { status, userData } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const navlist = [
    {
      id: 1,
      title: textConfig.navMenu.home,
      href: "/",
      access: true,
    },
    {
      id: 2,
      title: <CategoryDropdown />,
      access: true,
    },
    {
      id: 3,
      title: textConfig.navMenu.myblog,
      href: "/my-blogs",
      access: status,
    },
    {
      id: 4,
      title: <LogoutBtn />,
      access: status,
    },
    {
      id: 5,
      title: textConfig.navMenu.auth,
      href: "/login",
      access: !status,
    },
  ];

  const setBg = () => {
    if (window.scrollY > 250) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", setBg);
    return () => window.removeEventListener("scroll", setBg);
  }, []);

  return (
    <React.Fragment>
      <header
        className={`fixed w-full top-0 left-0 z-50 ${
          scroll && "bg-white/90 dark:bg-gray-900/90"
        }`}
      >
        {!userData?.emailVerification && status && <EmailVerify />}
        <section className="container p-6 lg:p-3 flex justify-between items-center">
          <Link to={"/"} className="block lg:hidden dark:invert">
            <img src="/icon.png" alt="Blog Sphere" />
          </Link>
          <div className="hidden lg:block">
            <Link to={"/"}>
              <h1 className="text-pink-700 ">{textConfig.title}</h1>
            </Link>
            <h6 className="tagline">{textConfig.subtitle}</h6>
          </div>

          <nav>
            <ul
              className={`flex flex-col lg:flex-row items-center xl:gap-x-20 lg:gap-x-10 gap-y-5 absolute lg:relative top-0 left-0 right-0 p-10 lg:p-0 bg-white/90 lg:bg-transparent dark:lg:bg-transparent dark:bg-gray-900/90  lg:shadow-none transition-transform transform duration-200 lg:translate-y-0 ${
                open
                  ? "translate-y-0 dark:shadow-gray-800 shadow-lg"
                  : "-translate-y-full"
              }`}
            >
              {navlist.map((list) =>
                list.access ? (
                  <li className="nav-list" key={list.id}>
                    {list.href ? (
                      <Link to={list.href} className="text-lg">
                        {list.title}
                      </Link>
                    ) : (
                      list.title
                    )}
                  </li>
                ) : null
              )}
              <ThemeMode />
              <XSquare className="lg:hidden" onClick={() => setOpen(false)} />
            </ul>
          </nav>
          <Menu onClick={() => setOpen(true)} className="lg:hidden" />
        </section>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
