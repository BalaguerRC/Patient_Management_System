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
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Info = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <IconButton color="warning" onClick={() => setOpenDialog(true)}>
        <InfoIcon fontSize="medium" />
      </IconButton>
      <Dialog
        open={openDialog}
        maxWidth={"sm"}
        onClose={() => setOpenDialog(!openDialog)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Info</DialogTitle>
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={() => setOpenDialog(!openDialog)}
        >
          <CloseIcon />
        </IconButton>
        <Divider />
        <DialogContent>
          <DialogContentText>
            It is recommended to refrain from deleting a lab test if it was
            recorded in a medical appointment, otherwise, the medical
            appointment will not be displayed or will show an error.
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpenDialog(!openDialog);
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Info;
