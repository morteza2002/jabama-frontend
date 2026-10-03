/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import "./FilterCategoryWithDetails.css";


import type { Residence } from "../../../../Types/FilterCategoryMainPageNoDetails.types";

import MainSwiper, { type MainSwiperRef } from "../MainSwiper";
import Link from "next/link";

const API_URL = "http://127.0.0.1:8000";



function ResidencesSwiper() {
  const swiperRef = useRef<MainSwiperRef | null>(null);
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
    <section className="section">
      <div className="container">
        <div className="header">
          <div className="title">
            <h2> </h2>
            <p></p>
          </div>

          <div className="navigation">
            {/* <button
              type="button"
              className="nav-button nav-prev"
              aria-label="اسلاید قبلی"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              ‹
            </button>

            <button
              type="button"
              className="nav-button nav-next"
              aria-label="اسلاید بعدی"
              onClick={() => swiperRef.current?.slideNext()}
            >
              ›
            </button> */}
            <Link href={`/Allresidences/`}>
              <button className="seeAll-button">مشاهده همه</button>
            </Link>
          </div>
        </div>

        {residences.length > 0 ? (
          <MainSwiper
            ref={swiperRef}
            slidesPerView={6}
            title="جذاب‌ترین ویلاهای اطراف تهران"
            description="ویلاهای استخردار برای سفر آخر هفته‌ای با ما"
               residences={residences}
          />
            
        ) : (
          <div className="empty-residences">ویلایی پیدا نشد.</div>
        )}
      </div>
    </section>
  );
}

export default ResidencesSwiper;
