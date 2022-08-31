import {React, useState} from "react";
import Header from "../../components/Header/Header";
import ProfileIndex from "../../components/Profile";
import Topic from"../../components/Topic";
import ProjStart from"../../components/ProjStart";
import Resources from "../../components/Resources";
import {Person, Folder, AccountBox, Article, EmojiEmotions,KeyboardArrowDown} from "@mui/icons-material";
import "../../styles/dash.css";
import {useAuth} from "../../api/auth";

const Dashboard = () =>
{
   const {user} = useAuth(true);
   console.log(user)
    function expand()
       {

      const exp = document.getElementsByClassName("subdash")[0];
                                 if(exp.style.display==="block")
                                    exp.style.display="none";
                                    else
                                    exp.style.display="block";
        }
    const [page, setPage]=useState("profile");
    return (
    <>
            <Header />
            <div className="dashmain">
             <div className="dashbar">
                        <ul className="dashmenu">
                            <li className="menu-item" onClick={() => setPage("profile")}><Person sx={{minWidth:"30px"}}/>Profile</li>
                            <li className="menu-item" onClick={() => setPage("resources")}><Folder sx={{minWidth:"30px"}}/>Resources</li>
                            <li className="menu-item-click" onClick={()=>expand()}><AccountBox sx={{minWidth:"30px"}}/>Research <KeyboardArrowDown /></li>
                             <ul className="subdash">
                                                        <li className="menu-item" onClick={() => setPage("topic")}><Article sx={{minWidth:"30px"}}/>Topic List</li>
                                                        <li className="menu-item" onClick={() => setPage("projstart")}><EmojiEmotions sx={{minWidth:"30px"}}/>Start a Project</li>
                                                    </ul>
                        </ul>
                    </div>
                <div className="compFrame">
                           {page === "profile" && <ProfileIndex />}
                           {page === "resources" && <Resources />}
                           {page === "topic" && <Topic />}
                           {page === "projstart" && <ProjStart />}
                </div>
                </div>
                </>
    );
};
export default Dashboard;
