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

const DeleteLabTest = ({ id, name, token }) => {
  const [openDialog, setOpenDialog] = useState(false);
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
          <DialogContentText>Are you sure to delete {name}?</DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <form onChange={(e) => e.preventDefault()}>
            <Button onClick={() => setOpenDialog(!openDialog)}>Disagree</Button>
            <Button
              variant="contained"
              onClick={() =>
                setTimeout(() => {
                  Delete(id);
                }, 2000)
              }
              autoFocus
            >
              Agree
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteLabTest;
