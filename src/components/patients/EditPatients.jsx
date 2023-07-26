import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPatients = () => {
  const [Name, setName] = useState();
  const [LastName, setLastName] = useState();
  const [Phone, setPhone] = useState();
  const [Address, setAddress] = useState();
  const [Identity, setIdentity] = useState();
  const [Birthday, setBirthday] = useState();
  const [Smoker, setSmoker] = useState();
  const [Allergies, setAllergies] = useState();
  const [Img, setImg] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const getPatientById=()=>{
    fetch(import.meta.env.VITE_APIURL + "Patients/" + id /*{
        headers: {
          Authorization: "Bearer " + token,
        },
      }*/)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data.data)
          setName(data.data.name_Patient);
          setLastName(data.data.lastName_Patient);
          setPhone(data.data.phone_Patient)
          setAddress(data.data.address_Patient)
          setIdentity(data.data.identity_Patient)
          setBirthday(data.data.birthdate_Patient)
          //console.log("birthday",data.data.birthdate_Patient.str.slice(1, -1))
          setSmoker(data.data.smoker_Patient)
          setAllergies(data.data.allergies_Patient)
          setImg(data.data.img_Patient)
        });
  }

  const put=(name,lastName,phone,address,identity,birthday,smoker,allergies,img)=>{
    console.log(name,lastName,phone,address,identity,birthday,smoker,allergies,img)
    fetch(import.meta.env.VITE_APIURL + "Patients/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/Json",
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name_Patient: name,
        lastName_Patient: lastName,
        phone_Patient: phone,
        address_Patient: address,
        identity_Patient: identity,
        birthdate_Patient: birthday,
        smoker_Patient: smoker ? "1" : "0",
        allergies_Patient: allergies,
        img_Patient: img
      }),
    })
      .then((res) => res.json()).then(data=>console.log(data))
  }
  useEffect(() => {
    getPatientById()
  }, []);

  return (
    <div>
      EditPatients {id}{" "}
      <Button onClick={() => navigate("/patients")}>Back</Button>
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TextField
            placeholder="name..."
            fullWidth
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            placeholder="lastname..."
            fullWidth
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            placeholder="phone..."
            fullWidth
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            placeholder="adress..."
            fullWidth
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            placeholder="identity..."
            fullWidth
            value={Identity}
            onChange={(e) => setIdentity(e.target.value)}
          />
          <TextField
            placeholder="birthday..."
            fullWidth
            type="date"
            value={Birthday?.slice(0, 10)}
            onChange={(e) => setBirthday(e.target.value)}
          />
          {Birthday?.slice(0, 10)}
          <FormControlLabel
            control={
              <Switch
                checked={Smoker}
                onChange={(e) => setSmoker(e.target.checked)}
              />
            }
            label="Smoker"
            labelPlacement="start"
          />
          <TextField
            placeholder="allergies..."
            fullWidth
            value={Allergies}
            onChange={(e) => setAllergies(e.target.value)}
          />
          <TextField type="file" />
          <Button onClick={()=>put(Name,LastName,Phone,Address,Identity,Birthday,Smoker,Allergies,Img)}
          >
            Save
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default EditPatients;
