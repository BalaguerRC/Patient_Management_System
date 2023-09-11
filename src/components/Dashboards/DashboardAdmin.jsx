import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import HailIcon from "@mui/icons-material/Hail";
import BiotechIcon from "@mui/icons-material/Biotech";

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
  const data = [
    {
      id: 1,
      name: "Users",
      amount: dashboard[0]?.users,
    },
    { id: 2, name: "Doctors", amount: dashboard[0]?.doctors },
    { id: 3, name: "LabTest", amount: dashboard[0]?.lab_Tests },
  ];

  useEffect(() => {
    GetDashboardAdmin();
  }, []);

  return (
    <Grid item>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight:600}}>
        {"> "}Administration Board
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
                  <Typography variant="h6" gutterBottom sx={{ fontWeight:600}}>
                    {data.name}
                  </Typography>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight:700}}>
                    {data.amount}
                  </Typography>
                </Box>
                <Box>
                  {data.id === 1 ? (
                    <PersonIcon
                      sx={{
                        display: "grid",
                        fontSize: 100,
                      }}
                    />
                  ) : data.id === 2 ? (
                    <HailIcon
                      sx={{
                        display: "grid",
                        fontSize: 100,
                      }}
                    />
                  ) : (
                    <BiotechIcon
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

export default DashboardAdmin;
