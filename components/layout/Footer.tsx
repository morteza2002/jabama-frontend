/* eslint-disable @next/next/no-img-element */
"use client";

import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaChevronLeft,
} from "react-icons/fa";
import { SiGoogleplay } from "react-icons/si";

import "./Footer.css";

const bookingLinks = ["راهنمای رزرو اقامتگاه", "شیوه‌های پرداخت", "لغو رزرو"];

const customerLinks = [
  "پشتیبانی هوشمند",
  "پرسش‌های متداول میزبان",
  "چطور اقامتگاه ثبت کنم؟",
  "حریم شخصی کاربران",
];

const jabamLinks = [
  "ثبت‌نام میزبان",
  "همکاری با سازمان‌ها",
  "مجله جاباما",
  "درباره جاباما",
  "قوانین جاباما",
  "تماس با ما",
  "فرصت‌های شغلی",
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-column">
            <h3>نحوه رزرو اقامتگاه</h3>

            {bookingLinks.map((item) => (
              <a href="#" key={item}>
                {item}
              </a>
            ))}
          </div>

          <div className="footer-column">
            <h3>خدمات مشتریان</h3>

            {customerLinks.map((item) => (
              <a href="#" key={item}>
                {item}
              </a>
            ))}
          </div>

          <div className="footer-column">
            <h3>با جاباما</h3>

            {jabamLinks.map((item) => (
              <a href="#" key={item}>
                {item}
              </a>
            ))}
          </div>

          <div className="footer-social">
            <div className="footer-logo">
              <img  src="/images/jabama-logo.svg" alt="" />
            </div>

            <p>جاباما را در شبکه‌های اجتماعی دنبال کنید:</p>

            <div className="social-icons">
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-container">
          <div className="app-download">
            <div className="app-download-title">
              <div className="app-logo">
                <img src="/images/FooterImage/jabama-logoFooter.png" alt="" />
              </div>

              <strong>دانلود اپلیکیشن جاباما</strong>
            </div>

            <div className="app-stores">
                <button className="download-arrow">
                <FaChevronLeft />
              </button>
              
              <a href="#" className="store-button">
                <span className="store-icon bazar-icon">●</span>

                <span>
                  <small>دریافت از</small>
                  بازار
                </span>
              </a>

              <a href="#" className="store-button">
                <span className="store-icon google-icon">
                  <SiGoogleplay />
                </span>

                <span>
                  <small>دریافت از</small>
                  Google Play
                </span>
              </a>

              <a href="#" className="store-button">
                <span className="store-icon">▣</span>

                <span>
                  <small>دریافت از</small>
                  مایکت
                </span>
              </a>

              <a href="#" className="store-button">
                <span className="store-icon">●</span>

                <span>
                  دریافت از
                  <br />
                  سیب‌اپ
                </span>
              </a>

              <a href="#" className="store-button">
                <span className="store-icon">●</span>

                <span>
                  دریافت از
                  <br />
                  سیبچه
                </span>
              </a>

            
            </div>
          </div>
        </div>
      </div>

      <div className="footer-contact">
        <div className="footer-container contact-container">
          <p>در تمامی سفرهای شما، ۲۴ ساعته در کنار شما هستیم.</p>

          <div className="contact-info">
            <span>
              تلفن پشتیبانی:
              <strong>۰۲۱-۹۰۰۰۹۹۹۰</strong>
            </span>

            <span>
              ایمیل:
              <a href="mailto:support@jabama.ir">support@jabama.ir</a>
            </span>

            <span>
              کدپستی:
              <a href="#">۱۹۹۸۷۳۹۶۹۱</a>
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-container">
          <div className="copyright">
<p>design by morteza2002</p>
            
          </div>{" "}
          <div className="certificates">
            <div className="certificate">
              <img src="/images/FooterImage/samandehi-logo.png" alt="" />
            </div>

            <div className="certificate">
              <img src="/images/FooterImage/logo.png" alt="" />
            </div>

            <div className="certificate">
              <img
                src="/images/FooterImage/460dfc51-6f6c-43b2-8056-a8884b23513b.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
