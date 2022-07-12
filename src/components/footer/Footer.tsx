import React from "react";
import "./footer.css";
const Footer = () => 
{
    const LOGO = "https://s3-alpha-sig.figma.com/img/65d8/d862/3bd8211eed88cb9c8a77ed107e18402a?Expires=1658102400&Signature=dKCKnowE8VJiF8IjftNU2K0fzi159EezIAraS5kZTtQaO5SjF5IKcNQPM9X48NdU8sN0SqGVxGlR8JYZhKcsYHEf1K56EZoJg9IVELosgK-l8Oc4VHBEQkefU-33XnzSv8Swia~Ifk2qS89FEOqrSJgf1KR36yRxa6AUs3Fpu~JpcRefPLB-Q8~C816IlR~qClZubnU~SAeuYTN26FlESAT7rUO-YAyqG8C9-e6mPDONv3hSGFi1gVbSVg3piDBqH8RyGyHl2oa9m-vh9xGdogWrxxbxwJJKjS63Nt0H0Behv3GXAO9Q0PRWO-FYHmFNUPH3yVAQYHst0NZEmfMyuQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";

    return (
        <>
            <div className="bx main">
                <div className="footer">
                    <footer className="foot">
                        <div className="box">
                            <img src={LOGO} alt="Cusat Logo" className="img" />
                            <h5 className="title">Cochin University Of Science and Technology</h5>
                            <address>
                                <h6 className="place">Unviversity Road, South Kalamassery,</h6>
                                <h6 className="place">Kalamassery,Kochi.Kerala 682022</h6>
                            </address>
                        </div>
                        <div className="box">
                            <address>
                                <h5 className="title">Sasigopalan</h5>
                                <h6 className="prof">Director</h6>
                                <h6 className="prof">Professor of Head</h6>
                                <h6 className="prof">Department of meathematics</h6>
                                <h6 className="prof">Cochin university of Science and Technology</h6>
                                <br />
                                <h6 className="place">sgcusat@gmail.com</h6>
                            </address>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Footer;
