import React from "react";
import "./mentor.css";

interface Mentor {
    position: string;
    name: string;
    type: string;
    branch: string;
    mail: string;
    img: string;
}


const Mentor = ({ position, name, type, mail, img, branch }: Mentor) => 
{
    return (
        <div className="container">
            <h5>{position}</h5>
            <div className="sub-cont">
                <div className="sub-text">
                    <h6>{name}</h6>
                    <h6>{type}</h6>
                    <h6>{branch}</h6>
                    <h6>{mail}</h6>
                </div>
                <img src={img} alt="Professorimage" />
            </div>
        </div>
    );
};

export default Mentor;
