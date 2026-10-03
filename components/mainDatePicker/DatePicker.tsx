"use client";

import { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import "./DatePicker.css";

interface DatePickerProps {
  onClose: () => void;
  onChange?: (startDate: string, endDate: string) => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
}

export default function DatePicker({
  onClose,
  onChange,
  initialCheckIn,
  initialCheckOut,
}: DatePickerProps) {

  const initialDates: DateObject[] =
    initialCheckIn && initialCheckOut
      ? [
          new DateObject({
            date: initialCheckIn,
            calendar: persian,
            locale: persian_fa,
          }),
          new DateObject({
            date: initialCheckOut,
            calendar: persian,
            locale: persian_fa,
          }),
        ]
      : [];

  const [dates, setDates] =
    useState<DateObject[]>(initialDates);

  const handleDateChange = (value: DateObject[]) => {
    setDates(value);

    if (value.length === 2) {
      const startDate = value[0].format("YYYY/MM/DD");
      const endDate = value[1].format("YYYY/MM/DD");

      onChange?.(startDate, endDate);
    }
  };

  return (
    <div className="date-picker-overlay">
      <div className="date-picker-modal">

        <div className="date-picker-header">

          <button
            type="button"
            className="date-picker-close"
            onClick={onClose}
            aria-label="بستن"
          >
            ×
          </button>

          <div className="date-picker-info">
            <strong>تاریخ سفر منعطف؟</strong>

            <p>
              با تعیین میزان شلوغی (۲ تا ۳ روز)، علاوه بر دیدن نتایج روزهای
              انتخاب‌شده، گزینه‌های بیشتری با حفظ تعداد شب اقامت برای انتخاب
              خواهی داشت.
            </p>
          </div>

          <div className="date-picker-info-icon">
            i
          </div>

        </div>

        <div className="date-picker-content">

          <div className="date-picker-tabs">

            <button
              type="button"
              className="date-picker-tab active"
            >
              تاریخ دقیق
            </button>

            <button
              type="button"
              className="date-picker-tab"
            >
              تاریخ منعطف
            </button>

          </div>

          <div className="date-picker-range-title">

            {dates.length === 0 && (
              <span>
                تاریخ ورود و خروج را انتخاب کنید
              </span>
            )}

            {dates.length === 1 && (
              <span>
                حالا تاریخ خروج را انتخاب کنید
              </span>
            )}

            {dates.length === 2 && (
              <span>
                {dates[0].format("D MMMM")} تا{" "}
                {dates[1].format("D MMMM")}
              </span>
            )}

          </div>

          <Calendar
            value={dates}
            onChange={handleDateChange}
            calendar={persian}
            locale={persian_fa}
            range
            rangeHover
            numberOfMonths={2}
            showOtherDays
            highlightToday={false}
            className="jabama-calendar"
            weekStartDayIndex={6}
          />

        </div>

      </div>
    </div>
  );
}