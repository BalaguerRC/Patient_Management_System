import {
  Button,
  Divider,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLabTest = () => {
  const [Name, setName] = useState("");
  const [ErrName, setErrName] = useState(false);

  const navigate = useNavigate();

  const Post = (name) => {
    if (!Name || Name === "") setErrName(!ErrName);
    else {
      console.log(name);
      fetch(import.meta.env.VITE_APIURL + "LabTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/Json",
          //Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name_LabTest: name,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) navigate("/labTests");
          else {
            console.log(data);
          }
        });
    }
  };

  return (
    <div>
      <Grid item>
        <Paper>
          <Grid
            container
            direction={"row"}
            justifyContent={"left"}
            alignItems={"center"}
            sx={{ p: 1 }}
          >
            <Grid item>
              <Button onClick={() => navigate("/labTests")}>{"<"}</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">Add Lab Test</Typography>
            </Grid>
          </Grid>
          <Divider />

          <Grid container direction={"column"} justifyContent={"center"} p={2}>
            <Grid
              item
              //sx={{ display: "flex", justifyContent: "space-between", pb: 4 }}
              sx={{ pb: 2 }}
            >
              <TextField
                type="text"
                /*error*/
                error={ErrName}
                helperText={ErrName ? "falta name" : null}
                placeholder="name..."
                label={"Name"}
                variant="standard"
                fullWidth
                required
                onChange={(e) => {
                  setName(e.target.value);
                  setErrName(false);
                }}
              />
            </Grid>
          </Grid>
          <Divider />
          <Grid
            container
            direction={"row"}
            justifyContent={"right"}
            sx={{ p: 2 }}
          >
            <Grid item>
              <Button variant="contained" type="submit" disabled sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                type="submit"
                onClick={() => Post(Name)}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

{
  /**
  <div>
      AddLabTest
      <Button onClick={() => navigate("/labTests")}>Back</Button>
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form>
          <FormControl>
            <TextField
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={() => Post(Name)}>Save</Button>
          </FormControl>
        </form>
      </Grid>
    </div>
   */
}

export default AddLabTest;
