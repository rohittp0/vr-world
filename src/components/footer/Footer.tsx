import React from "react";
import "./footer.css";
import logo from "./logo.png";
const Footer = () => 
{


    return (
        <>
            <div className="bx ">
                <div className="footer">
                    <footer className="footbox">
                        <div className="foot">
                            <div className="box">
                                <img src={logo} alt="Cusat Logo" className="img" />
                                <h5 className="title">Cochin University Of Science and Technology</h5>
                                <address>
                                    <h6 className="place">Unviversity Road, South Kalamassery,</h6>
                                    <h6 className="place">Kalamassery,Kochi.Kerala 682022</h6>
                                </address>
                            </div>
                            <div className="box">
                                <address>
                                    <h5 className="title">Sasigopalan</h5>
                                    <h6 className="prof mt-3">Director</h6>
                                    <h6 className="prof">Professor of Head</h6>
                                    <h6 className="prof">Department of meathematics</h6>
                                    <h6 className="prof">Cochin university of Science and Technology</h6>
                                    <br />
                                    <h6 className="place">sgcusat@gmail.com</h6>
                                </address>
                                <span className="line none"></span>
                            </div>
                        </div>
                        <div className="head ">
                            <span className="line"></span>
                            <div className="cpybox center">
                                <span className="copy">copyrights @xrc cusat 2022</span>
                            </div>
                            <span className="line"></span>
                        </div>
                    </footer>
                </div>
            </div>

        </>
    );
};

export default Footer;
