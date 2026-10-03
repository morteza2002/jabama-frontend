
"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import "./MainSwiper.css";

import SwiperNavigation from "./SwiperNavigation";
import SwiperTitle from "./SwiperTitle";

import { RESIDENCE_IMAGES } from "../../../data/residenceImages";

import type { Residence } from "../../../Types/FilterCategoryMainPageNoDetails.types";

interface MainSwiperProps {
  residences?: Residence[];
  slidesPerView?: number;
  title?: string;
  description?: string;
  showDetails?: boolean;
}

export interface MainSwiperRef {
  slidePrev: () => void;
  slideNext: () => void;
}

const MainSwiper = forwardRef<MainSwiperRef, MainSwiperProps>(
  function MainSwiper(
    {
      residences = [],
      slidesPerView = 4,
      title,
      description,
      showDetails = true,
    }: MainSwiperProps,
    ref,
  ) {
    const swiperRef = useRef<SwiperType | null>(null);

    useImperativeHandle(ref, () => ({
      slidePrev: () => {
        swiperRef.current?.slidePrev();
      },

      slideNext: () => {
        swiperRef.current?.slideNext();
      },
    }));

    return (
      <>
        {(title || description) && (
          <div className="main-swiper-header">
            <SwiperTitle
              title={title || ""}
              description={description || ""}
            />

            <SwiperNavigation swiperRef={swiperRef} />
          </div>
        )}

        <Swiper
          className="main-swiper"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          dir="rtl"
          spaceBetween={0}
          slidesPerView={slidesPerView}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 12,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 14,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
            1024: {
              slidesPerView,
              spaceBetween: 0,
            },
            1200: {
              slidesPerView,
              spaceBetween: 0,
            },
          }}
        >
          {residences.map((residence) => (
            <SwiperSlide key={residence.id}>
              <Link href={`/Allresidences/${residence.id}`}>
                <ResidenceCard
                  residence={residence}
                  image={
                    RESIDENCE_IMAGES[
                      residence.id % RESIDENCE_IMAGES.length
                    ]
                  }
                  showDetails={showDetails}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  },
);

function ResidenceCard({
  residence,
  image,
  showDetails = true,
}: {
  residence: Residence;
  image: string;
  showDetails?: boolean;
}) {
  const formattedPrice = new Intl.NumberFormat("fa-IR").format(
    residence.price,
  );

  return (
    <article
      className={
        showDetails
          ? "residence-card-detail"
          : "residence-card"
      }
    >
      <div
        className={
          showDetails
            ? "residence-card-imageDetail"
            : "residence-card-image"
        }
      >
        <img
          src={`/ResidentPlacesImage/${image}`}
          alt={residence.name}
        />
      </div>

      <div
        className={
          showDetails
            ? "residence-card-content"
            : "residence-card-content"
        }
      >
        {showDetails ? (
          <>
            <div className="residence-rating">
              <span className="rating-star">★</span>

              <span className="rate-num">
                {residence.average_ratings.toLocaleString("fa-IR")}
              </span>

              <span className="rating-text">
                (۴ دیدگاه)
              </span>
            </div>

            <h3>{residence.name}</h3>

            <p className="residence-location">
              استان گلستان، گرگان، اتاق
            </p>

            <div className="residence-price">
              <strong>{formattedPrice} تومان</strong>

              <span className="per-night-color">
                / هر شب
              </span>
            </div>
          </>
        ) : (
          <h3>{residence.name}</h3>
        )}
      </div>
    </article>
  );
}

export default MainSwiper;
