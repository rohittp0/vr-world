import React, { Component } from 'react'
import "./contactUs.css"

export default class ContactUs extends Component {
    render() {
        return (
            <div className="container">
                <div className="contact">
                    <div className="row">
                        <div className="col-lg-5">
                            <h1 className='con-h1' style={{ fontWeight: '700', fontSize: '62px' }}>Contact Us</h1>
                        </div>
                        <div className="col-lg-7">

                            <hr style={{ marginTop: "4rem" }} />
                        </div>
                    </div>
                    <p style={{ color: 'grey' }}>If you would like to learn more about our lab, please drop us an email. We would love to hear from you.</p>
                    <div className="address mt-3">
                        <h2>Address</h2>
                        <div style={{ color: "red", backgroundColor: "red", height: "4px", width: "40%" }}></div>
                        <p className='mt-4' style={{ color: 'grey' }}>XR Lab Cusat, Student Amenity Centre <br />
                            Cochin University of Science and Technology <br />
                            Kalamassery, Ernakulam, Kerala 682022</p>
                    </div>
                    <div className="email mt-3">
                        <h2>Email</h2>
                        <div style={{ color: "red", backgroundColor: "red", height: "4px", width: "40%" }}></div>
                        <p className='mt-4' style={{ color: 'grey' }}>xrc@cusat.ac.in </p>
                    </div>
                    <div className="email mt-3">
                        <h2>Phone</h2>
                        <div style={{ color: "red", backgroundColor: "red", height: "4px", width: "40%" }}></div>
                        <p className='mt-4' style={{ color: 'grey' }}>0484 123456 </p>
                    </div>
                </div>
            </div>
        )
    }
}
