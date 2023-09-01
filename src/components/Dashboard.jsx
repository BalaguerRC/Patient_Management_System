import { Divider, Grid, Paper, Typography } from "@mui/material";
import PieChart from "./PieChart";

const Dashboard = () => {
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
                {"> "}Doctors
              </Typography>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  New Doctors
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
