/* eslint-disable @next/next/no-img-element */
import "./Header.css";
import ModalPopUp from "../ModalPop/ModalPopUp";
import MainSearch from "../MainSearch/MainSearch";
import CategoryPlaces from "../CategoryPlaces/CategoryPlaces";
const Header = () => {
  return (
    <section className="Card-header-hero">
      <img
        src="/images/jabama-khooba-desktop.gif"
        alt=""
        className="image-custom-navbar"
      />
      <img src="/images/HeaderBg.png" alt="" className="image-custom-Header" />
      {}
      <div className="content-header">
        <div className="nav-headerBg">
          {" "}
          <img src="/images/jabama-white-logo.svg" alt="" />
          <div className="Button-navbar-headerBg">
            <button>راهکارهای سازمانی</button>
            <button>ثبت‌نام میزبان</button> 
            <ModalPopUp />{" "}
          </div>
        </div>{" "}
        <p className="text-intro-header">
          اجاره ویلا، سوئیت و انواع اقامتگاه در سراسر ایران
        </p>
      </div>
      <div className="bg-wrapper3">
        {" "}
        <MainSearch />
      </div>

      <CategoryPlaces />
    </section>
  );
};

export default Header;
