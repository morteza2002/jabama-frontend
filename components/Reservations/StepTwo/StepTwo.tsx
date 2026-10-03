"use client";

import React from "react";
import { toGregorian } from "jalaali-js";
import { useBooking } from "@/Context/BookingContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { ResidenceDetail } from "@/Types/FilterCategoryMainPageWithDetails.types";
import useCountdown from "@/hooks/useTimerCount";
import "./StepTwo.css";

const StepTwo = () => {
  const API_URL = "http://127.0.0.1:8000";
  const { minutes, seconds } = useCountdown(60 * 60);

  const { setCurrentStep, booking } = useBooking();

  const [residence, setResidence] = useState<ResidenceDetail | null>(null);

  const getNumberOfNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;

    const [startYear, startMonth, startDay] = checkIn
      .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
      .split("/")
      .map(Number);

    const [endYear, endMonth, endDay] = checkOut
      .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
      .split("/")
      .map(Number);

    const startGregorian = toGregorian(startYear, startMonth, startDay);

    const endGregorian = toGregorian(endYear, endMonth, endDay);

    const start = new Date(
      startGregorian.gy,
      startGregorian.gm - 1,
      startGregorian.gd,
    );

    const end = new Date(endGregorian.gy, endGregorian.gm - 1, endGregorian.gd);

    return Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
  };

  useEffect(() => {
    const fetchResidence = async () => {
      if (!booking.residenceId) return;

      try {
        const response = await axios.get<ResidenceDetail>(
          `${API_URL}/residence-detail/${booking.residenceId}/`,
        );

        setResidence(response.data);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات اقامتگاه:", error);
      }
    };

    fetchResidence();
  }, [booking.residenceId]);

  const numberOfNights = getNumberOfNights(booking.checkIn, booking.checkOut);

  const pricePerNight = Number(booking.price || 0);

  const totalPrice = pricePerNight * numberOfNights;

  return (
    <div className="payment-page">
      <div className="payment-container">
        <main className="payment-main">
          {/* اطلاعات اقامتگاه */}
          <section className="booking-summary">
            <div className="booking-header">
              <div className="booking-title">
                <h2>{booking.residenceName}</h2>

                <div className="booking-rating">
                  ★ {residence?.average_ratings ?? "-"}{" "}
                  <span>({residence?.comments?.length ?? 0} دیدگاه)</span>
                  
                </div>
                    <span
              style={{
                color: "blue",
                display: "flex",
                gap: "5px",
              }}
            >
              <img
                src="https://cdn.jabama.com/image/jabama-images/0/522c99cd-c785-49c5-8ffd-e59e1e9439e0.png"
                width="20px"
                alt=""
              />
              قیمت منصفانه
            </span>
              </div>{" "}
              <img
                src="https://cdn.jabama.com/image/jabama-images/880777/7096b5a1-c7e0-4dc6-8cd4-d35455485213.jpg"
                alt={booking.residenceName}
                className="booking-image"
              />
            </div>

            {/* تاریخ */}
            <div className="booking-row">
              <div>
                <span className="row-label">تاریخ سفر</span>

                <strong>
                  {booking.checkIn} - {booking.checkOut} ({numberOfNights} شب)
                </strong>
              </div>

              <button className="edit-button" onClick={() => setCurrentStep(1)}>
                ویرایش
              </button>
            </div>

            {/* مسافران */}
            <div className="booking-row">
              <div>
                <span className="row-label">تعداد مسافران</span>

                <strong>{booking.guests} نفر</strong>
              </div>

              <button className="edit-button" onClick={() => setCurrentStep(1)}>
                ویرایش
              </button>
            </div>

            <div className="booking-actions">
              <button>جزئیات اقامتگاه ⓘ</button>

              <button>چت با میزبان ♧</button>
            </div>
          </section>

          {/* روش پرداخت */}
          <section className="payment-section">
            <h2>روش پرداخت</h2>

            <div className="discount-banner">
              <div>
                <strong>DEJBMS</strong>

                <span>تا سقف ۲۵۰,۰۰۰ تومان</span>
              </div>

              <div className="discount-percent">
                <strong>۱۵٪</strong>

                <span>تخفیف</span>
              </div>
            </div>

            <div className="payment-method">
              <div className="payment-radio selected">
                <span></span>
              </div>

              <div className="payment-info">
                <div className="payment-title">
                  <strong>دیجی‌پی</strong>

                  <b>جدید</b>
                </div>

                <span>تا ۴ قسطه</span>
              </div>

              <div className="payment-icon">$</div>
            </div>

            <div className="payment-method">
              <div className="payment-radio">
                <span></span>
              </div>

              <div className="payment-info">
                <strong>پرداخت آنلاین</strong>

                <span>درگاه بانکی</span>
              </div>

              <div className="payment-icon">▣</div>
            </div>

            <div className="discount-code">
              <div>
                <strong>کد تخفیف دارید؟</strong>

                <span>کد تخفیف</span>
              </div>

              <button>ثبت کد ＋</button>
            </div>

            <div className="reserve-message">
              این اقامتگاه در تاریخ انتخابی به صورت موقت برای شما رزرو شده و با
              پرداخت توسط شما نهایی خواهد شد.
            </div>

            <button className="cancel-button" onClick={() => setCurrentStep(1)}>
              لغو رزرو ⊘
            </button>
          </section>
        </main>

        {/* کارت قیمت */}
        <aside className="price-card">
          <div className="price-row">
            <span>
              {numberOfNights} شب × {pricePerNight.toLocaleString("fa-IR")}{" "}
              تومان
            </span>

            <strong>{totalPrice.toLocaleString("fa-IR")} تومان</strong>
          </div>

          {/* فعلاً کارمزد ثابت */}
          <div className="price-row service-row">
            <span>کارمزد خدمات پلتفرم</span>

            <strong>۰ تومان</strong>
          </div>

          <div className="total-row">
            <span>قابل پرداخت نهایی</span>

            <strong>{totalPrice.toLocaleString("fa-IR")} تومان</strong>
          </div>

          <div className="countdown">
            <span>مهلت نهایی‌سازی رزرو و پرداخت</span>

            <strong style={{color:"black"}}>
                 {minutes}m {seconds}s
            </strong>
          </div>

          <div className="reward-box">
            🎁
            <span>پس از اقامت، اعتبار سفر پاداش خواهید گرفت!</span>
          </div>

          <button className="pay-button" onClick={() => setCurrentStep(3)}>
            پرداخت
          </button>
        </aside>
      </div>

      <div className="support-section">
        <div className="support-icon">♢</div>

        <p>
          در صورت وجود مشکل یا مغایرت، اقامتگاه جایگزین شده و یا تمام وجه عودت
          داده خواهد شد.
        </p>

        <strong>نیاز به پشتیبانی دارید؟ ♧</strong>
      </div>
    </div>
  );
};

export default StepTwo;
