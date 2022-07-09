import React from "react";
import "./card.css";

interface CardInfo {
   img: string;
   alt: string;
   info: string;
}

const Card = ({img, alt, info}:CardInfo) => 
{
  return (
    <div className="cont">
        <img src={img} alt={alt}  className="imgCard"/>
        <h6>{info}</h6>
    </div>
  );
};

export default Card;
