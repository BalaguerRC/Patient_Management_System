import { Button, Grid, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDoctor = () => {
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mail, setMail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Identity, setIdentity] = useState("");
  const [Image, setImage] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token_user");

  const getUser = () => {
    fetch(import.meta.env.VITE_APIURL + "Doctors/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setName(data.data.name_Doctor);
        setLastName(data.data.lastName_Doctor);
        setMail(data.data.email_Doctor);
        setPhone(data.data.phone_Doctor);
        setIdentity(data.data.identity_Doctor);
        setImage(data.data.img_Doctor);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const Update=(name,lastname,mail,phone,identity,image)=>{
    console.log(name,lastname,mail,phone,identity,image)

    fetch(import.meta.env.VITE_APIURL + "Doctors/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/Json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name_Doctor: name,
        lastName_Doctor: lastname,
        email_Doctor: mail,
        phone_Doctor: phone,
        identity_Doctor: identity,
        img_Doctor: image,
      }),
    })
      .then((res) => res.json()).then(data=>console.log(data))
  }
  return (
    <div>
      Edit {id}
      <Button onClick={() => navigate("/doctors")}>{"<-"}Back</Button>
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TextField type="text" placeholder="name..." fullWidth value={Name} onChange={(e)=>setName(e.target.value)}/>
          <TextField type="text" placeholder="lastname..." fullWidth value={LastName} onChange={(e)=>setLastName(e.target.value)}/>
          <TextField type="text" placeholder="mail..." fullWidth value={Mail} onChange={(e)=>setMail(e.target.value)}/>
          <TextField type="text" placeholder="phone..." fullWidth value={Phone} onChange={(e)=>setPhone(e.target.value)}/>
          <TextField type="text" placeholder="identity..." fullWidth value={Identity} onChange={(e)=>setIdentity(e.target.value)}/>
          <TextField type="file" />

          <Button onClick={()=>Update(Name,LastName,Mail,Phone,Identity,Image)}>Save</Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default EditDoctor;
