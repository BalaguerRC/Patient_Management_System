import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
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

  const Img =
    "https://cdn.discordapp.com/attachments/649710964220100638/1144307499051270255/5a4613ddd099a2ad03f9c994.png";

  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(false);
  /**Errors */

  const [ErrName, setErrName] = useState(false);
  const [ErrLastName, setErrLastName] = useState(false);
  const [ErrPhone, setErrPhone] = useState(false);
  const [ErrAddress, setErrAddress] = useState(false);
  const [ErrIdentity, setErrIdentity] = useState(false);
  const [ErrBirthday, setErrBirthday] = useState(false);
  const [ErrAllergies, setErrAllergies] = useState(false);

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
    if (!Name || Name === "") setErrName(!ErrName);
    else if (!LastName || LastName === "") setErrLastName(!ErrLastName);
    else if (!Phone || Phone === "") setErrPhone(!ErrPhone);
    else if (!Address || Address === "") setErrAddress(!ErrAddress);
    else if (!Identity || Identity === "") setErrIdentity(!ErrIdentity);
    else if (!Birthday || Birthday === "") setErrBirthday(!ErrBirthday);
    else if (!Allergies || Allergies === "") setErrAllergies(!ErrAllergies);
    else {
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
        .then((data) => {
          if (data) navigate("/patients");
          else console.log(data);
        });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => navigate("/patients")}
        maxWidth={"md"}
        fullWidth
        sx={{
          ".css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop": {
            backgroundColor: "rgba(0, 0, 0, 0.91)",
          },
        }}
      >
        <DialogTitle>
          <Grid
            container
            direction={"row"}
            justifyContent={"left"}
            alignItems={"center"}
          >
            <Grid item>
              <Button onClick={() => navigate("/patients")}>{"<"}</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">Add Patients</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"Center"}
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
                  src="perfil"
                  sx={{ width: 156, height: 156 }}
                />
              </Badge>
            </Grid>
          </Grid>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ pb: 4, pt: 2 }}
          >
            <Grid item xs>
              <TextField
                type="text"
                error={ErrName}
                helperText={ErrName ? "falta Name" : null}
                placeholder="Name..."
                label={"Name"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setName(e.target.value);
                  setErrName(false);
                }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                type="text"
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
            sx={{ pb: 4 }}
            alignItems={"center"}
          >
            <Grid item xs>
              <TextField
                type="tel"
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
            sx={{ pb: 4 }}
            alignItems={"center"}
          >
            <Grid item xs>
              <TextField
                type="date"
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
        </DialogContent>
        <Divider />
        <DialogActions sx={{ mr: 2 }}>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => navigate("/patients")}
          >
            Cancel
          </Button>
          {time ? (
            <LoadingButton loading variant="outlined">
              Save
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                setTime(!time);
                setTimeout(() => {
                  setTime(time);
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
                  );
                }, 1000);
              }}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
{
  /**
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
              <Typography variant="h6">Add Patients</Typography>
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
                  src="perfil"
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
                placeholder="Name..."
                label={"Name"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setName(e.target.value);
                  setErrName(false);
                }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                type="text"
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
          </Grid>
        </Paper>
      </Grid>
*/
}
export default AddPatients;
