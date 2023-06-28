import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate= useNavigate();

  const SingUp = (e) => {
    e.preventDefault();
    fetch(import.meta.env.VITE_APIURL + "Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("data_user", JSON.stringify(data.data));
          localStorage.setItem("token_user", data.token);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper className="containerApp2">
      <form onSubmit={(e) => SingUp(e)}>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            type="text"
            placeholder="Username..."
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sing Up</Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default Login;
