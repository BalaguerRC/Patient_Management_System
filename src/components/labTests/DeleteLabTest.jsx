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
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import InfoIcon from "@mui/icons-material/Info";

const DeleteLabTest = ({ id, name, token }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [time, setTime] = useState(false);

  const navigate = useNavigate();

  const Delete = (id) => {
    console.log("Delete", id);

    fetch(import.meta.env.VITE_APIURL + "LabTest/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/labTests");
          setOpenDialog(!openDialog);
          Swal.fire({
            title: "Success",
            text: "Do you want to continue?",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
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
        <DialogTitle>Delete - {id}</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            Before deleting, look at the information in the <InfoIcon fontSize="small" color="warning"/> button. <br/>
            Are you sure to delete {name}?
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
                    Delete(id);
                  }, 1000);
                }}
                autoFocus
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

export default DeleteLabTest;
