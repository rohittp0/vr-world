import * as React from "react";
import {Avatar, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {baseUrl, filePatch, patch} from "../../api/api";
import {ChangeEvent, useState} from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {toast} from "react-toastify";
import {useAuth} from "../../api/auth";
import {AuthComponent, AuthState, getAuth, setObj} from "../../api/auth";
import {DeepPartial} from "../../types/utils";

const schema = yup.object({
    first_name: yup.string().required().matches(/^[A-Z ]+$/i, {message:"Enter a valid name"}),
    last_name: yup.string().required().matches(/^[A-Z ]+$/i, {message:"Enter a valid name"}),

}).required();

const uploadImage = (event: ChangeEvent<HTMLInputElement>) =>
{
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files?.[0];
    if (file)
    {
        reader.onloadend = () =>
        {
            const formData = new FormData();
            formData.append(
                "image",
                file,
                file.name
            );
            const headers = {"Authorization": `Bearer ${getAuth()}`};

            filePatch(baseUrl + "/auth/users/me/", formData, headers).then(() =>
            {
                toast.success("Successfully updated photo", {
                    position: "bottom-center"
                });
            }).catch((error) =>
            {
                toast.error(error.details, {
                    position: "bottom-center"
                });
            });
        };
        reader.readAsDataURL(file);
    }
};
let fileInput: {
    current: any;
    React: React.RefObject<HTMLInputElement> } = React.createRef();

const EditProfile = ({stateChanger, ...rest}) =>
{
    const {user} = useAuth(true);
    const [form,setForm]=useState({
        name:"",
        bio:"",
        github:"",
        twitter:"",
        linkedin:""
    });
    const handleForm=(e)=>{
        const value = e.target.value;
        setForm({
            ...form,
            [e.target.name]: value
        })
    }
    return (
      <div>
          <div className="prfcontainer">
              <h4>Edit</h4>
                    <div className="profile_hero">
                        <input type="file" hidden accept="image/*" onChange={uploadImage} ref={fileInput}  />
                        <Avatar sx={{width: 140, height: 140,borderRadius:"10px"}}
                                onClick={() => fileInput.current?.click()}
                                src={user?.tokens.profile || "https://png.pngtree.com/element_our/png/20181210/camera-png_265383.jpg"}
                        />
                    <IconButton  onClick={()=>stateChanger("profile")}>
                     <ArrowBackIcon/>
                   </IconButton>
                     </div>
                     <div className="editComponents">
                         <h6>Name</h6>
                     <TextField id="standard-basic" name="name" value={form.name} onChange={handleForm} variant="standard" />
                         <h6>Bio</h6>
                    <TextField id="standard-basic" name="bio" value={form.bio} onChange={handleForm} variant="standard" />
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
                    <TextField id="standard-basic" name="github" value={form.github} onChange={handleForm} variant="standard" />
                         <h6>Twitter Link</h6>
                    <TextField id="standard-basic" name="twitter" value={form.twitter} onChange={handleForm} variant="standard" />
                         <h6>LinkedIn Link</h6>
                    <TextField id="standard-basic"  name="linkedin" value={form.linkedin} onChange={handleForm} variant="standard" />
                     </div>
              <input type="button" className="edtbutton" onClick={()=>console.log(form)} value="Save"/>
          </div>
      </div>
  );
};

export default EditProfile;
