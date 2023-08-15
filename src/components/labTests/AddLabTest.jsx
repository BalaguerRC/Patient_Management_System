import { Button, FormControl, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLabTest = () => {
  const [Name, setName] = useState("");

  const navigate = useNavigate();

  const Post = (name) => {
    console.log(name);

    fetch(import.meta.env.VITE_APIURL + "LabTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
        //Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name_LabTest: name
      })
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
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
  );
};

export default AddLabTest;
