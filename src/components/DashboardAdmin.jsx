import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const DashboardAdmin = () => {
  const data = JSON.parse(localStorage.getItem("data_user"));

  const [dashboard, setdashboard] = useState({});
  const [dashboard2, setdashboard2] = useState({});

  const GetDashboardAdmin = () => {
    fetch(import.meta.env.VITE_APIURL + "Dashboards/dashboardAdmin")
      .then((resp) => resp.json())
      .then((data) => {
        setdashboard(data.data);
      });
  };
  const GetDashboardDoctor = () => {
    fetch(import.meta.env.VITE_APIURL + "Dashboards/dashboardDoctor")
      .then((resp) => resp.json())
      .then((data) => {
        setdashboard2(data.data);
        console.log(data.data);
      });
  };

  useEffect(() => {
    if (data?.type === 1) GetDashboardAdmin();
    else GetDashboardDoctor();
  }, []);
  return (
    <>
      {data?.type === 1 ? (
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
      ) : (
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
      )}
    </>
  );
};

export default DashboardAdmin;
