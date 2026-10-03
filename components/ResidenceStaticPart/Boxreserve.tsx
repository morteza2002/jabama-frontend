"use client";

import { useState } from "react";
import DatePicker from "@/components/DatePicker/DatePicker";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import type { ResidenceDetail } from "../../Types/FilterCategoryMainPageWithDetails.types";
import { useBooking } from "@/Context/BookingContext";
import { useRouter } from "next/navigation";

const Boxreserve = ({ residence }: { residence: ResidenceDetail }) => {
  const router = useRouter();

  const {
    setResidence: setBookingResidence,
    setDates: setBookingDates,
    setGuests: setBookingGuests,
  } = useBooking();

  const [guests, setGuests] = useState(0);

  const searchDates = useSelector((state: RootState) => state.search);

  const [checkIn, setCheckIn] = useState(searchDates.checkIn);
  const [checkOut, setCheckOut] = useState(searchDates.checkOut);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  return (
    <div className="section-two">
      <div className="booking-header">
        <div className="price">
          شروع از:
          <strong>
            {residence.price.toLocaleString("fa-IR")} تومان
          </strong>
          / شب
        </div>

        <div className="rating">
          <span>({residence.comments.length})</span>
          <strong>{residence.average_ratings}</strong>
          <span>★</span>
        </div>
      </div>

      <div className="date-box">
        <div
          className="date-item"
          onClick={() => setIsDatePickerOpen(true)}
        >
          <span>{checkIn || "تاریخ ورود"}</span>
          <span>📅</span>
        </div>

        <div
          className="date-item"
          onClick={() => setIsDatePickerOpen(true)}
        >
          <span>{checkOut || "تاریخ خروج"}</span>
          <span>📅</span>
        </div>
      </div>

      <div className="guests-box">
        <div className="guest-title">
          <div>
            <strong>
              تعداد مسافران / حد مجاز مسافر {residence.capacity}
            </strong>

            <p>{guests} نفر</p>
          </div>

          <div className="guest-counter">
            <button
              onClick={() =>
                setGuests((prev) => Math.max(1, prev - 1))
              }
            >
              −
            </button>

            <span>{guests}</span>

            <button
              onClick={() =>
                setGuests((prev) =>
                  Math.min(residence.capacity, prev + 1)
                )
              }
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="booking-actions">
        <button
          className="clear-btn"
          onClick={() => {
            setGuests(1);
            setCheckIn("");
            setCheckOut("");
          }}
        >
          پاک کردن
        </button>

        <button
          className="reserve-btn"
          onClick={() => {
            if (!checkIn || !checkOut) {
              setIsDatePickerOpen(true);
              return;
            }

            setBookingResidence(
              residence.id,
              residence.name,
              ""
            );

            setBookingDates(checkIn, checkOut);

            setBookingGuests(guests);

            router.push("/reservations");
          }}
        >
          انتخاب تاریخ رزرو
        </button>
      </div>

      <p className="booking-message">
        ارسال درخواست رزرو برای شما هزینه‌ای ندارد!
      </p>

      {isDatePickerOpen && (
        <DatePicker
          onClose={() => setIsDatePickerOpen(false)}
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          onChange={(startDate, endDate) => {
            setCheckIn(startDate);
            setCheckOut(endDate);
            setIsDatePickerOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Boxreserve;