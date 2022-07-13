import React, { Component } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header/Header";


function ContactUs() {
    return (
        <>
            <Header />
            <div className="main">
                <div className="head">
                    <h2 style={{width:"12rem"}}>Contact Us</h2>
                    <span className="divider"></span>
                </div>

                <p style={{ color: "grey" }}>If you would like to learn more about our lab, please drop us an email. We would love to hear from you.</p>
                <div className="address mt-4">
                    <h3>Address</h3>
                    <div style={{ color: "red", backgroundColor: "red", height: "4px", width: "40%" }}></div>
                    <p className='mt-4' style={{ color: "grey" }}>XR Lab Cusat, Student Amenity Centre <br />
                        Cochin University of Science and Technology <br />
                        Kalamassery, Ernakulam, Kerala 682022</p>
                </div>
                <div className="email mt-4">
                    <h3>Email</h3>
                    <div style={{ color: "red", backgroundColor: "red", height: "4px", width: "40%" }}></div>
                    <p className='mt-4' style={{ color: "grey" }}>xrc@cusat.ac.in </p>
                </div>
                <div className="email mt-4 mb-5">
                    <h3>Phone</h3>
                    <div style={{ color: "red", backgroundColor: "red", height: "4px", width: "40%" }}></div>
                    <p className='mt-4' style={{ color: "grey" }}>0484 123456 </p>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default ContactUs;

