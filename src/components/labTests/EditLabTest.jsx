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
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditLabTest = () => {
  const [Name, setName] = useState("");
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(false);

  const [ErrName, setErrName] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token_user");

  const Edit = (name) => {
    if (!Name || Name === "") setErrName(!ErrName);
    else {
      console.log(name);
      fetch(import.meta.env.VITE_APIURL + "LabTest/" + id, {
        method: "PUT",
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
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Token Expired",
            confirmButtonText: "OK",
          });
        });
    }
  };

  const getLabTest = () => {
    fetch(import.meta.env.VITE_APIURL + "LabTest/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setName(data.data.name_LabTest))
      .catch((err) => {
        navigate("/labTests");
        console.log(err);
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Token Expired",
          confirmButtonText: "OK",
        });
      });
  };

  useEffect(() => {
    getLabTest();
  }, []);

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
              <Typography variant="h6">Update Lab Test: {id}</Typography>
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
                helperText={ErrName ? "falta name" : null}
                placeholder="name..."
                label={"Name"}
                value={Name}
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
                  Edit(Name);
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

export default EditLabTest;
