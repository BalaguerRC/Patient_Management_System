import { Divider, Grid, Paper, Typography } from "@mui/material";
import PieChart from "./PieChart";
import Top4Patients from "./Top4Patients";
import DashboardAdmin from "./Dashboards/DashboardAdmin";
import DashboardDoctor from "./Dashboards/DashboardDoctor";

const doctors = [
  { name: "jose" },
  { name: "maria" },
  { name: "ramires" },
  { name: "garcia" },
];
const Dashboard = () => {
  const data = JSON.parse(localStorage.getItem("data_user"));

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
        {data?.type === 1 ? <DashboardAdmin /> : <DashboardDoctor />}

        <Grid item>
          <Grid container direction={"row"} spacing={2}>
            <Grid item xs={8}>
              <Typography variant="subtitle1" gutterBottom>
                {"> "}Medical Appointments
              </Typography>
              <Paper sx={{p:1}}>
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
