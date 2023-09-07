import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const DashboardAdmin = () => {
  //const data = JSON.parse(localStorage.getItem("data_user"));

  const [dashboard, setdashboard] = useState({});

  const GetDashboardAdmin = () => {
    fetch(import.meta.env.VITE_APIURL + "Dashboards/dashboardAdmin")
      .then((resp) => resp.json())
      .then((data) => {
        setdashboard(data.data);
      });
  };

  useEffect(() => {
    GetDashboardAdmin();
  }, []);

  return (
    <Grid item>
      <Typography variant="subtitle1" gutterBottom>
        {"> "}Administration Board
      </Typography>
      <Grid container direction={"row"} alignContent={"center"} spacing={2}>
        <Grid item xs>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="button" gutterBottom>
              Users
            </Typography>
            <Typography variant="caption" gutterBottom>
              Amount: {dashboard[0]?.users}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="button" gutterBottom>
              Doctors
            </Typography>
            <Typography variant="caption" gutterBottom>
              Amount: {dashboard[0]?.doctors}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="button" gutterBottom>
              LabTest
            </Typography>
            <Typography variant="caption" gutterBottom>
              Amount: {dashboard[0]?.lab_Tests}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardAdmin;
