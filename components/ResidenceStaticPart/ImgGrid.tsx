import { RESIDENCE_IMAGES } from '@/data/residenceImages'
import React from 'react'

const ImgGrid = () => {
  return (
    <div className="grid-image">
           <div className="img-one">
             <img
               src={`/ResidentPlacesImage/${RESIDENCE_IMAGES[20]}`}
               alt="اقامتگاه"
             />
           </div>
   
           <div className="img-two">
             <img
               src={`/ResidentPlacesImage/${RESIDENCE_IMAGES[17]}`}
               alt="اقامتگاه"
             />
           </div>
   
           <div className="img-three">
             <img
               src={`/ResidentPlacesImage/${RESIDENCE_IMAGES[18]}`}
               alt="اقامتگاه"
             />
           </div>
   
           <div className="img-four">
             <img
               src={`/ResidentPlacesImage/${RESIDENCE_IMAGES[19]}`}
               alt="اقامتگاه"
             />
           </div>
   
           <div className="img-five">
             <img
               src={`/ResidentPlacesImage/${RESIDENCE_IMAGES[21]}`}
               alt="اقامتگاه"
             />
             <button className="seeAllBtn">مشاهده همه ی تصاویر</button>
           </div>
         </div>
  )
}

export default ImgGrid