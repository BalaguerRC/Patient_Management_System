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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditDoctor = () => {
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mail, setMail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Identity, setIdentity] = useState("");
  const [Image, setImage] = useState("");
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(false);

  const [LinkImagen, setLinkImagen] = useState(null);

  /**Errors */

  const [ErrName, setErrName] = useState(false);
  const [ErrLastName, setErrLastName] = useState(false);
  const [ErrMail, setErrMail] = useState(false);
  const [ErrPhone, setErrPhone] = useState(false);
  const [ErrIdentity, setErrIdentity] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token_user");

  const getUser = () => {
    fetch(import.meta.env.VITE_APIURL + "Doctors/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setName(data.data.name_Doctor);
        setLastName(data.data.lastName_Doctor);
        setMail(data.data.email_Doctor);
        setPhone(data.data.phone_Doctor);
        setIdentity(data.data.identity_Doctor);
        setImage(data.data.img_Doctor);
      })
      .catch((err) => {
        navigate("/doctors");
        console.log(err);
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Token Expired",
          confirmButtonText: "OK",
        });
      });
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

  useEffect(() => {
    getUser();
  }, []);

  const Update = (name, lastname, mail, phone, identity, image) => {
    if (!Name || Name === "") setErrName(!ErrName);
    else if (!LastName || LastName === "") setErrLastName(!ErrLastName);
    else if (!Mail || Mail === "") setErrMail(!ErrMail);
    else if (!Phone || Phone === "") setErrPhone(!ErrPhone);
    else if (!Identity || Identity === "") setErrIdentity(!ErrIdentity);
    else {
      console.log(name, lastname, mail, phone, identity, image);
      fetch(import.meta.env.VITE_APIURL + "Doctors/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/Json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name_Doctor: name,
          lastName_Doctor: lastname,
          email_Doctor: mail,
          phone_Doctor: phone,
          identity_Doctor: identity,
          img_Doctor: LinkImagen == null ? image : LinkImagen,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
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
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Token Expired",
            confirmButtonText: "OK",
          });
        });
    }
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
              <Typography variant="h6">Update Doctor: {id}</Typography>
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
                  src={LinkImagen == null ? Image : LinkImagen}
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
                value={LastName}
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
            <Grid item sx={{ pb: 2 }} xs={4}>
              <TextField
                type="text"
                error={ErrMail}
                helperText={ErrMail ? "Type an Email" : null}
                value={Mail}
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
            <Grid item sx={{ pb: 2 }} xs={4}>
              <TextField
                type="text"
                error={ErrPhone}
                helperText={ErrPhone ? "Type a Phone" : null}
                value={Phone}
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
            <Grid item sx={{ pb: 2 }} xs={4}>
              <TextField
                type="text"
                error={ErrIdentity}
                helperText={ErrIdentity ? "Type an Identity" : null}
                value={Identity}
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
                  Update(Name, LastName, Mail, Phone, Identity, Image);
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

export default EditDoctor;
