import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
        } else {
          //console.log(data)
          setError(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error");
      });
  };

  return (
    <div>
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item sm={4} sx={{ display: { xs: "none", md: " grid" } }}>
          <Paper className="containerApp2" sx={{ background: "blue" }}></Paper>
        </Grid>
        <Grid item xs={0.4} sx={{ display: { xs: "grid", md: " none" } }}>
          <Paper className="containerApp2" sx={{ background: "blue" }}></Paper>
        </Grid>
        <Grid item xs sm>
          <Box sx={{ p: 5 }}>
            <form onSubmit={(e) => SingUp(e)}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item sx={{ textAlign: "center", pb: 5 }}>
                  <LockIcon />
                  <Typography variant="h5" gutterBottom>
                    Sign in
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    to PMS
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    type="text"
                    label="Username"
                    required
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setError(null);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="password"
                    label="Password"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                    fullWidth
                  />
                </Grid>
                {error != null ? (
                  <Grid item sx={{ textAlign: "center" }}>
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {error}
                    </Typography>
                  </Grid>
                ) : null}
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={"Remember me"}
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" fullWidth>
                    Sing Up
                  </Button>
                </Grid>
                <Grid item>
                  <Link>Forgot my password</Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
