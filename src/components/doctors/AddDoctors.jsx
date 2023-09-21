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
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddDoctors = () => {
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mail, setMail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Identity, setIdentity] = useState("");
  const [Image, setImage] = useState(
    "https://assets.stickpng.com/images/5a4613ddd099a2ad03f9c994.png"
  );

  const [LinkImagen, setLinkImagen] = useState(null);

  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(false);

  /**Errors */

  const [ErrName, setErrName] = useState(false);
  const [ErrLastName, setErrLastName] = useState(false);
  const [ErrMail, setErrMail] = useState(false);
  const [ErrPhone, setErrPhone] = useState(false);
  const [ErrIdentity, setErrIdentity] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token_user");

  const AddDoctors = (Name, LastName, Mail, Phone, Identity, Image) => {
    //console.log(Name,LastName,Mail,Phone,Identity,Image)
    if (!Name || Name === "") setErrName(!ErrName);
    else if (!LastName || LastName === "") setErrLastName(!ErrLastName);
    else if (!Mail || Mail === "") setErrMail(!ErrMail);
    else if (!Phone || Phone === "") setErrPhone(!ErrPhone);
    else if (!Identity || Identity === "") setErrIdentity(!ErrIdentity);
    else {
      //console.log(Name,LastName,Mail,Phone,Identity,Image)
      fetch(import.meta.env.VITE_APIURL + "Doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/Json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name_Doctor: Name,
          lastName_Doctor: LastName,
          email_Doctor: Mail,
          phone_Doctor: Phone,
          identity_Doctor: Identity,
          img_Doctor: LinkImagen ? LinkImagen : Image,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            navigate("/doctors");
            setTimeout(() => {
              Swal.fire({
                title: "Success",
                text: "Do you want to continue?",
                icon: "success",
                confirmButtonText: "OK",
              });
            }, 800);
          } else {
            navigate("/doctors");
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
          navigate("/doctors");
          console.log(err);
          setTimeout(() => {
            Swal.fire({
              title: "Error!",
              icon: "error",
              text: err,
              confirmButtonText: "OK",
            });
          }, 800);
        });
    }
  };

  const onFileChange = async (event) => {
    //setFile(event.target.files[0])
    const clientID = import.meta.env.VITE_CLIENT_ID;

    const file = event.target.files[0];

    //console.log("agregado...")
    const formdata = new FormData();
    //
    formdata.append("image", file);

    await fetch("https://api.imgur.com/3/image/", {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: "Client-ID " + clientID,
        //Accept: "application/json",
      },
      mimeType: "multipart/form-data",
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setLinkImagen(res.data.link);
      })
      .catch((err) => console.log("error: " + err));
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => navigate("/doctors")}
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
              <Button onClick={() => navigate("/doctors")}>{"<"}</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">Add Doctor</Typography>
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
                    onChange={(e) => onFileChange(e)}
                  />
                }
              >
                <Avatar
                  alt="Perfil"
                  src={LinkImagen == null ? "perfil" : LinkImagen}
                  sx={{ width: 156, height: 156 }}
                />
              </Badge>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
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
              xs={4}
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
              sx={{ pb: 2 }}
              xs={4}
            >
              <TextField
                type="text"
                error={ErrPhone}
                helperText={ErrPhone ? "falta Phone" : null}
                placeholder="Phone..."
                label={"Phone"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrPhone(false);
                }}
              />
            </Grid>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{ pb: 2 }}
              xs={4}
            >
              <TextField
                type="text"
                error={ErrIdentity}
                helperText={ErrIdentity ? "falta Identity" : null}
                placeholder="identity..."
                label={"Identity"}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setIdentity(e.target.value);
                  setErrIdentity(false);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => navigate("/doctors")}
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
                  AddDoctors(Name, LastName, Mail, Phone, Identity, Image);
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
export default AddDoctors;
