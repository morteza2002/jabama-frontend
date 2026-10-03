"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCalendarCheck,
  faCalendarXmark,
  faHouse,
  faLocationDot,
  faUser,
  faUsers,
  faCreditCard,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";

import { useBooking } from "@/Context/BookingContext";
import { useAuth } from "@/Context/AuthContext";
import "./StepThree.css";
import { redirect } from "next/navigation";

interface Reservation {
  user: number;
  residence: number;
  check_in: string;
  check_out: string;
  total_price: number;
}

const StepThree = () => {
  const { booking, setCurrentStep } = useBooking();
  const { userId } = useAuth();

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchReservation = async () => {
      if (!userId || !booking.residenceId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/accounts/reservations-per-user/${userId}/`,
        );

        if (!response.ok) {
          throw new Error("دریافت اطلاعات رزرو انجام نشد");
        }

        const data = await response.json();

        console.log("FULL RESPONSE:", data);

        let reservations: Reservation[] = [];

        if (Array.isArray(data)) {
          reservations = data;
        } else if (Array.isArray(data.results)) {
          reservations = data.results;
        } else if (Array.isArray(data.reservations)) {
          reservations = data.reservations;
        }

        console.log("RESERVATIONS ARRAY:", reservations);

        const foundReservation = reservations
          .filter(
            (item) => Number(item.residence) === Number(booking.residenceId),
          )
          .sort(
            (a, b) =>
              new Date(b.check_in).getTime() - new Date(a.check_in).getTime(),
          )[0];

        console.log("FOUND RESERVATION:", foundReservation);

        setReservation(foundReservation || null);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات رزرو:", error);
        setReservation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [userId, booking.residenceId]);
  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getNumberOfNights = () => {
    if (!reservation) return 0;

    const checkIn = new Date(reservation.check_in);
    const checkOut = new Date(reservation.check_out);

    return Math.round(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  if (loading) {
    return (
      <div className="step-three-loading">
        <div className="step-three-spinner"></div>
        <p>در حال دریافت اطلاعات رزرو...</p>
      </div>
    );
  }

  return (
    <div className="step-three">
      {/* موفقیت */}
      <section className="reservation-success">
        <div className="success-icon">
          <FontAwesomeIcon icon={faCheck} />
        </div>

        <h1>پرداخت با موفقیت انجام شد</h1>

        <p>رزرو شما با موفقیت ثبت شد و اقامتگاه برای شما رزرو گردید.</p>

        {reservation && (
          <div className="reservation-code">
            <span>وضعیت رزرو</span>
            <strong>تأیید شده</strong>
          </div>
        )}
      </section>

      <div className="step-three-content">
        {/* اطلاعات اقامتگاه */}
        <section className="reservation-card residence-summary">
          <div className="card-title">
            <FontAwesomeIcon icon={faHouse} />
            <h2>اطلاعات اقامتگاه</h2>
          </div>

          <div className="residence-info">
            {/* {booking.images && (
              <img
                src={booking.image}
                alt={booking.residenceName || "اقامتگاه"}
              />
            )} */}

            <div>
              <h3>{booking.residenceName || "اقامتگاه انتخاب‌شده"}</h3>

              <p>
                <FontAwesomeIcon icon={faLocationDot} />
                اقامتگاه رزرو شده توسط شما
              </p>
            </div>
          </div>
        </section>

        {/* اطلاعات رزرو */}
        <section className="reservation-card">
          <div className="card-title">
            <FontAwesomeIcon icon={faReceipt} />
            <h2>جزئیات رزرو</h2>
          </div>

          {reservation ? (
            <div className="reservation-details">
              <div className="detail-item">
                <span>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  تاریخ ورود
                </span>

                <strong>{formatDate(reservation.check_in)}</strong>
              </div>

              <div className="detail-item">
                <span>
                  <FontAwesomeIcon icon={faCalendarXmark} />
                  تاریخ خروج
                </span>

                <strong>{formatDate(reservation.check_out)}</strong>
              </div>

              <div className="detail-item">
                <span>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  تعداد شب
                </span>

                <strong>{getNumberOfNights()} شب</strong>
              </div>

              <div className="detail-item">
                <span>
                  <FontAwesomeIcon icon={faUsers} />
                  تعداد مهمان
                </span>

                <strong>{booking.guests} نفر</strong>
              </div>
            </div>
          ) : (
            <p className="no-reservation">اطلاعات رزرو پیدا نشد.</p>
          )}
        </section>

        {/* اطلاعات مهمان */}
        <section className="reservation-card">
          <div className="card-title">
            <FontAwesomeIcon icon={faUser} />
            <h2>اطلاعات مهمان</h2>
          </div>

          <div className="guest-info">
            <div>
              <span>نام و نام خانوادگی</span>
              <strong>
                {booking.firstName || "-"} {booking.lastName || ""}
              </strong>
            </div>

            <div>
              <span>شناسه کاربر</span>
              <strong>{userId}</strong>
            </div>
          </div>
        </section>

        {/* مبلغ */}
        {reservation && (
          <section className="reservation-card payment-summary">
            <div className="card-title">
              <FontAwesomeIcon icon={faCreditCard} />
              <h2>خلاصه پرداخت</h2>
            </div>

            <div className="price-row">
              <span>مبلغ پرداخت‌شده</span>

              <strong>{formatPrice(reservation.total_price)} تومان</strong>
            </div>

            <div className="payment-success">
              <FontAwesomeIcon icon={faCheck} />
              پرداخت با موفقیت ثبت شده است
            </div>
          </section>
        )}
      </div>

      {/* دکمه‌ها */}
      <div className="step-three-actions">
        <button className="back-to-step-one" onClick={() => setCurrentStep(1)}>
          بازگشت به اطلاعات رزرو
        </button>

        <button
          className="finish-reservation"
          onClick={() => {
            redirect("/");
          }}
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
};

export default StepThree;
