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
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  //const [SecActive, setSecActive] = useState(false);
  const [Name, setName] = useState();
  const [LastName, setLastName] = useState();
  const [Mail, setMail] = useState();
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();
  const [Type, setType] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem("token_user");

  const { id } = useParams();

  const getUserById = () => {
    fetch(import.meta.env.VITE_APIURL + "Users/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.data.name_User);
        setLastName(data.data.lastName_User);
        setMail(data.data.email_User);
        setUsername(data.data.userName);
        setType(data.data.type_User);
      })
      .catch((err) => console.log(err));
  };

  const Post = (
    name,
    lastname,
    mail,
    username,
    password,
    confirmpass,
    type
  ) => {
    if (confirmpass == password) {
      fetch(import.meta.env.VITE_APIURL + "Users/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/Json",
        },
        body: JSON.stringify({
          name_User: name,
          lastName_User: lastname,
          email_User: mail,
          userName: username,
          password_User: confirmpass,
          type_User: type,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success ? navigate("/users") : console.log(data);
        });

      //console.log(name,lastname,mail,username,password,confirmpass,type)
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <div>
      <Typography>Edit user {id}</Typography>
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
            placeholder="name..."
            fullWidth
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="text"
            placeholder="lastname..."
            fullWidth
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            type="text"
            placeholder="mail..."
            fullWidth
            value={Mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <TextField
            type="text"
            placeholder="username..."
            fullWidth
            value={Username}
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
            type="submit"
            onClick={() =>
              Post(
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

{
  /**/
}
export default EditUser;
