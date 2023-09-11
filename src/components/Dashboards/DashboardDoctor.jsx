import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import MedicationIcon from "@mui/icons-material/Medication";
import VaccinesIcon from "@mui/icons-material/Vaccines";

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
  const data = [
    {
      id: 1,
      name: "Patients",
      amount: dashboard2[0]?.patients,
    },
    {
      id: 2,
      name: "Medical Appointments",
      amount: dashboard2[0]?.medicalAppointmests,
    },
    {
      id: 3,
      name: "Lab Test Results",
      amount: dashboard2[0]?.lab_Tests_Results,
    },
  ];

  useEffect(() => {
    GetDashboardDoctor();
  }, []);

  return (
    <Grid item>
      <Typography variant="subtitle1" gutterBottom>
        {"> "}Doctors Board
      </Typography>
      <Grid container direction={"row"} alignContent={"center"} spacing={2}>
        {data.map((data, index) => (
          <Grid item xs key={index}>
            <Paper sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {data.name}
                  </Typography>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    {data.amount}
                  </Typography>
                </Box>
                <Box>
                  {data.id === 1 ? (
                    <AccessibilityIcon
                      sx={{
                        display: "grid",
                        fontSize: 100
                      }}
                    />
                  ) : data.id === 2 ? (
                    <MedicationIcon
                      sx={{
                        display: "grid",
                        fontSize: 100,
                      }}
                    />
                  ) : (
                    <VaccinesIcon
                      sx={{
                        display: "grid",
                        fontSize: 100,
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

{
  /**
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
   */
}
export default DashboardDoctor;
