interface SwiperTitleProps {
  title: string;
  description: string;
}

const SwiperTitle = ({ title, description }: SwiperTitleProps) => {
  return (
   
    <div className="header">
   <div className="title">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    </div>
  );
};

export default SwiperTitle;

