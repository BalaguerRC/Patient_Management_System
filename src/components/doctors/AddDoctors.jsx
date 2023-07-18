import { Button, Grid, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDoctors = () => {
  const [Name, setName] = useState();
  const [LastName, setLastName] = useState();
  const [Mail, setMail] = useState();
  const [Phone, setPhone] = useState();
  const [Identity, setIdentity] = useState();
  const [Image, setImage] = useState("https://assets.stickpng.com/images/5a4613ddd099a2ad03f9c994.png");

  const navigate = useNavigate()

  const token = localStorage.getItem("token_user");

  const AddDoctors=(Name,LastName,Mail,Phone,Identity,Image)=>{
    //console.log(Name,LastName,Mail,Phone,Identity,Image)
    fetch(import.meta.env.VITE_APIURL + "Doctors", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name_Doctor: Name,
        lastName_Doctor: LastName,
        email_Doctor: Mail,
        phone_Doctor: Phone,
        identity_Doctor: Identity,
        img_Doctor: Image
      })}).then(res=>res.json()).then(data=>console.log(data))
  }
  return (
    <div>
      AddDoctors
      <Button onClick={() => navigate("/doctors")}>{"<-"}Back</Button>
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TextField type="text" placeholder="name..." fullWidth onChange={(e)=>setName(e.target.value)}/>
          <TextField type="text" placeholder="lastname..." fullWidth onChange={(e)=>setLastName(e.target.value)}/>
          <TextField type="text" placeholder="mail..." fullWidth onChange={(e)=>setMail(e.target.value)}/>
          <TextField type="text" placeholder="phone..." fullWidth onChange={(e)=>setPhone(e.target.value)}/>
          <TextField type="text" placeholder="identity..." fullWidth onChange={(e)=>setIdentity(e.target.value)}/>
          <TextField type="file"/>

          <Button onClick={()=>AddDoctors(Name,LastName,Mail,Phone,Identity,Image)}>Save</Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default AddDoctors;
