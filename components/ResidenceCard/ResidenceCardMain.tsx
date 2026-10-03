import "./ResidenceCardMain.css";
import type {
  //   Residence,
  ResidenceCardProps,
} from "../../Types/FilterCategoryMainPageWithDetails.types";

// import { RESIDENCE_IMAGES } from "../../data/residenceImages";
import ResidenceImgSlider from "./ResidenceImgSlider/ResidenceImgSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
const ResidenceCard = ({ residence, images }: ResidenceCardProps) => {
  // const image = RESIDENCE_IMAGES[residence.id % RESIDENCE_IMAGES.length];

  return (
    <Link href={`/Allresidences/${residence.id}`} className="residence-card">
      {" "}
      <div className="residence-card">
        <div className="residence-card-image">
          <div className="wrapper-item-residence">
            <div className="residence-card-loan">
              {" "}
              <span>هر قسط~ 700٬000 تومان</span>
            </div>
            <div className="like-svg">
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
          <ResidenceImgSlider images={images} name={residence.name} />
        </div>

        <div className="residence-card-content">
          <span>⭐ {residence.average_ratings}</span>
          <h2 className="residence-card-title">{residence.name}</h2>

          <p className="residence-card-description">{residence.description}</p>

          <div className="residence-card-info">
            <span>{residence.number_rooms} اتاق</span>

            <span>ظرفیت {residence.capacity} نفر</span>
            
          </div>

          <div className="residence-card-price">
            شروع از: {residence.price.toLocaleString("fa-IR")} تومان /{" "}
            <span className="text-gray-300">هر شب</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResidenceCard;
