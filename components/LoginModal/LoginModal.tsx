"use client";

import { useState } from "react";
import "./LoginModal.css";
import { createPortal } from "react-dom";

interface LoginModalProps {
  phone: string;
  password: string;
  onSuccess: (userId: number) => void;
  onClose?: () => void;
  onBack?: () => void;
}

const LoginModal = ({
  phone,
  password,
  onSuccess,
  onClose,
  onBack,
}: LoginModalProps) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOtpChange = (value: string, index: number) => {
    const number = value.replace(/\D/g, "");

    const newOtp = [...otp];
    newOtp[index] = number.slice(-1);

    setOtp(newOtp);

    if (number && index < 3) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`,
      ) as HTMLInputElement;

      nextInput?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");

    setError("");

    if (code.length !== 4) {
      setError("لطفاً کد چهار رقمی را کامل وارد کنید");
      return;
    }

    setLoading(true);

    try {
      const formData = new URLSearchParams();

      formData.append("code", code);

      const response = await fetch("http://localhost:8000/accounts/verify/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        credentials: "include",
        body: formData.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || data?.error || "کد وارد شده صحیح نیست");
        return;
      }

      const loginResponse = await fetch(
        "http://localhost:8000/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            phone,
            password,
          }),
        },
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setError(loginData?.error || "ورود انجام نشد");
        return;
      }

      onSuccess(loginData.user_id);
    } catch (error) {
      console.error(error);
      setError("ارتباط با سرور برقرار نشد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(
          <div className="login-modal">
            {}
            <div className="modal-header">
              <button type="button" className="modal-close" onClick={onClose}>
                ×
              </button>

              <div className="modal-logo">
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
                    d="M14.1036 22C12.488 22 10.8461 21.7654 9.22332 21.3024C5.04191 20.1093 2.23503 17.7808 1.92879 17.5193L0 15.8685L1.77625 13.5385L3.70399 15.1883C3.80629 15.2756 6.27379 17.3591 9.95837 18.4102C11.3415 18.8047 12.7361 19.0048 14.1036 19.0048C17.5787 19.0048 20.8413 17.7208 23.8005 15.1883L25.7283 13.5385L27.5045 15.8685L25.5767 17.5183C22.1018 20.4922 18.2418 22 14.1036 22Z"
                    fill="#FFA41B"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>

              <button
                type="button"
                className="modal-back"
                onClick={onBack}
                style={{ color: "white" }}
              >
                ←
              </button>
            </div>

            {}
            <div className="modal-content">
              <h2>تایید شماره موبایل</h2>

              <p className="description">
                کد تایید ۴ رقمی به صورت پیامک و همچنین در اپلیکیشن
                <br />
                جاباما ارسال شد.
              </p>

              {}
              <div className="phone-box">
                <span className="phone-number">{phone}</span>

                <span className="phone-divider"></span>

                <button type="button" className="edit-phone" onClick={onBack}>
                  ویرایش شماره
                </button>
              </div>

              {}
              <div className="otp-container">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    className="otp-input"
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                  />
                ))}

                {}
                <div className="otp-timer">
                  <span className="timer-icon">↻</span>

                  <span>۰۴:۵۷</span>
                </div>
              </div>

              {}
              <button type="button" className="voice-button">
                ارسال کد از طریق تماس صوتی
              </button>

              {}
              {error && <p className="paragraph-danger">{error}</p>}

              {}
              <button
                className="verify-button"
                disabled={otp.join("").length !== 4 || loading}
                onClick={handleVerify}
              >
                {loading ? "در حال بررسی..." : "تایید"}
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default LoginModal;
