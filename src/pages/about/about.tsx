import React from "react";
import Footer from "../../components/footer/Footer";
import "../../styles/about.css";
import Header from "../../components/Header/Header";

const About = () =>
{
    return (
        <>
            <Header/>
            <div className="main">
                <div className="head">
                    <h2>About</h2>
                    <span className="divider" style={{width: "100%"}}></span>
                </div>
                <p className="mt-3" style={{color: "grey"}}>
                   Extended reality lab in the Skill Orientation Centre for Engineering (SOCE),
                    CUSAT as its extension proposed by Prof(Dr.) Sasi Gopalan, Department of mathematics
                    (  Mentor & Coordinator SOCE) aims at prototyping human interaction to make the future
                    more better and human centred by creating advancements in computer vision,
                    augmented reality and virtual reality. The advancements in this field indicate that
                    the XR lab will be the next pervasive platform for communication, experimentation,
                    and work via the replacement of current hardware into a Virtual, Augmented,
                    and Mixed reality Library.



                </p>
                <div className="head mt-3">
                    <h3 style={{width: "16rem"}} className="dir">
                        From the Director
                    </h3>
                    <span className="divider"></span>
                </div>
                <p style={{color: "grey"}} className="mt-3">
                    Given the choice, people prefer to engage in activities that involve
                    the physical presence of other people, whether those activities be
                    collaborating on a project, seeing a movie or play, going to a music
                    concert or museum, dining at a restaurant, watching sports, or just
                    chatting over coffee.
                </p>
            </div>
            <Footer/>
        </>
    );
};

export default About;
