import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header/Header";
import "../../styles/form.css";


const Form = () =>
{
    return (
        <>
            <Header />
            <div className="main">
                <div className="head">


                    <iframe id="table" className="airtable-embed"
    src="https://airtable.com/embed/shrxVmF8Ve1oQS1wM?backgroundColor=red"
    frameBorder="0" onmousewheel="" width="100%" height="500"
    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Form;
