import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";

export const DialogComponent = ({ id, name, lastname, token }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [time, setTime] = useState(false);

  const deleteUser = (id) => {
    //setOpenDialog(!openDialog);
    fetch(import.meta.env.VITE_APIURL + "Users/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/users");
          setOpenDialog(!openDialog);
          Swal.fire({
            title: "Success",
            text: "Do you want to continue?",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          navigate("/users");
          setOpenDialog(!openDialog);
          console.log(data);
          Swal.fire({
            title: "Error!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((err) => {
        navigate("/users");
        setOpenDialog(!openDialog);
        console.log(err);
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Token Expired",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div>
      <IconButton onClick={() => setOpenDialog(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(!openDialog)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          Delete {id} - {name} {lastname}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this user?
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <form onChange={(e) => e.preventDefault()}>
            <Button onClick={() => setOpenDialog(!openDialog)}>Disagree</Button>
            {time ? (
              <LoadingButton loading variant="outlined">
                Agree
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  setTime(!time);
                  setTimeout(() => {
                    setTime(time);
                    deleteUser(id);
                  }, 1000);
                }}
              >
                Agree
              </Button>
            )}
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
};
