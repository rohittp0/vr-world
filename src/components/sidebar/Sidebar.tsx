import React from "react";
import { elastic as Menu } from "react-burger-menu";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default props => 
{
    return (
        <Menu>
            <Link to="/">
                <a className="menu-item">
                    Home
                </a>
            </Link>
            <Link to="/about">
                <a className="menu-item" href="/about">
                    About
                </a>
            </Link>
            <Link to="/members">
                <a className="menu-item" href="/members">
                    Members
                </a>
            </Link>
            <Link to="/contact">
                <a className="menu-item" href="/contact">
                    Contact
                </a>
            </Link>
                 <Link to="/form">
            <input type="button" className="applybutton" value="Apply Now"/>
             </Link>
        </Menu>
    );
};
