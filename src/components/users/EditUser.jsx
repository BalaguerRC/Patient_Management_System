import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditUser = () => {
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mail, setMail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState(null);
  const [Type, setType] = useState(2);
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(false);
  const [Err, setErr] = useState();

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
      .catch((err) => {
        navigate("/users");
        console.log(err);
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Token Expired",
          confirmButtonText: "OK",
        });
      });
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
    else if (!LastName || LastName === "") setErrLastName(!ErrLastName);
    else if (!Mail || Mail === "") setErrMail(!ErrMail);
    else if (!Username || Username === "") setErrUsername(!ErrUsername);
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
            if (data.success) {
              navigate("/users");
              setTimeout(() => {
                Swal.fire({
                  title: "Success",
                  text: "Do you want to continue?",
                  icon: "success",
                  confirmButtonText: "OK",
                });
              }, 800);
            } else if (data.message) {
              setErr(data.message);
            } else {
              navigate("/users");
              console.log(data);
              setTimeout(() => {
                Swal.fire({
                  title: "Error!",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }, 800);
            }
          })
          .catch((err) => {
            navigate("/users");
            console.log(err);
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: "Token Expired",
              confirmButtonText: "OK",
            });
          });
      }
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => navigate("/users")}
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
              <Button onClick={() => navigate("/users")}>{"<"}</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">Update User: {id}</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item sx={{ pb: 2 }} xs={6}>
              <TextField
                type="text"
                error={ErrName}
                helperText={ErrName ? "Type a name" : null}
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
            <Grid item sx={{ pb: 2 }} xs={6}>
              <TextField
                type="text"
                placeholder="lastname..."
                error={ErrLastName}
                helperText={ErrLastName ? "Type a lastname" : null}
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
            <Grid item sx={{ pb: 2 }} xs={6}>
              <TextField
                type="text"
                error={ErrMail}
                helperText={ErrMail ? "Type an Email" : null}
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
            <Grid item sx={{ pb: 2 }} xs={6}>
              <TextField
                type="text"
                error={Err ? Err : ErrUsername}
                helperText={ErrUsername ? "Type a username" : null}
                placeholder="username..."
                label={"Username"}
                fullWidth
                variant="standard"
                value={Username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrUsername(false);
                  setErr(null);
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs>
              <TextField
                type="password"
                error={ErrPassword}
                helperText={ErrPassword ? "Type a password" : null}
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
                helperText={ErrConfirmPassword ? "Confirm your password" : null}
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
          <Typography color={"#f44336"} variant="caption">
            {Err}
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => navigate("/users")}
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
                    Mail,
                    Username,
                    Password,
                    ConfirmPassword,
                    Type
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

export default EditUser;
