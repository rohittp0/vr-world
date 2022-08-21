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
                    <div className="profile_hero">
                     <Avatar sx={{ width: 140, height: 140, backgroundColor:"red", borderRadius:"10px" }}>H</Avatar>
                    <IconButton  onClick={()=>stateChanger("profile")}>
                     <ArrowBackIcon/>
                                      </IconButton>
                     </div>
                     <div className="editComponents">
                     <TextField id="standard-basic" label="Name" variant="standard" />
                    <TextField id="standard-basic" label="Bio" variant="standard" />
                        <input
                          accept="application/pdf"
                          style={{ display: "none" }}
                          id="raised-button-file"
                          multiple
                          type="file"
                        />
                        <label htmlFor="raised-button-file">
                          <Button variant="raised" component="span">
                            Upload CV
                          </Button>
                        </label> 
                    <TextField id="standard-basic" label="Github Link" variant="standard" />
                    <TextField id="standard-basic" label="Twitter Link" variant="standard" />
                    <TextField id="standard-basic" label="LinkedIn Link" variant="standard" />
                     </div>
          </div>

      </div>


  );
};

export default EditProfile;
