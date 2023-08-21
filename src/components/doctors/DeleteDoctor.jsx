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
  
  export const DeleteDoctor = ({ id, name, lastname, token }) => {
    
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
  
    const deleteUser = (id) => {
        console.log(id)
      setOpenDialog(!openDialog);
      /*fetch(import.meta.env.VITE_APIURL + "Users/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            navigate("/doctors");
            setOpenDialog(!openDialog);
          } else {
            console.log(data);
          }
        });*/
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
            Delete - {id}
          </DialogTitle>
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
              <Button
                variant="contained"
                onClick={() =>
                  setTimeout(() => {
                    deleteUser(id);
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