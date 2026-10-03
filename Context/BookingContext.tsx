"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface BookingData {
  residenceId: number | null;
  residenceName: string;
  residenceImage: string;

  checkIn: string;
  checkOut: string;

  guests: number;

  currentStep: number;
  price: number;
  firstName: string;
  lastName: string;
}

interface BookingContextType {
  booking: BookingData;

  setResidence: (id: number, name: string, image: string) => void;

  setDates: (checkIn: string, checkOut: string) => void;

  setGuests: (guests: number) => void;

  setCurrentStep: (step: number) => void;
  setPrice: (price: number) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  clearBooking: () => void;
}

const initialBooking: BookingData = {
  residenceId: null,
  residenceName: "",
  residenceImage: "",

  checkIn: "",
  checkOut: "",
  firstName: "",
  lastName: "",
  guests: 1,

  currentStep: 1,
  price: 0,
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingData>(initialBooking);

  const setResidence = (id: number, name: string, image: string) => {
    setBooking((prev) => ({
      ...prev,
      residenceId: id,
      residenceName: name,
      residenceImage: image,
    }));
  };

  const setDates = (checkIn: string, checkOut: string) => {
    setBooking((prev) => ({
      ...prev,
      checkIn,
      checkOut,
    }));
  };

  const setGuests = (guests: number) => {
    setBooking((prev) => ({
      ...prev,
      guests,
    }));
  };

  const setCurrentStep = (step: number) => {
    setBooking((prev) => ({
      ...prev,
      currentStep: step,
    }));
  };

  const setPrice = (price: number) => {
    setBooking((prev) => ({
      ...prev,
      price,
    }));
  };

  const setFirstName = (firstName: string) => {
    setBooking((prev) => ({
      ...prev,
      firstName,
    }));
  };

  const setLastName = (lastName: string) => {
    setBooking((prev) => ({
      ...prev,
      lastName,
    }));
  };
  const clearBooking = () => {
    setBooking(initialBooking);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setResidence,
        setDates,
        setGuests,
        setCurrentStep,
        setPrice,
        setFirstName,
        setLastName,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking باید داخل BookingProvider استفاده شده است");
  }

  return context;
}
