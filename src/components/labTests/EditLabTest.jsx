import {
  Button,
  Divider,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditLabTest = () => {
  const [Name, setName] = useState("");
  const [ErrName, setErrName] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const Edit = (name) => {
    if (!Name || Name === "") setErrName(!ErrName);
    else {
      console.log(name);
      fetch(import.meta.env.VITE_APIURL + "LabTest/" + id, {
        method: "PUT",
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

  const getLabTest = () => {
    fetch(import.meta.env.VITE_APIURL + "LabTest/" + id)
      .then((resp) => resp.json())
      .then((data) => setName(data.data.name_LabTest));
  };

  useEffect(() => {
    getLabTest();
  }, []);

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
              <Typography variant="h6">Update Lab Test: {id}</Typography>
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
                value={Name}
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
                onClick={() => Edit(Name)}
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
      EditLabTest {id}
      <Button onClick={() => navigate("/labTests")}>Back</Button>
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form onSubmit={(e)=>{
          e.preventDefault();
          Edit(Name);
        }}>
          <FormControl>
            <TextField
              placeholder="name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit">Save</Button>
          </FormControl>
        </form>
      </Grid>
    </div>
   */
}

export default EditLabTest;
