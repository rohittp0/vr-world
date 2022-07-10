import React from "react";
import "./card.css";

interface CardInfo {
   img: string;
   alt: string;
   info: string;
   mail?: string;
   name?: string;
}

const Card = ({img, alt, info, name, mail}:CardInfo) => 
{
  return (
    <div className="cont">
        <img src={img} alt={alt}  className="imgCard"/>
        <h6>{name}</h6>
        <h6>{info}</h6>
        <h6>{mail}</h6>
    </div>
  );
};

export default Card;
