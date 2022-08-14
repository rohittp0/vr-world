import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../../styles/members.css";
import Footer from "../../components/footer/Footer";
import {Button} from "@mui/material";
import Header from "../../components/Header/Header";
import Mentor from "../../components/card/Mentor";
import Card from "../../components/card/Card";
import Table from "../../components/Table/Table";
import {Link} from "react-router-dom";



export default function CenteredTabs() 
{
    const [value, setValue] = React.useState(0);
    const URL = "https://s3-alpha-sig.figma.com/img/2a33/455f/5640245b9824616aa597ba4744dec2ed?Expires=1658102400&Signature=B77hkqEoTyF3f-nr42NdPLFa7PNrtOyjgFdq0DQGRtwFOSVO8-oAS6Q9kqD-aB6d00m1B5UdJ9d2oEBsHAxZrv1CO~g7TsQE8I4GFGsx285d~rDG66BlyrwkEtsXL6v8Xlhrf5~lW45aalNbo0NYzZwW8dQ55ZaQe73VTKnci-KxfSH93n7GFvp6EM6oCfRnWE2OatXm5Eb6Qs~tqYemgZLuNz16pQ2PrPAdu50P-cI0ijN6UygXJ56rQXdVQBOFRlHEhBG01Zp-VXz3IHpbko8hsqvxgGuF-5qZg6j~XlEQnPAd3MKR6soQkYmOsR6JRexBxkdUdx7zLrkn5llU0g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";


    const handleChange = (event: React.SyntheticEvent, newValue: number) => 
{
        setValue(newValue);
    };
    const dummey = "https://s3-alpha-sig.figma.com/img/ad62/8155/4e338fae3f3fd5f3cb50d54acb18138f?Expires=1658102400&Signature=N-gF3z6~hb9H0LN-00C~EJvxPD2Ua13oWD07~aPyjs~2tz4d8ki3PtsxJqYilpNrRw1B3Se6-neRanZzYPm8CO5IAIgw144SIULn6rhG3U2OkEFHbV9lwH5Q~BPx1vQ44-hrvySsYMvC-6QScdHJUXSZb7z5xMB8VMfPhS64pBaXUowg3ifB-B-EieGuprouZqcUBN~8FTog-jLDVn0syl~wa7LvC6V0-dhWaRVFeIT8aQiFNiXsVmiQOfTVzPTbEeq-bfgVWqJQRRKgOU8VNUq8QXygv3XP3sq82-N~5NlNyOlfPE32ydG1~-djfFxxCkkUJCs-HwUIpOarzF3iVQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";

    const TabInfo = () => 
{
        if (value === 0)

            return (
                <>
                    <Mentor name="Dr sasigopalan" img={dummey} type="professor of head" mail="sgcusat@gmail.com" position="Faculty" branch="Department of mathematics Cusat" />
                    <Mentor name="Dr sasigopalan" img={dummey} type="professor of head" mail="sgcusat@gmail.com" position="Advisory Board" branch="Department of mathematics Cusat" />
                    <Mentor name="Dr sasigopalan" img={dummey} type="professor of head" mail="sgcusat@gmail.com" position="Faculty" branch="Department of mathematics Cusat" />
                </>
            );

        else if (value === 1)

            return (
                <>
                    <div className="head mt">
                        <h6>Phd Students</h6>
                        <span className="divider"></span>
                    </div>
                    <div className="car mt">
                        <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study" name="sree" />
                        <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study" name="hari" />
                        <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study" name="jhon" />
                    </div>
                    <div className="head mt">
                        <h6>UnderGraduate students</h6>
                        <span className="divider"></span>
                    </div>
                    <div className="car mt">
                        <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study" />
                        <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study" />
                        <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study" />
                    </div>
                    <div className="head mt">
                        <h6>Masters Students</h6>
                        <span className="divider"></span>
                    </div>
                    <div className="car mt">
                        <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study" />
                        <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study" />
                        <Card img={URL} alt="college" info="amazing and cool college i recomend you guys to come here and study" />
                    </div>
                </>

            );
        else if (value === 2)
            return (
                <Table />
            );


        return null;
    };

    return (
        <>
            <Header />
            <div className="main">
                <div className="end">
                    <Link to={"/login"}>
                    <Button variant="contained" className="btnpink">Join Now</Button>
                    </Link>
                </div>
                <div className="head">
                    <h1>Members</h1>
                    <span className="divider"/>
                </div>
                <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <Tabs value={value} onChange={handleChange} centered indicatorColor="primary">
                        <Tab label="Mentors" />
                        <Tab label="Current Mentors" />
                        <Tab label="Alumnis" />
                    </Tabs>
                    <TabInfo />
                </Box>
            </div>
            <Footer />
        </>
    );
}


