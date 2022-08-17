import Footer from "../../components/footer/Footer";
import Button from "@mui/material/Button";
import "../../styles/home.css";
import Header from "../../components/Header/Header";
import TwitterContainer from "../tweets";
import Game from "../../utils/game";
import React, {useEffect, useState} from "react";
import {Blogs, EventObject, Events} from "../../api/model";

export default function Home()
{
    const [events, setEvents] = useState<EventObject[]>([]);
    const [blogs, setBlogs] = useState<EventObject[]>([]);

    const root3 = document.getElementById("3root");

    useEffect(() =>
{
        new Game();
        if (root3)

            if (root3.children.length > 1)
                root3.removeChild(root3.children[0]);

        return () =>
{
            if (root3)
                root3.innerHTML = "";
        };
    }, [root3]);

    useEffect(() =>
{
        Events.filter({}).then(({results}) => setEvents(results));
        Blogs.filter({}).then(({results}) => setBlogs(results));
    }, []);


    return (
        <>
            <Header hidePath={true}/>
            <div className="main">
                <h2>“Prototyping the Next Dimension”</h2>
                <p className="description"> XR Lab CUSAT promotes diverse and interdisciplinary
                    research that combines different areas of interest and inquiry.
                    Our goal is to develop innovative, impactful research and applications in
                    VR, AR and CV by establishing collaborations with industry partners and academia.
                    With pioneering research, XRC will find new ways through invention and innovation
                    to make an impact today while paving the way for the future.

                </p>
                <Button variant="contained" className="btnpink">Learn More</Button>
            </div>
            <div className="info main">
                <div className="head">
                    <h2>Events</h2>
                    <span className="divider"/>
                    <span className="see">see all</span>
                </div>
                <div id={"events"} className="car" style={{fontSize: "18px"}}>
                    {events.map((event, i) =>
                        <div key={i} className="card"
                             style={{width: "15rem", minHeight: "100px", border: "1px solid #FFAC41"}}>
                            <img className="card-img-top" src={event.cover} alt=""/>
                            <div className="card-body" style={{minHeight: "130px"}}>
                                <p className="card-text">{event.intro}</p>
                            </div>
                            <a href={`/events/${event.id}`} style={{color: "#FF1E56"}}
                               className="card-link ms-2">
                                ...read more
                            </a>
                        </div>
                    )}
                </div>
            </div>
            <div id={"blogs"} className="info main">
                <div className="head">
                    <h2>Blogs</h2>
                    <span className="divider"/>
                    <span className="see">see all</span>
                </div>
                <div className="car" style={{fontSize: "18px"}}>
                    {blogs.map((event, i) =>
                        <div key={i} className="card"
                             style={{width: "15rem", minHeight: "100px", border: "1px solid #FFAC41"}}>
                            <img className="card-img-top" src={event.cover} alt=""/>
                            <div className="card-body" style={{minHeight: "130px"}}>
                                <p className="card-text">{event.intro}</p>
                            </div>
                            <a href={`/blogs/${event.id}`} style={{color: "#FF1E56"}}
                               className="card-link ms-2">
                                ...read more
                            </a>
                        </div>
                    )}
                </div>
            </div>
            <div className="articles">
                <div className="news">
                <div className="head">
                    <h2>Lab News</h2>
                    <span className="divider"/>
                </div>
                <div className="content">
                    <h5>26 JUNE 2022</h5>
                    <h4>
                        Thank you, Trebuchet, for the kind support of our research </h4>
                    <p>computer-supported face-to-face communication, and that will change everything.  At the Futu ....<a href="#" style={{color: "#FF1E56"}}
                       className="card-link ms-2">
                        ...read more
                    </a>
                    </p>
                </div>
                </div>
                <div className="tweets">
                <div className="head">
                    <h2>Tweets</h2>
                    <span className="divider"/>
                </div>
                    <div className="content">
                        <TwitterContainer/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

