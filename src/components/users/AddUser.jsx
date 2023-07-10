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
import { useEffect, useState } from "react";
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
  const [Err, setErr] = useState();
  const [Err2, setErr2] = useState({name:''});
/**,lastname:'',mail:'',username:'' */
  const token = localStorage.getItem("token_user");

  const navigate = useNavigate();

  const AddUser = (
    Name,
    LastName,
    Mail,
    Username,
    Password,
    ConfirmPassword,
    Type
  ) => {
    if(!Name) setErr2({name: 'no hay name'})
    if (ConfirmPassword === Password) {
      fetch(import.meta.env.VITE_APIURL + "Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/Json",
          Authorization: "Bearer " + token,
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
          console.log(data.errors);
          //setErr2(data.errors)

          if(data.success) navigate("/users")

          if(data.message) setErr(data.message)
        }).catch(err=>console.log("Error",err));
    } else {
      console.log("la contrase;a no es igual");
    }
  };


  return (
    <div>
      <Typography>Add new user</Typography>
      <Button onClick={()=>console.log(Err2.Name_User)}>error</Button>
      <Button onClick={() => navigate("/users")}>{"<-"}Back</Button>
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
        
          <TextField
            type="text"
            /*error*/
            error={Err2.name ? true: false}
            helperText={Err2.name}
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
          <Typography variant="caption">{Err}</Typography>
        </Grid>
        <Grid container direction={"row"}>
          <Button
            variant="contained"
            fullWidth
            type="submit"
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
        </Grid>
      </Paper>
    </div>
  );
};

export default AddUser;
