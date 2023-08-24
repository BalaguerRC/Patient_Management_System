import {
  Avatar,
  Badge,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPatients = () => {
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Identity, setIdentity] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [Smoker, setSmoker] = useState(false);
  const [Allergies, setAllergies] = useState("");
  const [Img, setImg] = useState("");

  /**Errors */

  const [ErrName, setErrName] = useState(false);
  const [ErrLastName, setErrLastName] = useState(false);
  const [ErrPhone, setErrPhone] = useState(false);
  const [ErrAddress, setErrAddress] = useState(false);
  const [ErrIdentity, setErrIdentity] = useState(false);
  const [ErrBirthday, setErrBirthday] = useState(false);
  const [ErrAllergies, setErrAllergies] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const getPatientById = () => {
    fetch(
      import.meta.env.VITE_APIURL + "Patients/" + id /*{
        headers: {
          Authorization: "Bearer " + token,
        },
      }*/
    )
      .then((resp) => resp.json())
      .then((data) => {
        setName(data.data.name_Patient);
        setLastName(data.data.lastName_Patient);
        setPhone(data.data.phone_Patient);
        setAddress(data.data.address_Patient);
        setIdentity(data.data.identity_Patient);
        setBirthday(data.data.birthdate_Patient);
        setSmoker(data.data.smoker_Patient == 1 ? true : false);
        setAllergies(data.data.allergies_Patient);
        setImg(data.data.img_Patient);
      });
  };

  const put = (
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
    if (!Name || Name === "") setErrName(!ErrName);
    else if (!LastName || LastName === "") setErrLastName(!ErrLastName);
    else if (!Phone || Phone === "") setErrPhone(!ErrPhone);
    else if (!Address || Address === "") setErrAddress(!ErrAddress);
    else if (!Identity || Identity === "") setErrIdentity(!ErrIdentity);
    else if (!Birthday || Birthday === "") setErrBirthday(!ErrBirthday);
    else if (!Allergies || Allergies === "") setErrAllergies(!ErrAllergies);
    else {
      fetch(import.meta.env.VITE_APIURL + "Patients/" + id, {
        method: "PUT",
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
        .then((data) => {
          console.log(data);
          if (data.success) navigate("/patients");
          else console.log(data);
        });
    }
  };
  useEffect(() => {
    getPatientById();
  }, []);

  return (
    <div>
      <Grid item>
        <Paper>
          <Grid
            container
            direction={"row"}
            justifyContent={"left"}
            alignItems={"center"}
            sx={{ p: 1 }}
          >
            <Grid item>
              <Button onClick={() => navigate("/patients")}>{"<"}</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">Edit Patients: {id}</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"Center"}
            pt={4}
          >
            <Grid item>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <TextField
                    type="file"
                    variant="standard"
                    sx={{ width: "95%" }}
                  />
                }
              >
                <Avatar
                  alt="Perfil"
                  src={Img}
                  sx={{ width: 156, height: 156 }}
                />
              </Badge>
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ pr: 4, pl: 4, pb: 4, pt: 2 }}
          >
            <Grid item xs>
              <TextField
                type="text"
                error={ErrName}
                helperText={ErrName ? "falta Name" : null}
                placeholder="name..."
                label={"Name"}
                variant="standard"
                fullWidth
                value={Name}
                required
                onChange={(e) => {
                  setName(e.target.value);
                  setErrName(false);
                }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                type="text"
                value={LastName}
                placeholder="lastname..."
                error={ErrLastName}
                helperText={ErrLastName ? "falta lastName" : null}
                label={"Last Name"}
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrLastName(false);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ pr: 4, pl: 4, pb: 4 }}
            alignItems={"center"}
          >
            <Grid item xs>
              <TextField
                type="tel"
                value={Phone}
                placeholder="phone..."
                error={ErrPhone}
                helperText={ErrPhone ? "falta phone" : null}
                label={"Phone Number"}
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrPhone(false);
                }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                type="text"
                value={Address}
                error={ErrAddress}
                helperText={ErrAddress ? "falta address" : null}
                placeholder="Address..."
                label={"Address"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrAddress(false);
                }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                type="text"
                value={Identity}
                placeholder="identity..."
                error={ErrIdentity}
                helperText={ErrIdentity ? "falta identity" : null}
                label={"Identity"}
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setIdentity(e.target.value);
                  setErrIdentity(false);
                }}
              />
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ pr: 4, pl: 4, pb: 4 }}
            alignItems={"center"}
          >
            <Grid item xs>
              <TextField
                type="date"
                value={Birthday?.slice(0, 10)}
                placeholder="Birthday..."
                error={ErrBirthday}
                helperText={ErrBirthday ? "falta Birthday" : null}
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setBirthday(e.target.value);
                  setErrBirthday(false);
                }}
              />
            </Grid>
            <Grid item pr={1} pl={1}>
              <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">Smoker</FormLabel>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>No</Typography>
                  <Switch
                    checked={Smoker}
                    onChange={(e) => setSmoker(e.target.checked)}
                    color="warning"
                  />
                  <Typography>Yes</Typography>
                </Stack>
              </FormControl>
            </Grid>
            <Grid item xs>
              <TextField
                type="text"
                value={Allergies}
                placeholder="allergies..."
                error={ErrAllergies}
                helperText={ErrAllergies ? "falta allergies" : null}
                label={"Allergies"}
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setAllergies(e.target.value);
                  setErrAllergies(false);
                }}
              />
            </Grid>
          </Grid>

          <Divider />
          <Grid
            container
            direction={"row"}
            justifyContent={"right"}
            sx={{ p: 2 }}
          >
            <Grid item>
              <Button variant="contained" type="submit" disabled sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                type="submit"
                onClick={() =>
                  put(
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
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};
{
  /**
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
   */
}
export default EditPatients;
