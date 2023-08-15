import {
  Button,
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
            console.log(data.errors);
            //setErrores(data.errors);

            /*if (data.errors)
            setErr2({
              name: data.errors.Name_User ? data.errors.Name_User[0] : null,
              lastname: data.errors.LastName_User
                ? data.errors.LastName_User[0]
                : null,
            });*/

            if (data.success) navigate("/users");

            if (data.message) setErr(data.message);
          })
          .catch((err) => console.log("Error", err));
      } else {
        console.log("la contrase;a no es igual");
      }
    }
  };

  return (
    <div>
      <Typography>Add new user</Typography>
      <Button onClick={() => navigate("/users")}>{"<-"}Back</Button>
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TextField
            type="text"
            /*error*/
            error={ErrName}
            helperText={ErrName ? "falta name" : null}
            placeholder="name..."
            required
            fullWidth
            onChange={(e) => {
              setName(e.target.value);
              setErrName(false);
            }}
          />
          <TextField
            type="text"
            placeholder="lastname..."
            error={ErrLastName}
            helperText={ErrLastName ? "falta lastname" : null}
            required
            fullWidth
            onChange={(e) => {
              setLastName(e.target.value);
              setErrLastName(false);
            }}
          />
          <TextField
            type="text"
            error={ErrMail}
            helperText={ErrMail ? "falta mail" : null}
            placeholder="mail..."
            fullWidth
            onChange={(e) => {
              setMail(e.target.value);
              setErrMail(false);
            }}
          />
          <TextField
            type="text"
            error={ErrUsername}
            helperText={ErrUsername ? "falta username" : null}
            placeholder="username..."
            fullWidth
            onChange={(e) => {
              setUsername(e.target.value);
              setErrUsername(false);
            }}
          />
          <TextField
            type="password"
            error={ErrPassword}
            helperText={ErrPassword ? "falta password" : null}
            placeholder="password..."
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
              setErrPassword(false);
            }}
          />
          <TextField
            type="password"
            placeholder="confirm password..."
            error={ErrConfirmPassword}
            helperText={ErrConfirmPassword ? "Confirme el password" : null}
            fullWidth
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setErrConfirmPassword(false);
              }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              value={Type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Doctor</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="caption">{Err}</Typography>
        </Grid>
        <Grid container direction={"row"}>
          <Button
            variant="contained"
            fullWidth
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
      </Paper>
    </div>
  );
};

export default AddUser;
