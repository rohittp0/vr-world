import React, { useEffect } from "react";

const TwitterContainer = () => 
{
    useEffect(() => 
{
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        document.getElementsByClassName("twitter-embed")[0].appendChild(script);
    }, []);

    return (
        <section className="twitterContainer">
            <div className="twitter-embed">
                <a className="twitter-timeline"
                   data-tweet-limit="3"
                   href="https://twitter.com/kehsiihba/lists/1561594565810737152?ref_src=twsrc%5Etfw">
                   </a>

            </div>
        </section>
    );
};

export default TwitterContainer;
