
import React from "react";
import Header from "../../components/Header/Header";
import {Avatar, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../../styles/edit.css"

const Register = () =>
{
  return (
  <>
      <Header />
        <div className="editCont">
              <h4>Complete Profile</h4>
                     <Avatar sx={{ width: 140, height: 140, backgroundColor:"red", borderRadius:"10px" }}>H</Avatar>
                      <div className="editComponents">
                         <h6>Name</h6>
                     <TextField id="standard-basic" variant="standard" required  />
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
          </>
  );
};

export default Register;
