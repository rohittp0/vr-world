import React from "react";
import "./card.css";

interface CardInfo {
   img: string;
   alt: string;
   info: string;
   mail?: string;
   name?: string;
   onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card = ({img, alt, info, name, mail, onClick}:CardInfo) =>
{
  return (
    <div className="cont" onClick={onClick}>
        <img src={img} alt={alt}  className="imgCard"/>
        <h6>{name}</h6>
        <h6>{info}</h6>
        <h6>{mail}</h6>
    </div>
  );
};

export default Card;
