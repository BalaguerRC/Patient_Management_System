import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  //const [SecActive, setSecActive] = useState(false);
  const [Name, setName] = useState();
  const [LastName, setLastName] = useState();
  const [Mail, setMail] = useState();
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();
  const [Type, setType] = useState();

  const navigate = useNavigate()

  return (
    <div>
      <Typography>Add new user</Typography>
      <Button onClick={()=>navigate("/users")}>{"<-"}Back</Button>
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
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
        </Grid>
        <Grid container direction={"row"}>
          <Button
            variant="contained"
            fullWidth
            onClick={() =>
              console.log(
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
        </Grid>
      </Paper>
    </div>
  );
};

export default AddUser;
