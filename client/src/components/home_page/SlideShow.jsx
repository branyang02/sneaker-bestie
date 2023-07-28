import React from "react";
import { Slide } from "react-slideshow-image";
import "@/assets/styles/SlideShow.css";
import "react-slideshow-image/dist/styles.css";

const SlideShow = () => {
  const images = [
    "https://images.stockx.com/360/Nike-SB-Dunk-Low-Grateful-Dead-Bears-Orange/Images/Nike-SB-Dunk-Low-Grateful-Dead-Bears-Orange/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=2&updated_at=1635280835&h=384&q=60",
    "https://images.stockx.com/360/Air-Jordan-1-Retro-Low-Dior/Images/Air-Jordan-1-Retro-Low-Dior/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=2&updated_at=1635188834&h=384&q=60",
    "https://images.stockx.com/360/Nike-Dunk-Low-Cacao-Wow-Womens/Images/Nike-Dunk-Low-Cacao-Wow-Womens/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=2&updated_at=1686774325&h=384&q=60",
    "https://images.stockx.com/360/Nike-Dunk-Low-Medium-Curry/Images/Nike-Dunk-Low-Medium-Curry/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=2&updated_at=1635342084&h=384&q=60",
    "https://images.stockx.com/360/Air-Jordan-1-Retro-High-OG-Washed-Black/Images/Air-Jordan-1-Retro-High-OG-Washed-Black/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=2&updated_at=1686248226&h=384&q=60",
    "https://images.stockx.com/360/Air-Jordan-1-High-OG-Spider-Man-Across-the-Spider-Verse/Images/Air-Jordan-1-High-OG-Spider-Man-Across-the-Spider-Verse/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=2&updated_at=1683569460&h=384&q=60",
    "https://images.stockx.com/360/Nike-Dunk-Low-Retro-White-Black-2021/Images/Nike-Dunk-Low-Retro-White-Black-2021/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=2&updated_at=1644250003&h=384&q=60",
    "https://images.stockx.com/360/Nike-Dunk-Low-Light-Orewood-Brown-Sashiko/Images/Nike-Dunk-Low-Light-Orewood-Brown-Sashiko/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=2&updated_at=1676380685&h=384&q=60",
    "https://images.stockx.com/360/Air-Jordan-1-High-OG-UNC-Toe/Images/Air-Jordan-1-High-OG-UNC-Toe/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=2&updated_at=1688674754&h=384&q=60",
  ];

  return (
    <Slide
      autoplay={true}
      infinite={true}
      slidesToShow={4}
      duration={0}
      transitionDuration={1000}
      pauseOnHover={true}
    >
      {images.map((image, index) => (
        <div key={index} className="each-slide-effect">
          <div style={{ backgroundImage: `url(${image})` }}></div>
        </div>
      ))}
    </Slide>
  );
};

export default SlideShow;
