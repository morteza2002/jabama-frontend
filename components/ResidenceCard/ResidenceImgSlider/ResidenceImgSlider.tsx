"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./ResidenceImgSlider.css";

interface ResidenceImgSliderProps {
  images?: string[];
  name: string;
}

const ResidenceImgSlider = ({
  images = [],
  name,
}: ResidenceImgSliderProps) => {
  return (
    <Swiper
      pagination={true}
      modules={[Pagination]}
      className="residence-image-swiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={`/ResidentPlacesImage/${image}`}
            alt={`${name} - تصویر ${index + 1}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ResidenceImgSlider;