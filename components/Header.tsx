import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import DarkIcon from "./icons/Dark";
import LogoIcon from "./icons/Logo";

const buttons = [{ href: "/", text: "Blog" }, { href: "/about", text: "About" }];

type HeaderButtonProps = {
  href: string;
  text: string;
};

function HeaderButton({ href, text }: HeaderButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-md px-4 py-2 text-gray-500 transition-colors hover:bg-green-400 hover:text-black"
    >
      {text}
    </Link>
  );
}

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <header className="fixed top-0 z-20 w-full bg-white bg-opacity-80 backdrop-blur backdrop-saturate-150 dark:bg-opacity-60">
      <div className="container mx-auto flex h-16 max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" passHref className="flex items-center p-2 leading-none">
          <LogoIcon size="lg" className="mr-2" />
          <span className="text-lg font-bold">Toby Nguyen</span>
        </Link>
        <div className="flex items-center">
          <nav className="px-2">
            {buttons.map(({ href, text }) => (
              <HeaderButton key={href} href={href} text={text} />
            ))}
          </nav>
          <button
            className="p-2 leading-none text-gray-300 transition-colors hover:text-black"
            onClick={handleChangeTheme}
            aria-label="Toggle theme"
          >
            <DarkIcon size="sm" />
          </button>
        </div>
      </div>
    </header>
  );
}
