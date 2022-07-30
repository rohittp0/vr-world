import React from "react";
import { elastic as Menu } from "react-burger-menu";
import "./Sidebar.css";

export default props => 
{
    return (
        <Menu>
            <a className="menu-item" href="/">
                Home
            </a>
            <a className="menu-item" href="/">
                About
            </a>
            <a className="menu-item" href="/">
                Members
            </a>
            <a className="menu-item" href="/">
                Contact
            </a>
        </Menu>
    );
};
