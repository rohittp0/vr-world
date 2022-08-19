import {Label} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Header from "../../components/Header/Header";
import React from "react";
import Footer from "../../components/footer/Footer";
import "./index.css";

export default function Login() 
{
    return (
        <>
            <Header/>
            <div>
                <div className='formcont'>

                    <form>
                        <div>
                            <h1 className={"welcome"}>Welcome to XR Lab CUSAT</h1>
                            <div className={"container"}>
                            <h4 >Login to continue</h4>
                                <div className="divider"></div>
                                <p className="sub">
                                Login with your CUSAT email ID
                            </p>

                        </div>

                        <div className="subcont">
                            <label>Email<sup>*</sup></label>
                            <div className="sub-divider"></div>
                            <input type="email" placeholder="abc@ug.cusat.ac.in"/>
                        </div>
                            <div className="subcont">
                            <label >Password</label>
                                <div className="sub-divider"></div>

                                <input type="password" placeholder="Password"/>
                            </div>


                            </div>
                        <div classname="button"></div>
                        <input type="button" class="button" value="Log in"/>

                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}
