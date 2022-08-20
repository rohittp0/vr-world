import React from "react";
import {Avatar, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// function createData(number, item, qty, price)
// {
//  return {number, name, status};
// }
//
// const rows = [
//  createData(1, "Jury Learning: Integrating Dissenting Voices into Machine Learning Models wins Best Paper at CHI 2022", "Reviewed"),
//  createData(2, "HybridTrak: Adding Full-Body Tracking to VR Using an Off-the-Shelf Webcam", "Reviewed"),
// ];
const Profile = () =>
{
  return (
      <div className="prfcontainer">
           <div className="profile_head">
            <Avatar sx={{ width: 140, height: 140, backgroundColor:"red", borderRadius:"10px" }}>H</Avatar>
             <div className="profile_info">
               <div className="prfsub"> <Typography  sx={{ fontSize: 35 }}>Name</Typography><EditIcon/></div>
                <Typography  sx={{ fontSize: 20}}>Neque porro quisquam est qui dolorem</Typography>
                 <Typography  sx={{ fontSize: 20}}>Neque porro quisquam est qui dolorem</Typography>
               <div className="social_icons">
                 <span className="cv">CV</span>
                 <TwitterIcon sx={{color:"#FF1E56"}}/>
                 <LinkedInIcon sx={{color:"#FF1E56"}}/>
                 <GitHubIcon sx={{color:"#FF1E56"}}/>
                 </div>
                </div>
          </div>
          <div className="proposals">
            <Typography sx={{ fontSize: 20}}>Active Proposals</Typography>
           <div className="prfdivider"/>
           </div>
             <div className="proptable">
           <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>S.No</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                             1
                        </TableCell>
                        <TableCell align="right">Jury Learning: Integrating Dissenting Voices into Machine Learning Models wins Best Paper at CHI 2022</TableCell>
                        <TableCell align="right">Reviewed</TableCell>
                      </TableRow>
                       <TableRow>
                      <TableCell component="th" scope="row">
                           2
                      </TableCell>
                      <TableCell align="right">HybridTrak: Adding Full-Body Tracking to VR Using an Off-the-Shelf Webcam</TableCell>
                      <TableCell align="right">Reviewed</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              </div>
                                      <input type="button" className="prfbutton" value="Make an Appointment"/>
      </div>

  );
};

export default Profile;
