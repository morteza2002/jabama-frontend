/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

import "./FilterCategoryNoDetails.css";


import type { Residence } from "../../../../Types/FilterCategoryMainPageNoDetails.types";

import MainSwiper, { type MainSwiperRef } from "../MainSwiper";

const API_URL = "http://127.0.0.1:8000";

/*
نوع های مختلف  انتخاب از بین ارایه های api
*/
const CITY_IDS = [1, 5, 4, 5, 6, 2, 7, 3];

function ResidenceCard({
  residence,
  image,
}: {
  residence: Residence;
  image: string;
}) {
  return (
    <article className="residence-card">
      <div className="residence-card-image">
        <img src={`/ResidentPlacesImage/${image}`} alt={residence.name} />
      </div>

      <div className="residence-card-content">
        <h3>{residence.name}</h3>
      </div>
    </article>
  );
}

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

        params.append("category", "1");

        CITY_IDS.forEach((cityId) => {
          params.append("category_location", String(cityId));
        });

        const response = await axios.get(
          `${API_URL}/residences-list/?${params.toString()}`,
        );


        setResidences(response.data.results);
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
      <section className="popular-villa-section">
        <div className="popular-villa-container">
          <div className="residences-loading">در حال دریافت اقامتگاه‌ها...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="popular-villa-section">
        <div className="popular-villa-container">
          <div className="residences-error">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="popular-villa-section popular-villa-section-PopularVilla">
      <div className="popular-villa-container">
        <div className="popular-villa-header">
          <div className="popular-villa-title"></div>

          <div className="popular-villa-navigation"></div>
        </div>

        {residences.length > 0 ? (
          <MainSwiper
            ref={swiperRef}
            slidesPerView={6}
            title="اجاره ویلا در محبوب‌ترین شهرها"
            description="اقامتگاه در شهرهای پربازدید ما"
            residences={residences}
            showDetails={false}
            
          />
        ) : (
          <div className="empty-residences">ویلایی پیدا نشد.</div>
        )}
      </div>
    </section>
  );
}

export default ResidencesSwiper;
