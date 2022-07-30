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
                    <h1 style={{width:"10px"}}>About</h1>
                    <span className="divider" style={{width: "100%"}}></span>
                </div>
                <p className="des mt-3" >
                    Given the choice, people prefer to engage in activities that involve
                    the physical presence of other people, whether those activities be
                    collaborating on a project, seeing a movie or play, going to a music
                    concert or museum, dining at a restaurant, watching sports, or just
                    chatting over coffee.
                    <br/>
                    <br/>
                    The NYU Future Reality explores how people will use future mixed
                    reality technologies to better communicate and interact with each
                    other when they are in the same physical space. Doing this right
                    involves great technical challenges, but also great potential
                    benefits.
                    <br/>
                    <br/>
                    In our optimistic view, the future can be a place where language
                    itself will eventually take on new and rich visual dimensions, a sort
                    of combination of Harry Potter and Harold and the Purple Crayon.
                </p>
                <div className="head mt-3">
                    <h3 style={{width: "17rem"}} className="dir">
                        From the Director
                    </h3>
                    <span className="divider"></span>
                </div>
                <p className="des mt-3">
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
