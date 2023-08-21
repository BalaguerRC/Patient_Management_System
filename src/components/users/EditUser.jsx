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
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  //const [SecActive, setSecActive] = useState(false);
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mail, setMail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState(null);
  const [Type, setType] = useState(2);

  /**Errores */

  const [ErrName, setErrName] = useState(false);
  const [ErrLastName, setErrLastName] = useState(false);
  const [ErrMail, setErrMail] = useState(false);
  const [ErrUsername, setErrUsername] = useState(false);
  const [ErrPassword, setErrPassword] = useState(false);
  const [ErrConfirmPassword, setErrConfirmPassword] = useState(false);
  /**end */
  const navigate = useNavigate();

  const token = localStorage.getItem("token_user");

  const { id } = useParams();

  const getUserById = () => {
    fetch(import.meta.env.VITE_APIURL + "Users/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name_User);
        setLastName(data.data.lastName_User);
        setMail(data.data.email_User);
        setUsername(data.data.userName);
        setType(data.data.type_User);
      })
      .catch((err) => console.log(err));
  };

  const Post = (
    name,
    lastname,
    mail,
    username,
    password,
    confirmpass,
    type
  ) => {
    if (!Name || Name === "") setErrName(!ErrName);
    if (!LastName || LastName === "") setErrLastName(!ErrLastName);
    if (!Mail || Mail === "") setErrMail(!ErrMail);
    if (!Username || Username === "") setErrUsername(!ErrUsername);
    else {
      if (!Password || Password === "") setErrPassword(!ErrPassword);
      if (ConfirmPassword != Password)
        setErrConfirmPassword(!ErrConfirmPassword);

      if (confirmpass == password) {
        fetch(import.meta.env.VITE_APIURL + "Users/" + id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/Json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            name_User: name,
            lastName_User: lastname,
            email_User: mail,
            userName: username,
            password_User: confirmpass,
            type_User: type,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            data.success ? navigate("/users") : console.log(data);
          });

        /*console.log(
          name,
          lastname,
          mail,
          username,
          password,
          confirmpass,
          type
        );*/
      }
    }
  };

  useEffect(() => {
    getUserById();
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
              <Button onClick={() => navigate("/users")}>{"<"}</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">Update User: {id}</Typography>
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
              sx={{ pb: 2 }}
              xs={6}
            >
              <TextField
                type="text"
                error={ErrName}
                helperText={ErrName ? "falta name" : null}
                placeholder="name..."
                label={"Name"}
                variant="standard"
                value={Name}
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
              sx={{ pb: 2 }}
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
                value={LastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrLastName(false);
                }}
              />
            </Grid>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{ pb: 2 }}
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
                value={Mail}
                onChange={(e) => {
                  setMail(e.target.value);
                  setErrMail(false);
                }}
              />
            </Grid>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{ pb: 2 }}
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
                value={Username}
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
            sx={{ pr: 4, pl: 4, pb: 4 }}
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
    </div>
  );
};
export default EditUser;
