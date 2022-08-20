
import React, {useState} from "react";
import Header from "../../components/Header/Header";
import Profile from "../../components/Profile";
import Resources from "../../components/Resources";
import "../../styles/dash.css";

const Dashboard = () =>
{
    const [page, setPage]=useState("profile");
    return (
<>
            <Header />
            <div className="dashmain">
             <div className="dashbar">
                        <ul className="dashmenu">
                            <li className="menu-item" onClick={() => setPage("profile")}>Profile</li>
                            <li className="menu-item" onClick={() => setPage("resources")}>Resources</li>
                        </ul>
                    </div>
                <div className="compFrame">
                           {page === "profile" && <Profile />}
                           {page === "resources" && <Resources />}
                </div>
                </div>
                </>
    );
};

export default Dashboard;
