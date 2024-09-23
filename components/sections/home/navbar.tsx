"use client";
import Link from "next/link";
import { useState } from "react";
import Container from "./container";
const menuitems = [
  {
    title: "Features",
    path: "#",
    children: [
      { title: "Action", path: "/" },
      { title: "Another action", path: "#" },
      { title: "Dropdown Submenu", path: "#" },
      { title: "404 Page", path: "/404" },
    ],
  },
  {
    title: "Pricing",
    path: "/pricing",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Pro Version",
    badge: true,
    path: "https://astroship-pro.web3templates.com/",
  },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Container>
      <header className="my-5 flex flex-col items-center justify-between lg:flex-row">
        <div className="flex w-full items-center justify-between lg:w-auto">
          <a href="/" className="text-3xl">
            <span className="font-bold text-stone-800">dify</span>
          </a>
          <div
            className="block lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* <MenuIcon className="h-4 w-4 text-gray-800" /> */}
          </div>
        </div>
        {/* <MenuItems
          className={`${
            menuOpen ? "block" : "hidden"
          } mt-2 w-full lg:mt-0 lg:flex lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:gap-3">
            {menuitems.map((item, index) => (
              <React.Fragment key={index}>
                {item.children ? (
                  <Dropdown
                    title={item.title}
                    lastItem={index === menuitems.length - 1}
                  >
                    {item.children}
                  </Dropdown>
                ) : (
                  <li>
                    <a
                      href={item.path}
                      className="flex items-center py-2 text-gray-600 hover:text-gray-900 lg:px-3"
                    >
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-1 animate-pulse rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                          New
                        </span>
                      )}
                    </a>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-4 lg:hidden">
            <Link href="#">Log in</Link>
            <Link href="#">Sign up</Link>
          </div>
        </MenuItems> */}
        {/* </Astronav> */}
        <div>
          <div className="hidden items-center gap-4 lg:flex">
            <a href="https://app.dify.com.br" target="_blank">
              Log in
            </a>
            <Link
              href="https://app.dify.com.br"
              target="_blank"
              className="bg-black px-4 py-2 text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>
    </Container>
  );
};

export default Header;
