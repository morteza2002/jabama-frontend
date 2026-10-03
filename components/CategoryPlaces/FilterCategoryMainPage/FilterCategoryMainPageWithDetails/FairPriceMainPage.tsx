/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "./FilterCategoryWithDetails.css";

import type { Residence } from "../../../../Types/FilterCategoryMainPageWithDetails.types";
import { RESIDENCE_IMAGES } from "../../../../data/residenceImages";
import Link from "next/link";

const API_URL = "http://127.0.0.1:8000";

function ResidenceCard({
  residence,
  image,
}: {
  residence: Residence;
  image: string;
}) {
  const formattedPrice = new Intl.NumberFormat("fa-IR").format(residence.price);
  // این یه مورد فیچر های ظاهریش متفاوت از بقیه هست
  return (
    <article className="residence-card-detail">
      <div className="residence-card-imageDetail">
        <img src={`/ResidentPlacesImage/${image}`} alt={residence.name} />
      </div>

      <div className="residence-card-content">
        <div className="residence-rating">
          <span className="rating-star">★</span>
          <span className="rate-num">
            {residence.average_ratings.toLocaleString("fa-IR")}
          </span>
           {/* فعلا استاتیک بمانه  */}
          <span className="rating-text">(۴ دیدگاه)</span>
        </div>

        <h3>{residence.name}</h3>

        <p className="residence-location">استان گلستان، گرگان، اتاق</p>

        <div className="residence-price">
          <strong>{formattedPrice} تومان</strong>
          <span className="per-night-color">/ هر شب</span>
        </div>
      </div>
    </article>
  );
}

function ResidencesSwiper() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [residences, setResidences] = useState<Residence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResidences = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        const response = await axios.get(
          `${API_URL}/residences-list/?${params.toString()}`,
        );

        const sortedResidences = [...response.data.results].sort(
          (a, b) => a.price - b.price,
        );


        setResidences(sortedResidences);
      } catch (error) {
        console.error("Residence API Error:", error);

        setError("دریافت اطلاعات اقامتگاه‌ها با خطا مواجه شد.");
      } finally {
        setLoading(false);
      }
    };

    fetchResidences();
  }, []);

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <div className="residences-loading">در حال دریافت اقامتگاه‌ها...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="container">
          <div className="residences-error">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className=" section-withstyle">
      <div className="container">
        <div className="header">
          <div className="title">
            <h2 className="header-text-intro">قیمت منصفانه</h2>
            <p className="text-paragraph-intro">
              قیمت متناسب با میزان بازدید، تقاضا و امکانات
            </p>
          </div>

          <div className="navigation" >
            <button
              type="button"
              className="nav-button nav-hover nav-prev"
              style={{ position: "relative", bottom: "-50px" }}
              aria-label="اسلاید قبلی"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              ‹
            </button>

            <button
              type="button"
                  style={{ position: "relative", bottom: "-50px" }}
              className="nav-button nav-hover nav-next"
              aria-label="اسلاید بعدی"
              onClick={() => swiperRef.current?.slideNext()}
            >
              ›
            </button>
            <Link href={`/Allresidences/`}>
              <button 
                  style={{ position: "relative" , left:"10px", top:"50px" }}
              className="seeAll-button">مشاهده همه</button>
            </Link>
          </div>
        </div>

        {residences.length > 0 ? (
          <Swiper
            className="swiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            dir="rtl"
            spaceBetween={15}
            slidesPerView={5}
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
                slidesPerView: 5,
                spaceBetween: 15,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
            }}
          >
            {residences.map((residence, index) => (
              <SwiperSlide key={residence.id}>
                <ResidenceCard
                  residence={residence}
                  image={RESIDENCE_IMAGES[index % RESIDENCE_IMAGES.length]}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="empty-residences">ویلایی پیدا نشد.</div>
        )}
      </div>
    </section>
  );
}

export default ResidencesSwiper;
