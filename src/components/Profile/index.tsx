import {React, useState} from "react";
import Profile from "../../components/Profile/Profile";
import EditProfile from "../../components/Profile/EditProfile";
const ProfileIndex = () =>
{
    const [page, setPage]=useState("profile");

  return (
      <div className="prfindex">
         {page === "profile" && <Profile stateChanger={setPage}/>}
         {page === "edit" && <EditProfile stateChanger={setPage} />}
      </div>

  );
};

export default ProfileIndex;
