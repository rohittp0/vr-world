import React from "react";
import {Avatar, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const EditProfile = ({stateChanger, ...rest}) =>
{
  return (
      <div>
          <div className="prfcontainer">
              <h4>Edit</h4>
                    <div className="profile_hero">
                     <Avatar sx={{ width: 140, height: 140, backgroundColor:"red", borderRadius:"10px" }}>H</Avatar>
                    <IconButton  onClick={()=>stateChanger("profile")}>
                     <ArrowBackIcon/>
                                      </IconButton>
                     </div>
                     <div className="editComponents">
                         <h6>Name</h6>
                     <TextField id="standard-basic" variant="standard" />
                         <h6>Bio</h6>
                    <TextField id="standard-basic"variant="standard" />
                        <input
                          accept="application/pdf"
                          style={{ display: "none"}}
                          id="raised-button-file"
                          multiple
                          type="file"
                        />
                        <label htmlFor="raised-button-file">
                          <Button variant="outlined" component="span" sx={{marginLeft:"-15px",color:"#ff1e56",borderColor:"#ff1e56"}}>
                            Upload CV
                          </Button>
                        </label>
                         <h6>Github Link</h6>
                    <TextField id="standard-basic" variant="standard" />
                         <h6>Twitter Link</h6>
                    <TextField id="standard-basic"  variant="standard" />
                         <h6>LinkedIn Link</h6>
                    <TextField id="standard-basic"  variant="standard" />
                     </div>
              <input type="button" className="edtbutton" value="Save"/>
          </div>

      </div>


  );
};

export default EditProfile;
