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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mail, setMail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Type, setType] = useState(2);
  const [Err, setErr] = useState();
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(false);

  /**errores */

  const [ErrName, setErrName] = useState(false);
  const [ErrLastName, setErrLastName] = useState(false);
  const [ErrMail, setErrMail] = useState(false);
  const [ErrUsername, setErrUsername] = useState(false);
  const [ErrPassword, setErrPassword] = useState(false);
  const [ErrConfirmPassword, setErrConfirmPassword] = useState(false);

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
    if (!Name || Name === "") setErrName(!ErrName);
    else if (!LastName || LastName === "") setErrLastName(!ErrLastName);
    else if (!Mail || Mail === "") setErrMail(!ErrMail);
    else if (!Username || Username === "") setErrUsername(!ErrUsername);
    else if (!Password || Password === "") setErrPassword(!ErrPassword);
    else if (ConfirmPassword != Password)
      setErrConfirmPassword(!ErrConfirmPassword);
    //if(!Type) setErrType(!ErrType)
    else {
      console.log(true);
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
            console.log("Error", err);
            setTimeout(() => {
              Swal.fire({
                title: "Error!",
                icon: "error",
                text: err,
                confirmButtonText: "OK",
              });
            }, 800);
          });
      } else {
        console.log("la contrase;a no es igual");
      }
    }
  };

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
              <Typography variant="h6">Add Users</Typography>
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
                helperText={ErrName ? "Type a Name" : null}
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
            <Grid item sx={{ pb: 2 }} xs={6}>
              <TextField
                type="text"
                placeholder="lastname..."
                error={ErrLastName}
                helperText={ErrLastName ? "Type a LastName" : null}
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
            <Grid item sx={{ pb: 2 }} xs={6}>
              <TextField
                type="text"
                error={ErrMail}
                helperText={ErrMail ? "Type an Email" : null}
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
            <Grid item sx={{ pb: 2 }} xs={6}>
              <TextField
                type="text"
                error={Err ? Err : ErrUsername}
                helperText={ErrUsername ? "Type a UserName" : null}
                placeholder="username..."
                label={"Username"}
                fullWidth
                variant="standard"
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
            pb={2}
          >
            <Grid item xs>
              <TextField
                type="password"
                error={ErrPassword}
                helperText={ErrPassword ? "Type a Password" : null}
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
                  AddUser(
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

export default AddUser;
