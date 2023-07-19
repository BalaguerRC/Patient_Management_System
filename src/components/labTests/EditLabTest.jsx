import { Button, FormControl, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditLabTest = () => {
  const [Name, setName] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  const Edit = (name) => {
    console.log(name);
  };

  const getLabTest=()=>{
    fetch(import.meta.env.VITE_APIURL + "LabTest/"+id).then(resp=>resp.json()).then(data=>setName(data.data.name_LabTest))
  }

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
        <form>
          <FormControl>
            <TextField placeholder="name" value={Name} onChange={(e) => setName(e.target.value)}/>
            <Button onClick={() => Edit(Name)}>Save</Button>
          </FormControl>
        </form>
      </Grid>
    </div>
  );
};

export default EditLabTest;
