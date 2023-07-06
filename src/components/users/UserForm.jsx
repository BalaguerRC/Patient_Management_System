import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

const UserForm = ({ Active }) => {
  const [SecActive, setSecActive] = useState(false);
  const [Name, setName] = useState();
  const [LastName, setLastName] = useState();
  const [Mail, setMail] = useState();
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();
  const [Type, setType] = useState();

  
  const AddUser = (
    Name,
    LastName,
    Mail,
    Username,
    Password,
    ConfirmPassword,
    Type
  ) => {
    if (ConfirmPassword === Password) {
      fetch(import.meta.env.VITE_APIURL + "Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/Json",
        },
        body: JSON.stringify({
          name_User: Name,
          lastName_User: LastName,
          email_User: Mail,
          userName: Username,
          password_User: ConfirmPassword,
          type_User: Type,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      console.log("la contrase;a no es igual");
    }
  };
  console.log(Active)

  return (
    <Dialog onClose={()=>setSecActive(!SecActive)} open={!SecActive?Active:!Active}>
      <DialogTitle>Add new User</DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          placeholder="name..."
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="lastname..."
          fullWidth
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="mail..."
          fullWidth
          onChange={(e) => setMail(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="username..."
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="password..."
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          type="password"
          placeholder="confirm password..."
          fullWidth
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Type"
            value={Type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>Doctor</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          fullWidth
          onClick={() =>
            AddUser(
              Name,
              LastName,
              Mail,
              Username,
              Password,
              ConfirmPassword,
              Type
            )
          }
        >
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={() => setSecActive(!SecActive)}
          fullWidth
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserForm.propTypes = {
  Active: PropTypes.bool.isRequired,
};

export default UserForm;

