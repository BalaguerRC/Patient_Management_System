import { Grid } from "@mui/material";
import {Outlet, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
      <Grid container direction={"row"} justifyContent={"space-between"}>
        <aside>
          <Grid container direction={"column"}>
            <button onClick={()=>navigate("/")}>Home</button>
            <button onClick={()=>navigate("users")}>Users</button>
            <button>Doctors</button>
            <button>Lab test</button>
            <button>Patients</button>
            <button>Medical Appointments</button>
            <button>Lab test Results</button>
          </Grid>
        </aside>
        <div>
          <Grid container direction={"column"}>
            test
            <Outlet></Outlet>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default Home;
