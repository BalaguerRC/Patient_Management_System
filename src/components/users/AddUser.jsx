import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  //const [SecActive, setSecActive] = useState(false);
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mail, setMail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Type, setType] = useState(2);
  const [Err, setErr] = useState();

  /**errores */

  const [ErrName, setErrName] = useState(false);
  const [ErrLastName, setErrLastName] = useState(false);
  const [ErrMail, setErrMail] = useState(false);
  const [ErrUsername, setErrUsername] = useState(false);
  const [ErrPassword, setErrPassword] = useState(false);
  const [ErrConfirmPassword, setErrConfirmPassword] = useState(false);
  /*const [ErrType, setErrType] = useState(false);*/

  /**,lastname:'',mail:'',username:'' */
  const token = localStorage.getItem("token_user");

  const navigate = useNavigate();

  const AddUser = (
    Name,
    LastName,
    Mail,
    Username,
    Password,
    ConfirmPassword,
    Type
  ) => {
    if (!Name) setErrName(!ErrName);
    if (!LastName) setErrLastName(!ErrLastName);
    if (!Mail) setErrMail(!ErrMail);
    if (!Username) setErrUsername(!ErrUsername);
    if (!Password) setErrPassword(!ErrPassword);
    if (ConfirmPassword != Password) setErrConfirmPassword(!ErrConfirmPassword);
    //if(!Type) setErrType(!ErrType)
    else {
      if (ConfirmPassword === Password) {
        fetch(import.meta.env.VITE_APIURL + "Users", {
          method: "POST",
          headers: {
            "Content-Type": "application/Json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            name_User: Name,
            lastName_User: LastName,
            email_User: Mail,
            userName: Username,
            password_User: ConfirmPassword,
            type_User: Type,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            //console.log(data.errors);
            //setErrores(data.errors);

            /*if (data.errors)
            setErr2({
              name: data.errors.Name_User ? data.errors.Name_User[0] : null,
              lastname: data.errors.LastName_User
                ? data.errors.LastName_User[0]
                : null,
            });*/

            if (data.success) navigate("/users");

            else if (data.message) setErr(data.message);
          })
          .catch((err) => console.log("Error", err));
      } else {
        console.log("la contrase;a no es igual");
      }
    }
  };

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
              <Button onClick={() => navigate("/users")}>{"<"}</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">Add Users</Typography>
            </Grid>
          </Grid>
          <Divider />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ pt: 4, pr: 4, pl: 4 }}
          >
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{pb:2}}
              xs={6}
            >
              <TextField
                type="text"
                /*error*/
                error={ErrName}
                helperText={ErrName ? "falta name" : null}
                placeholder="name..."
                label={"Name"}
                variant="standard"
                fullWidth
                required
                onChange={(e) => {
                  setName(e.target.value);
                  setErrName(false);
                }}
              />
            </Grid>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{pb:2}}
              xs={6}
            >
              <TextField
                type="text"
                placeholder="lastname..."
                error={ErrLastName}
                helperText={ErrLastName ? "falta lastname" : null}
                required
                label={"Last Name"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrLastName(false);
                }}
              />
            </Grid>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{pb:2}}
              xs={6}
            >
              <TextField
                type="text"
                error={ErrMail}
                helperText={ErrMail ? "falta mail" : null}
                placeholder="mail..."
                label={"Email"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setMail(e.target.value);
                  setErrMail(false);
                }}
              />
            </Grid>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{pb:2}}
              xs={6}
            >
              <TextField
                type="text"
                error={ErrUsername}
                helperText={ErrUsername ? "falta username" : null}
                placeholder="username..."
                label={"Username"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrUsername(false);
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ pr: 4, pl: 4, pb:4 }}
          >
            <Grid item xs>
              <TextField
                type="password"
                error={ErrPassword}
                helperText={ErrPassword ? "falta password" : null}
                placeholder="password..."
                label={"Password"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrPassword(false);
                }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                type="password"
                placeholder="confirm password..."
                error={ErrConfirmPassword}
                helperText={ErrConfirmPassword ? "Confirme el password" : null}
                label={"Confirm Password"}
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrConfirmPassword(false);
                }}
              />
            </Grid>

            <Grid item xs>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" variant="standard">
                  Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Type"
                  value={Type}
                  onChange={(e) => setType(e.target.value)}
                  variant="standard"
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={2}>Doctor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Typography color={"red"} variant="caption">{Err}</Typography>
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
                  AddUser(
                    Name,
                    LastName,
                    Mail,
                    Username,
                    Password,
                    ConfirmPassword,
                    Type
                  )
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {}
    </div>
  );
};


export default AddUser;
