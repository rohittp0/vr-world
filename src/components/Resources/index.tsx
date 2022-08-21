import React from "react";
import "../../styles/dash.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import YouTubeIcon from "@mui/icons-material/YouTube";
const Resources = () =>
{
  return (

      <div className="rescontainer">
      <div className="reshead">
          <h2>Resources</h2>
          <div className="prfdivider"/>
          <input type="text"  className="resbar" placeholder="Q  Search"/>
      </div>
          <button className="dashbutton">
          <a href="#" >Go to Docs</a>
          </button>
          <div className="resvideo">
              <Typography variant="h4" fontFamily="Poppins" fontWeight="bold" fontSize="20px">Videos</Typography>
              <div className="prfdivider"/>

                      </div>
              <div className={"videos"}>
                  <Card sx={{ maxWidth: 345, borderRadius:"15px" }}>
                      <CardMedia
                          component="img"
                          height="194"
                          image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Danny_DeVito_%284842584969%29.jpg/2560px-Danny_DeVito_%284842584969%29.jpg"
                          alt="Paella dish"
                      />
                      <CardContent sx={{backgroundColor:"#f5f5f5"}}>
                          <Typography variant="h5" fontFamily="Source Sans Pro" fontWeight="bold" fontSize="20px">
                              Roberto Carlos
                          </Typography>
                          <Typography variant="body2" color="text.secondary" fontFamily="Source Sans Pro" fontSize="15px" fontWeight="bold">
                              This impressive paella is a perfect party dish and a fun meal to cook
                              together with your guests. Add 1 cup of frozen peas along with the
                              mussels, if you like.
                          </Typography>
                      </CardContent>
                      <CardActions sx={{backgroundColor:"#f5f5f5"}}>
                          <a href="https://youtu.be/dQw4w9WgXcQ" className="watchbutton">Watch
                      </a>
                          <YouTubeIcon sx={{ color: "red" }} />
                      </CardActions>
                  </Card>
                  <Card sx={{ maxWidth: 345, borderRadius:"15px"}}>
                      <CardMedia
                          component="img"
                          height="194"
                          image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Danny_DeVito_%284842584969%29.jpg/2560px-Danny_DeVito_%284842584969%29.jpg"
                          alt="Paella dish"
                      />
                      <CardContent sx={{backgroundColor:"#f5f5f5"}}>
                          <Typography variant="h5" fontFamily="Source Sans Pro" fontWeight="bold" fontSize="20px">
                              Roberto Carlos
                          </Typography>
                          <Typography variant="body2" color="text.secondary" fontFamily="Source Sans Pro" fontSize="15px" fontWeight="bold">
                              This impressive paella is a perfect party dish and a fun meal to cook
                              together with your guests. Add 1 cup of frozen peas along with the
                              mussels, if you like.
                          </Typography>
                      </CardContent>
                      <CardActions sx={{backgroundColor:"#f5f5f5"}}>
                          <Typography variant="body2" color="#FF1E56" fontFamily="Source Sans Pro" fontWeight="bold" fontSize="15px">
                              Watch
                          </Typography>
                          <YouTubeIcon sx={{ color: "red" }} />
                      </CardActions>
                  </Card>
              </div>
      </div>
  );
};

export default Resources;
