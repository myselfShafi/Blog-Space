import React, { useState } from "react";
import { Menu } from "react-feather";
import { textConfig } from "../../config";
import { CategoryDropdown } from "./categoryDrop";
import ThemeMode from "./themeMode";

const navlist = [
  {
    id: 1,
    title: textConfig.navMenu.home,
    href: "#",
  },
  {
    id: 2,
    title: <CategoryDropdown />,
  },
  {
    id: 3,
    title: textConfig.navMenu.about,
    href: "#",
  },
  {
    id: 4,
    title: textConfig.navMenu.contact,
    href: "#",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(true);
  };
  return (
    <header className="relative">
      <section className="container p-3 flex justify-between items-center">
        <div className="block lg:hidden dark:invert">
          <img src="/public/icon.png" alt="Blog Sphere" />
        </div>
        <div className="hidden lg:block">
          <h1 className="text-pink-700 ">{textConfig.title}</h1>
          <h6 className="tagline">{textConfig.subtitle}</h6>
        </div>

        <nav>
          <ul
            className={`flex flex-col lg:flex-row items-center xl:gap-x-20 lg:gap-x-10 gap-y-5 absolute lg:relative top-0 left-0 right-0 p-10 bg-white/90 dark:bg-gray-900/90 dark:shadow-gray-800 shadow-lg lg:shadow-none transition-transform transform duration-200 -translate-y-full lg:translate-y-0 ${
              open && "translate-y-1"
            }`}
            onMouseOutCapture={() => setOpen(false)}
          >
            {navlist.map((list) => (
              <li className="nav-list" key={list.id}>
                {list.href ? <a href={list.href}>{list.title}</a> : list.title}
              </li>
            ))}
            <ThemeMode />
          </ul>
        </nav>
        <Menu onClick={handleToggle} className="cursor-pointer lg:hidden" />
      </section>
    </header>
  );
};

export default Navbar;
