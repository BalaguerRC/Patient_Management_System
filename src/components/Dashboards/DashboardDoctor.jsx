import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const DashboardDoctor = () => {
  const [dashboard2, setdashboard2] = useState({});

  const GetDashboardDoctor = () => {
    fetch(import.meta.env.VITE_APIURL + "Dashboards/dashboardDoctor")
      .then((resp) => resp.json())
      .then((data) => {
        setdashboard2(data.data);
        console.log(data.data);
      });
  };

  useEffect(() => {
    GetDashboardDoctor();
  }, []);

  return (
    <Grid item>
      <Typography variant="subtitle1" gutterBottom>
        {"> "}Doctors Board
      </Typography>
      <Grid container direction={"row"} alignContent={"center"} spacing={2}>
        <Grid item xs>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="button" gutterBottom>
              Patients
            </Typography>
            <Typography variant="caption" gutterBottom>
              Amount: {dashboard2[0]?.patients}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="button" gutterBottom>
              Medical Appointments
            </Typography>
            <Typography variant="caption" gutterBottom>
              Amount: {dashboard2[0]?.medicalAppointmests}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="button" gutterBottom>
              Lab Test Results
            </Typography>
            <Typography variant="caption" gutterBottom>
              Amount: {dashboard2[0]?.lab_Tests_Results}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardDoctor;
