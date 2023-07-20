import { Button, FormControl, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditLabTest = () => {
  const [Name, setName] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  const Edit = (name) => {
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
        console.log(data)
        navigate("/labTests")
      });
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
  );
};

export default EditLabTest;
