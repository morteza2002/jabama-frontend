// برای اینکه کد otp بگیریم باید حالت رجیستر بدیم
// که ببینم در اینده باید امکان مورد نیاز به بک اند اضافه کنیم

"use client";

import "./ModalPopUp.css";
import LoginModal from "../LoginModal/LoginModal";
import { useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useAuth } from "@/Context/AuthContext";

const ModalPopUp = () => {
  // وضعیت لاگین از AuthContext
  const { isLoggedIn, login, phone: loggedInPhone, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // برای وریفای باید پسورد و ریپسورد بدیم
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // برا رفتن به مدال احراز با otp
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (phone.length !== 11) {
      setError("شماره موبایل درست زده نشده!");
      return;
    }

    if (!password || !password2) {
      setError("رمز صحیح نمی باشد");
      return;
    }

    if (password !== password2) {
      setError("رمز مطابقت ندارد");
      return;
    }

    setLoading(true);

    try {
      console.log("SENDING:", {
        phone,
        password,
        password2,
      });

      const response = await fetch("http://localhost:8000/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          phone,
          password,
          password2,
        }),
      });

      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("REGISTER:", JSON.stringify(data, null, 2));

      if (!response.ok) {
        setError(
          data?.phone?.[0] ||
            data?.password?.[0] ||
            data?.password2?.[0] ||
            "ثبت نام به درستی انجام نشد",
        );

        return;
      }

      console.log("ثبت نام موفق شد");

      // بستن مودال ثبت نام
      setIsOpen(false);

      // باز کردن مودال OTP
      setShowLoginModal(true);
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      setError("ارتباط با بک اند برقرار نشد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="user-profile">
          <div
            className="user-profile-header"
            onClick={() => setIsProfileOpen((prev) => !prev)}
          >
            <span className="user-phone">{loggedInPhone}</span>

            <span className={`profile-arrow ${isProfileOpen ? "open" : ""}`}>
              ▼
            </span>
          </div>

          {isProfileOpen && (
            <div className="profile-dropdown">
              <button
                className="logout-button"
                style={{color:"black"}}
                onClick={() => {
                  logout();
                  setIsProfileOpen(false);
                }}
              >
                خروج از حساب کاربری
              </button>
            </div>
          )}
        </div>
      ) : (
        <span className="btn-login" onClick={() => setIsOpen(true)}>
          ورود یا ثبت نام
        </span>
      )}

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="modal"
            className="modal"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <div className="modal-box">
              {}

              <span className="icon-modal">
                <svg
                  fill="transparent"
                  height="32"
                  viewBox="0 0 28 22"
                  width="40"
                  data-testid="jabama-icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect fill="transparent" height="22" width="27.5045"></rect>

                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M21.2866 4.03607V0H23.4083V4.03607H27.5045V6.11777H23.4083V10.1538H21.2866V6.11777H17.1903V4.03607H21.2866L..."
                    fill="#131B1F"
                  />

                  <path
                    clipRule="evenodd"
                    d="M14.1036 22C12.488 22 10.8461 21.7654 9.22332 21.3024C5.04191 20.1093 2.23503 17.7808 1.92879 17.5193L0 15.8685L1.77625 13.5385L3.70399 15.1883C3.80629 15.2756 6.27379 17.3591 9.95837 18.4102C11.3415 18.8047 12.7361 19.0048 14.1036 19.0048C17.5787 19.0048 20.8413 17.7208 23.8005 15.1883L25.7283 13.5385L27.5045 15.8685L25.5767 17.5183C22.1018 20.4922 18.2416 22 14.1036 22Z"
                    fill="#FFA41B"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </span>

              {}

              <span
                className="btn-close-modal"
                onClick={() => setIsOpen(false)}
              >
                x
              </span>

              {}

              <p className="paragraph">ورود یا ثبت‌نام در جاباما</p>

              <p className="gray-paragraph">
                برای ورود به جاباما شماره همراه خود را وارد کنید
              </p>

              {}

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-style-number"
                placeholder="09xxxxxxxxx"
                maxLength={11}
              />

              {}

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-style-number"
                placeholder="رمز عبور"
              />

              {}

              <input
                type="password"
                value={password2}
                onChange={(e) => setpassword2(e.target.value)}
                className="input-style-number"
                placeholder="تکرار رمز عبور"
              />

              {}

              {error && <p className="paragraph-danger">{error}</p>}

              {}

              <p className="gray-paragraph">
                ورود و ثبت‌نام در جاباما به منزله‌ پذیرفتن
                <a href=""> قوانین و مقررات و قوانین حریم خصوصی</a> می‌باشد.
              </p>

              {}

              <span>
                <Link
                  className={`btn-gray ${
                    phone?.length !== 11 || !password || !password2 || loading
                      ? "disabled"
                      : ""
                  }`}
                  onClick={() => {
                    if (
                      phone?.length === 11 &&
                      password &&
                      password2 &&
                      !loading
                    ) {
                      handleRegister();
                    }
                  }}
                  href="#"
                >
                  {loading ? "در حال ارسال..." : "ادامه"}
                </Link>
              </span>
            </div>
          </div>,
          document.body,
        )}

      {showLoginModal && (
        <LoginModal
          phone={phone}
          password={password}
          onBack={() => {
            setShowLoginModal(false);
            setIsOpen(true);
          }}
          onClose={() => {
            setShowLoginModal(false);
          }}
          onSuccess={(userId) => {
            setShowLoginModal(false);
            setIsOpen(false);
            login(phone, userId);
          }}
        />
      )}
    </>
  );
};

export default ModalPopUp;
