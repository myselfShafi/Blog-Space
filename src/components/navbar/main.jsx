import { MoonIcon } from "@heroicons/react/16/solid";
import React from "react";
import { CategoryDropdown } from "./categoryDrop";

const navlist = [
  {
    id: 1,
    title: "Home",
  },
  {
    id: 2,
    title: <CategoryDropdown />,
  },
  {
    id: 3,
    title: "About",
  },
  {
    id: 4,
    title: "Contact Us",
  },
];

const Navbar = () => {
  return (
    <header>
      <section className="container p-3 flex justify-between items-center">
        <div>
          <h1 className="text-pink-700">Blog Space</h1>
          <h6 className="tagline">Your Space for Endless Stories.</h6>
        </div>

        <nav>
          <ul className="flex gap-x-20">
            {navlist.map((list) => (
              <li className="nav-list" key={list.id}>
                {list.title}
              </li>
            ))}
            <MoonIcon className="size-8" />
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Navbar;
