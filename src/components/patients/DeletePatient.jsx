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
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";

const DeletePatient = ({ id, name, lastname, token }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [time, setTime] = useState(false);
  const navigate = useNavigate();

  const deletePatient = (id) => {
    setOpenDialog(!openDialog);
    console.log(id);
    fetch(import.meta.env.VITE_APIURL + "Patients/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/patients");
          setOpenDialog(!openDialog);
        } else console.log(data);
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
            Are you sure to delete {name} {lastname}?
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
                    deletePatient(id);
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

export default DeletePatient;
