import Footer from "../../components/footer/Footer";
import Button from "@mui/material/Button";
import "../../styles/home.css";
import Card from "../../components/card/Card";
import Header from "../../components/Header/Header";
export default function Home()
{
  const URL = "https://s3-alpha-sig.figma.com/img/2a33/455f/5640245b9824616aa597ba4744dec2ed?Expires=1658102400&Signature=B77hkqEoTyF3f-nr42NdPLFa7PNrtOyjgFdq0DQGRtwFOSVO8-oAS6Q9kqD-aB6d00m1B5UdJ9d2oEBsHAxZrv1CO~g7TsQE8I4GFGsx285d~rDG66BlyrwkEtsXL6v8Xlhrf5~lW45aalNbo0NYzZwW8dQ55ZaQe73VTKnci-KxfSH93n7GFvp6EM6oCfRnWE2OatXm5Eb6Qs~tqYemgZLuNz16pQ2PrPAdu50P-cI0ijN6UygXJ56rQXdVQBOFRlHEhBG01Zp-VXz3IHpbko8hsqvxgGuF-5qZg6j~XlEQnPAd3MKR6soQkYmOsR6JRexBxkdUdx7zLrkn5llU0g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";

    return (
        <>
        <Header/>
        <div className="main">
           <h2>Prototyping human interaction</h2>
           <p className="description">dquidem laudantium magni. Blanditiis suscipit aliquam totam impedit corrupti mollitia omnis nemo voluptates! Harum, eveniet amet. Minima, excepturi blanditiis. Asperiores!</p>           
           <Button variant="contained" className="btnpink">Learn More</Button>
        </div>
        <div className="info main">
            <div className="head">
                <h2>Events</h2>
                <span  className="divider"></span>
                <span className="see">see all</span>
            </div>
            <div className="car">
                <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study"/>
                <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study"/>
                <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study"/>
            </div>
        </div>
        <div className="info main">
            <div className="head">
                <h2>Blogs</h2>
                <span  className="divider"></span>
                <span className="see">see all</span>
            </div>
            <div className="car">
                <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study"/>
                <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study"/>
                <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study"/>
            </div>
        </div>
        <Footer/>
        </>
    );
}

