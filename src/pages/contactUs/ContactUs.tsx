
import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header/Header";
import "../../styles/contact.css";

const ContactUs = () => 
{
  return (
    <>
      <Header />
      <div className="main">
        <div className="head">
          <h1 style={{width:"23rem "}}>Contact Us</h1>
          <span className="divider" style={{ width: "100%" }}></span>
        </div>
        <p className="des">
          If you would like to learn more about our lab, please drop us an
          email. We would love to hear from you.
        </p>
        <div className="head mt-3">
          <h2>Address</h2>
        </div>
        <div className="strip"></div>
        <p className="des mt-4">
          XR Lab Cusat, Student Amenity Centre <br />
          Cochin University of Science and Technology <br />
          Kalamassery, Ernakulam, Kerala 682022
        </p>
        <div className="head mt-3">
          <h2>Email</h2>
        </div>
        <div className="strip"></div>
        <p className="des mt-4">
          xrc@cusat.ac.in{" "}
        </p>
        <div className="head mt-3">
          <h2>Phone</h2>
        </div>
        <div className="strip"></div>
        <p className="des mt-4">
          0484 123456{" "}
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
