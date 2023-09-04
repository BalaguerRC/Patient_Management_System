import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import PieChart from "./PieChart";
import { useEffect, useState } from "react";

const doctors = [
  { name: "jose" },
  { name: "maria" },
  { name: "ramires" },
  { name: "garcia" },
];
const Dashboard = () => {
  const [dashboard, setdashboard] = useState({});
  const GetDashboard = () => {
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointments/dashboard")
      .then((resp) => resp.json())
      .then((data) => {
        setdashboard(data.data);
        localStorage.setItem("dashboard", JSON.stringify(data.data));
      });
  };
  useEffect(() => {
    GetDashboard();
  }, [dashboard]);

  return (
    <div>
      <Grid container direction={"column"} spacing={2}>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Patient Management System
          </Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
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
                  Amount: 0
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography variant="button" gutterBottom>
                  Doctors
                </Typography>
                <Typography variant="caption" gutterBottom>
                  Amount: 0
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography variant="button" gutterBottom>
                  LabTest
                </Typography>
                <Typography variant="caption" gutterBottom>
                  Amount: 0
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {/*<Grid item>
          <Typography variant="subtitle1" gutterBottom>
            {"> "}Doctors Board
          </Typography>
          <Grid container direction={"row"} alignContent={"center"} spacing={2}>
            <Grid item xs>
              <Paper sx={{ p: 2 }}>xs=8</Paper>
            </Grid>
            <Grid item xs>
              <Paper sx={{ p: 2 }}>xs=8</Paper>
            </Grid>
            <Grid item xs>
              <Paper sx={{ p: 2 }}>xs=8</Paper>
            </Grid>
          </Grid>
        </Grid>*/}
        <Grid item>
          <Grid container direction={"row"} spacing={2}>
            <Grid item xs={8}>
              <Typography variant="subtitle1" gutterBottom>
                {"> "}Medical Appointments
              </Typography>
              <Paper>
                <PieChart />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" gutterBottom>
                {"> "}Patients
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  New Patients
                </Typography>
                <Grid container direction={"column"} spacing={1}>
                  {doctors.map((data, index) => (
                    <Grid item key={index}>
                      <Paper sx={{ p: 1 }}>
                        <Typography>{data.name}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
