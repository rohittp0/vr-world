import {Label} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Header from "../../components/Header/Header";
import React from "react";
import Footer from "../../components/footer/Footer";

export default function Login() {
    return (
        <>
            <Header/>
            <div>
                <div className='pf1'>
                    <h1>Welcome to XR Lab CUSAT</h1>

                    <form className='pf3'>
                        <div className="mb-3">
                            <Label>Login to contine</Label>
                            <input type="email" placeholder="Login with your CUSAT email ID"/>
                            <p className="text-muted">
                                We&apos;ll never share your email with anyone else.
                            </p>
                        </div>

                        <div className="mb-3">
                            <Label>Password</Label>
                            <input type="password" placeholder="Password"/>
                        </div>
                        <div className="mb-3">
                            <input type="checkbox" value="Check me out"/>
                        </div>
                        <Button type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}
