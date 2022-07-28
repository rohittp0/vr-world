import React, {useEffect, useState} from "react";
import "./header.css";
import {Link} from "react-router-dom";
import Logo from "./assets/logo.png";
import Sidebar from "../sidebar/Sidebar";

const Header = ({hidePath}: { hidePath?: boolean }) =>
{
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() =>
    {
        function handleWindowResize()
        {
            setWindowSize(getWindowSize());
        }

        window.addEventListener("resize", handleWindowResize);

        return () =>
        {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    function getWindowSize()
    {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    return (
        <div>
            {(windowSize.innerWidth < 767) &&
                <div className="align-content-end">
                    <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"}/>
                </div>
            }
            <div className="nav">
                <div id="3root" style={{zIndex: 90, overflow: "hidden"}}/>
                {(windowSize.innerWidth >= 767) &&
                    <div className="nav-items">
                        <img
                            className="logo"
                            src={Logo}
                            height={100}
                            width={100}
                            alt="logo"
                        />
                        <i className="fa fa-bars burger"/>
                        <Link to="/">
                            <span className="navcont">home</span>
                        </Link>
                        <Link to="/about">
                            <span className="navcont">About</span>
                        </Link>
                        {/* <Link to="/events">
            <span className="navcont">Events</span>
          </Link> */}
                        <Link to="/members">
                            <span className="navcont">members</span>
                        </Link>
                        <Link to="/contact">
                            <span className="navcont">contact</span>
                        </Link>
                    </div>
                }

                <svg
                    id="wave"
                    style={{transform: "rotate(180deg)", transition: "0.3s", display: hidePath ? "none" : "initial"}}
                    viewBox="0 0 1340 305"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="sw-gradient-0" x1={0} x2={0} y1={1} y2={0}>
                            <stop stopColor="rgba(50, 50, 50, 1)" offset="0%"/>
                            <stop stopColor="rgba(50, 50, 50, 1)" offset="100%"/>
                        </linearGradient>
                    </defs>
                    <path
                        style={{transform: "translate(0, 0px)", opacity: 1}}
                        fill="url(#sw-gradient-0)"
                        d="M0,98L80,114.3C160,131,320,163,480,171.5C640,180,800,163,960,130.7C1120,98,1280,49,1440,65.3C1600,82,1760,163,1920,220.5C2080,278,2240,310,2400,269.5C2560,229,2720,114,2880,65.3C3040,16,3200,33,3360,57.2C3520,82,3680,114,3840,130.7C4000,147,4160,147,4320,147C4480,147,4640,147,4800,163.3C4960,180,5120,212,5280,212.3C5440,212,5600,180,5760,204.2C5920,229,6080,310,6240,334.8C6400,359,6560,327,6720,302.2C6880,278,7040,261,7200,285.8C7360,310,7520,376,7680,408.3C7840,441,8000,441,8160,424.7C8320,408,8480,376,8640,310.3C8800,245,8960,147,9120,89.8C9280,33,9440,16,9600,65.3C9760,114,9920,229,10080,285.8C10240,343,10400,343,10560,318.5C10720,294,10880,245,11040,187.8C11200,131,11360,65,11440,32.7L11520,0L11520,490L11440,490C11360,490,11200,490,11040,490C10880,490,10720,490,10560,490C10400,490,10240,490,10080,490C9920,490,9760,490,9600,490C9440,490,9280,490,9120,490C8960,490,8800,490,8640,490C8480,490,8320,490,8160,490C8000,490,7840,490,7680,490C7520,490,7360,490,7200,490C7040,490,6880,490,6720,490C6560,490,6400,490,6240,490C6080,490,5920,490,5760,490C5600,490,5440,490,5280,490C5120,490,4960,490,4800,490C4640,490,4480,490,4320,490C4160,490,4000,490,3840,490C3680,490,3520,490,3360,490C3200,490,3040,490,2880,490C2720,490,2560,490,2400,490C2240,490,2080,490,1920,490C1760,490,1600,490,1440,490C1280,490,1120,490,960,490C800,490,640,490,480,490C320,490,160,490,80,490L0,490Z"
                    />
                </svg>
            </div>
        </div>
    );
};
export default Header;
