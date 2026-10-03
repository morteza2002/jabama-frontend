"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./Detail.css";
const travelLinks = [
  "اقامتگاه بومگردی قم",
  "اقامتگاه رشت",
  "ویلا انزلی",
  "اجاره ویلا در فیلبند",
  "اجاره ویلا نور",
  "اجاره ویلا در کوهسار کرج",
  "اقامتگاه بومگردی",
  "اجاره ویلا در کرج",
  "اجاره روزانه خانه در تهران",
  "اجاره ویلا رامسر",
  "هتل جنگلی جواهرده",
  "اجاره ویلا کردان",
  "سوئیت مشهد",
  "ویلا متل قو",
  "مسافرخانه مشهد",
  "زانس",
  "مسافرخانه تهران",
  "اجاره ویلا برای مهمانی",
  "اجاره ویلا برای تولد",
];
export default function IranTravelInfo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="iran-travel-info" dir="rtl">
      {" "}
      <div className="iran-travel-info__container">
        {" "}
        {}{" "}
        <div className="iran-travel-info__description">
          {" "}
          <h2>
            {" "}
            اجاره ویلا، سوئیت، آپارتمان، کلبه، بومگردی و انواع اقامتگاه در شمال
            و سراسر ایران از جاباما{" "}
          </h2>{" "}
          <div
            className={`iran-travel-info__content ${isOpen ? "iran-travel-info__content--open" : ""}`}
          >
            {" "}
            <p>
              {" "}
              <span>
                {" "}
                سفر همیشه با خودش یک حال خوب دارد؛ با لذت بردن از انرژی هستی و
                دل به جاده می‌زنی تا با سفر می‌کنی تا این «حال خوش» را در
                جاده‌های دورتر و زیر آسمان آبی‌تر پیدا کنی. اگر اینجایی، یعنی به
                دنبال همین «حال خوش سفر» آمده‌ای! اینجا دستت برای اجاره ویلا در
                هر جای ایران باز است. از شمال تا جنوب، از شرق تا غرب ایران و با
                هر امکاناتی که بخواهی؛ از اجاره ویلا در شمال برای خوشگذرانی لب
                دریا هستی؟{" "}
              </span>{" "}
              <span className="iran-travel-info__more">
                {" "}
                یک کلبه جنگلی دنج یا ویلا استخردار برای سفر با دوستان می‌خواهی؟
                شاید هم یک سوئیت در کیش برای سفر خانوادگی؟ از بین صدها اقامتگاه
                در جاباما با دیدن تصاویر، خواندن نظرات مهمان‌های قبلی و مقایسه
                قیمت‌ها و امکانات، بهترین را انتخاب کن.{" "}
              </span>{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <button
          type="button"
          className="iran-travel-info__toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          {" "}
          <span> {isOpen ? "بستن" : " مشاهده همه"} </span>{" "}
          <span
            className={`iran-travel-info__arrow ${isOpen ? "iran-travel-info__arrow--open" : ""}`}
          >
            {" "}
            <FaChevronDown />{" "}
          </span>{" "}
        </button>{" "}
        {}{" "}
        <div className="iran-travel-info__links-section">
          {" "}
          <h3>از شمال تا جنوب ایران، جاباما جوره</h3>{" "}
          <div className="iran-travel-info__links">
            {" "}
            {travelLinks.map((link, index) => (
              <a href="#" key={index}>
                {" "}
                {link}{" "}
              </a>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
