import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "react-feather";

const socials = [
  {
    id: 1,
    icon: <Twitter />,
    href: "https://twitter.com/",
  },
  {
    id: 2,
    icon: <Instagram />,
    href: "https://www.instagram.com/",
  },
  {
    id: 3,
    icon: <Facebook />,
    href: "https://www.facebook.com/",
  },
  {
    id: 4,
    icon: <Linkedin />,
    href: "https://www.linkedin.com/in/myself-shafi/",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-10 footer-color">
      <section className="container px-3">
        <h3 className="font-comic-neue text-center tracking-widest">
          Explore. Post. Connect.
        </h3>
        <div className="lg:flex p-8 divide divide-y-4 divide-x-0 lg:divide-y-0 lg:divide-x-4 divide-gray-200 dark:divide-gray-950">
          <div className="mb-10 lg:mb-0 flex basis-1/3 justify-center items-center gap-10 ">
            {socials.map((list) => (
              <a target="_blank" key={list.id} href={list.href}>
                {list.icon}
              </a>
            ))}
          </div>
          <div className="basis-1/3 ">
            <form
              noValidate
              onSubmit={(e) => e.preventDefault()}
              className="my-10 flex flex-col w-8/12 mx-auto space-y-2"
            >
              <label htmlFor="sub_email">Enter your Email here</label>
              <input
                type="email"
                id="sub_email"
                required
                placeholder="email address..."
              />
              <button className="btn-outline dark:border-gray-950 border-gray-200">
                Subscribe Now
              </button>
            </form>
          </div>
          <div className="flex basis-1/3 justify-center items-center text-center">
            <p className="mt-10 lg:mt-0">
              © {currentYear} by Blog Space. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
