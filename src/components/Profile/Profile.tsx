import React from "react";
import {Avatar, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {useAuth} from "../../api/auth";
function createData(name:string,status:string)
{
 return {name, status};
}
const rows = [
 createData("Jury Learning: Integrating Dissenting Voices into Machine Learning Models wins Best Paper at CHI 2022", "Reviewed"),
 createData("HybridTrak: Adding Full-Body Tracking to VR Using an Off-the-Shelf Webcam", "Reviewed"),
];
const Profile = ({stateChanger, ...rest}) =>
{
    const {user} = useAuth(true);

    return (
      <div className="prfcontainer">
        <div className="profile_hero">
           <div className="profile_head">
            <Avatar sx={{ width: 140, height: 140, backgroundColor:"red", borderRadius:"10px" }}><img src={user.tokens.profile} width={"140"} height={"140"}/></Avatar>
             <div className="profile_info">
               <div className="prfsub">
                       <Typography  sx={{ fontSize: 35, fontFamily:"Poppins",fontWeight:"Bolder" }}>{user.first_name} {user.last_name}</Typography>
               </div>
                <Typography  sx={{ fontSize: 20, fontFamily:"Poppins", fontWeight:"Bold"}}>Neque porro quisquam est qui dolorem</Typography>
                 <Typography  sx={{ fontSize: 20,fontFamily:"Poppins", fontWeight:"Bold"}}>Neque porro quisquam est qui dolorem</Typography>
               <div className="social_icons">
                   {(user.cv)  &&  <span className="cv">CV</span>}
                   {(user.twitter)  &&  <TwitterIcon sx={{color:"#FF1E56"}}/>}
                   {(user.linkedin)  &&  <LinkedInIcon sx={{color:"#FF1E56"}}/>}
                   {(user.github)  &&  <GitHubIcon sx={{color:"#FF1E56"}}/>}

                 </div>
                </div>
                </div>
                 <IconButton  onClick={()=>stateChanger("edit")}>
                       <EditIcon/>
                  </IconButton>
          </div>
          <div className="proposals">
            <Typography sx={{ fontSize: 20,fontFamily:"Poppins", fontWeight:"Bold",}}>Active Proposals</Typography>
           <div className="prfdivider"/>
           </div>
            <div className="proptable">

           <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {rows.map((row)=>(
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                      ))}
                   </TableBody>
                </Table>
              </TableContainer>
              </div>
          <input type="button" className="prfbutton" value="Make an Appointment"/>
      </div>

  );
};

export default Profile;
