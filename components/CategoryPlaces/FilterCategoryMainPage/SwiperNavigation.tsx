"use client";

import type { RefObject } from "react";
import type { Swiper as SwiperType } from "swiper";


interface SwiperNavigationProps {
  swiperRef: RefObject<SwiperType | null>;
}

const SwiperNavigation = ({ swiperRef }: SwiperNavigationProps) => {
  return (
    <div className="popular-villa-navigation">
      <button
        type="button"
        className="villa-nav-button villa-nav-prev"
        aria-label="اسلاید قبلی"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        ‹
      </button>

      <button
        type="button"
        className="villa-nav-button villa-nav-next"
        aria-label="اسلاید بعدی"
        onClick={() => swiperRef.current?.slideNext()}
      >
        ›
      </button>
    </div>
  );
};

export default SwiperNavigation;