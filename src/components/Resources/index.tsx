import React from "react";
import "../../styles/dash.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TextField from "@mui/material/TextField";
function createData(title:string,description:string,image:string,link:string)
{
 return {title,description,image,link};
}
const cards = [
 createData("Roberto Carlos",
 "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
 "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Danny_DeVito_%284842584969%29.jpg/2560px-Danny_DeVito_%284842584969%29.jpg"
 ,"https://youtu.be/dQw4w9WgXcQ"),
 createData("Walter White ",
  "Lorem Ipsum Satum sdf ASOlkvsd",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Danny_DeVito_%284842584969%29.jpg/2560px-Danny_DeVito_%284842584969%29.jpg"
  ,"https://youtu.be/dQw4w9WgXcQ"),
];
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
              {cards.map((card)=>(
                  <Card sx={{ minWidth: 345,maxWidth:345, borderRadius:"15px" ,backgroundColor:"#f5f5f5"}}>
                      <CardMedia
                          component="img"
                          height="194"
                          image={card.image}
                          alt="Paella dish"
                      />
                      <CardContent sx={{backgroundColor:"#f5f5f5"}}>
                          <Typography variant="h5" fontFamily="Source Sans Pro" fontWeight="bold" fontSize="20px">
                              {card.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" fontFamily="Source Sans Pro" fontSize="15px" fontWeight="bold">
                              {card.description}
                          </Typography>
                      </CardContent>
                      <CardActions >
                          <a href={card.link} className="watchbutton">Watch
                          <YouTubeIcon sx={{ color: "red" }} />
                          </a>
                      </CardActions>
                  </Card>
                  ))}

              </div>
      </div>
  );
};

export default Resources;
