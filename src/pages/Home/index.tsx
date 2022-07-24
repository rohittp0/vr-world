import Footer from "../../components/footer/Footer";
import Button from "@mui/material/Button";
import "../../styles/home.css";
import Card from "../../components/card/Card";
import Header from "../../components/Header/Header";

import Game from "../../utils/game";
import {useEffect, useState} from "react";
import {Blogs, EventObject, Events} from "../../api/model";
import {useNavigate} from "react-router-dom";

export default function Home()
{
    const [events, setEvents] = useState<EventObject[]>([]);
    const [blogs, setBlogs] = useState<EventObject[]>([]);

    const navigate = useNavigate();

    useEffect(() =>
    {
        new Game();
    }, [document.getElementById("3root")]);

    useEffect(() =>
    {
        Events.filter({}).then(({results}) => setEvents(results));
        Blogs.filter({}).then(({results}) => setBlogs(results));
    }, []);


    return (
        <>
            <Header/>
            <div className="main">
                <h2>Prototyping human interaction</h2>
                <p className="description">dquidem laudantium magni. Blanditiis suscipit aliquam totam impedit corrupti
                    mollitia omnis nemo voluptates! Harum, eveniet amet. Minima, excepturi blanditiis. Asperiores!</p>
                <Button variant="contained" className="btnpink">Learn More</Button>
            </div>
            <div className="info main">
                <div className="head">
                    <h2>Events</h2>
                    <span className="divider"></span>
                    <span className="see">see all</span>
                </div>
                <div className="car">
                    {events.map((event, i) =>
                        <Card img={event.cover} alt="college" key={i}
                              info={event.intro}/>)}
                </div>
            </div>
            <div className="info main">
                <div className="head">
                    <h2>Blogs</h2>
                    <span className="divider"></span>
                    <span className="see">see all</span>
                </div>
                <div className="car">
                    {blogs.map((event, i) =>
                        <Card img={event.cover} alt="college" key={i}
                              onClick={() => navigate(`/blogs/${event.id}`)}
                              info={event.intro}/>)}
                </div>
            </div>
            <Footer/>
        </>
    );
}

