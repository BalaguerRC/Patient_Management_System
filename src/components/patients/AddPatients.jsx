import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPatients = () => {
  const [Name, setName] = useState();
  const [LastName, setLastName] = useState();
  const [Phone, setPhone] = useState();
  const [Address, setAddress] = useState();
  const [Identity, setIdentity] = useState();
  const [Birthday, setBirthday] = useState();
  const [Smoker, setSmoker] = useState(false);
  const [Allergies, setAllergies] = useState();
  const Img = "https://assets.stickpng.com/images/5a4613ddd099a2ad03f9c994.png";

  const navigate = useNavigate();

  const Post = (
    name,
    lastname,
    phone,
    address,
    identity,
    birthday,
    smoker,
    allergies,
    img
  ) => {
    console.log(
      name,
      lastname,
      phone,
      address,
      identity,
      birthday,
      smoker,
      allergies,
      img
    );

    fetch(import.meta.env.VITE_APIURL + "Patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name_Patient: name,
        lastName_Patient: lastname,
        phone_Patient: phone,
        address_Patient: address,
        identity_Patient: identity,
        birthdate_Patient: birthday,
        smoker_Patient: smoker ? "1" : "0",
        allergies_Patient: allergies,
        img_Patient: img,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      AddPatients <Button onClick={() => navigate("/patients")}>Back</Button>
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
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            placeholder="lastname..."
            fullWidth
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            placeholder="phone..."
            fullWidth
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            placeholder="adress..."
            fullWidth
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            placeholder="identity..."
            fullWidth
            onChange={(e) => setIdentity(e.target.value)}
          />
          <TextField
            placeholder="birthday..."
            fullWidth
            type="date"
            onChange={(e) => setBirthday(e.target.value)}
          />
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
            onChange={(e) => setAllergies(e.target.value)}
          />
          <TextField type="file" />
          <Button
            onClick={() =>
              Post(
                Name,
                LastName,
                Phone,
                Address,
                Identity,
                Birthday,
                Smoker,
                Allergies,
                Img
              )
            }
          >
            Save
          </Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default AddPatients;
