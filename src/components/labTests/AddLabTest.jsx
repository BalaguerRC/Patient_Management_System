import { LoadingButton } from "@mui/lab";
import {
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

const AddLabTest = () => {
  const [Name, setName] = useState("");
  const [ErrName, setErrName] = useState(false);
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token_user");

  const Post = (name) => {
    if (!Name || Name === "") setErrName(!ErrName);
    else {
      console.log(name);
      fetch(import.meta.env.VITE_APIURL + "LabTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/Json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name_LabTest: name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            navigate("/labTests");
            setTimeout(() => {
              Swal.fire({
                title: "Success",
                text: "Do you want to continue?",
                icon: "success",
                confirmButtonText: "OK",
              });
            }, 800);
          } else {
            navigate("/labTests");
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
          navigate("/labTests");
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

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => navigate("/labTests")}
        maxWidth={"sm"}
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
              <Button onClick={() => navigate("/labTests")}>{"<"}</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">Add Lab Test</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container direction={"column"} justifyContent={"center"}>
            <Grid item sx={{ pb: 2 }}>
              <TextField
                type="text"
                error={ErrName}
                helperText={ErrName ? "Type a name" : null}
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
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => navigate("/labTests")}
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
                  Post(Name);
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

export default AddLabTest;
