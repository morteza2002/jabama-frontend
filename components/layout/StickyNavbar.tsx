/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./StickyNavbar.css";
import ModalPopUp from "../ModalPop/ModalPopUp";
import MainSearch from "../MainSearch/MainSearch";
import Link from "next/link";
import NavMainSearch from "../MainSearch/NavMainSearch/NavMainSearch";

export default function StickyNavbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const handleScroll = () => {
      setShowNavbar(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  const shouldShowNavbar = !isHomePage || showNavbar;

  return (
    <nav
      className={`sticky-navbar ${
        shouldShowNavbar ? "sticky-navbar--visible" : ""
      }`}
    >
      <div className="sticky-navbar__container">
        {}
        <div className="sticky-navbar__logo">
          <Link href={`/`}>
            {" "}
            <img src="/images/jabama-logo.svg" alt="جاباما" />
          </Link>
        </div>

        {}
        <div className="bg-wrapper2">
          <NavMainSearch />
        </div>

        {}
        <div className="sticky-navbar__user">
          <button className="host-button">ثبت‌نام میزبان</button>
          <ModalPopUp />
        </div>
      </div>
    </nav>
  );
}
