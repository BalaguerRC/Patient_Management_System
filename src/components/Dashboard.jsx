import { Avatar, Box, Divider, Grid, Paper, Typography } from "@mui/material";
import PieChart from "./PieChart";
import { useEffect, useState } from "react";
import Top4Patients from "./Top4Patients";
import DashboardAdmin from "./DashboardAdmin";

const doctors = [
  { name: "jose" },
  { name: "maria" },
  { name: "ramires" },
  { name: "garcia" },
];
const Dashboard = () => {
  const [dashboard, setdashboard] = useState({});
  const data = JSON.parse(localStorage.getItem("data_user"));

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
        <DashboardAdmin />

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
                <Grid
                  container
                  direction={"column"}
                  justifyContent={"center"}
                  spacing={1}
                >
                  <Top4Patients />
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
