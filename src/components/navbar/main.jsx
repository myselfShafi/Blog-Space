import React, { useEffect, useState } from "react";
import { Menu, XSquare } from "react-feather";
import { textConfig } from "../../config";
import { CategoryDropdown } from "./categoryDrop";
import ThemeMode from "./themeMode";

const navlist = [
  {
    id: 1,
    title: textConfig.navMenu.home,
    href: "/",
  },
  {
    id: 2,
    title: <CategoryDropdown />,
  },
  {
    id: 3,
    title: textConfig.navMenu.about,
    href: "/about",
  },
  {
    id: 4,
    title: textConfig.navMenu.contact,
    href: "/contact-us",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

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
    <header
      className={`fixed w-full top-0 left-0 z-50 max-h-40 ${
        scroll && "bg-white/90 dark:bg-gray-900/90"
      }`}
    >
      <section className="container p-6 lg:p-3 flex justify-between items-center">
        <div className="block lg:hidden dark:invert">
          <img src="/public/icon.png" alt="Blog Sphere" />
        </div>
        <div className="hidden lg:block">
          <h1 className="text-pink-700 ">{textConfig.title}</h1>
          <h6 className="tagline">{textConfig.subtitle}</h6>
        </div>

        <nav>
          <ul
            className={`flex flex-col lg:flex-row items-center xl:gap-x-20 lg:gap-x-10 gap-y-5 absolute lg:relative top-0 left-0 right-0 p-10 bg-white/90 lg:bg-transparent dark:lg:bg-transparent dark:bg-gray-900/90  lg:shadow-none transition-transform transform duration-200 -translate-y-full lg:translate-y-0 ${
              open && "translate-y-0 dark:shadow-gray-800 shadow-lg"
            }`}
          >
            {navlist.map((list) => (
              <li className="nav-list" key={list.id}>
                {list.href ? <a href={list.href}>{list.title}</a> : list.title}
              </li>
            ))}
            <ThemeMode />
            <XSquare className="lg:hidden" onClick={() => setOpen(false)} />
          </ul>
        </nav>
        <Menu onClick={() => setOpen(true)} className="lg:hidden" />
      </section>
    </header>
  );
};

export default Navbar;
