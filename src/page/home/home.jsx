import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import HailIcon from "@mui/icons-material/Hail";
import BiotechIcon from "@mui/icons-material/Biotech";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import MedicationIcon from "@mui/icons-material/Medication";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Swal from "sweetalert2";

const Home = () => {
  const [loading, setloading] = useState(true);
  //const [loading2, setloading2] = useState(true);
  const [open, setopen] = useState(false);
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("data_user"));
  const GetDashboard = () => {
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointmentGraph")
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem("dashboard", JSON.stringify(data.data));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: err,
          confirmButtonText: "OK",
        });
      });
  };
  const theme = localStorage.getItem("theme");

  useEffect(() => {
    GetDashboard();
    setTimeout(() => {
      setloading(!loading);
    }, 500);
  }, []);

  const drawerWidth = 195;
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          <Toolbar>
            <Grid container direction={"row"} justifyContent={"space-between"}>
              <Grid item>
                <Typography variant="h6" noWrap component="div">
                  Welcome, User!
                </Typography>
              </Grid>

              <Grid item>
                <form>
                  {theme == 1 ? (
                    <IconButton
                      type="submit"
                      onClick={() => localStorage.setItem("theme", 0)}
                    >
                      <DarkModeIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      type="submit"
                      onClick={() => localStorage.setItem("theme", 1)}
                    >
                      <LightModeIcon />
                    </IconButton>
                  )}
                </form>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ pt: 2 }}
          >
            <Grid item>
              <Avatar alt={data.name} src="a" />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {data.name} {data.lastName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">{data.email}</Typography>
            </Grid>
          </Grid>
          <Divider>
            <Typography variant="caption">Overview</Typography>
          </Divider>
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <List>
              <ListItem
                disablePadding
                sx={{
                  ":hover": {
                    borderRight: 5,
                    borderColor: "blue",
                    borderRadius: 0.8,
                  },
                }}
              >
                <ListItemButton
                  onClick={() => {
                    setloading(!loading);
                    navigate("/");
                    setTimeout(() => {
                      setloading(loading);
                    }, 500);
                  }}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
              {data.type === 1 ? (
                <>
                  <ListItem
                    disablePadding
                    sx={{
                      ":hover": {
                        borderRight: 5,
                        borderColor: "blue",
                        borderRadius: 0.8,
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        setloading(!loading);
                        navigate("users");
                        setTimeout(() => {
                          setloading(loading);
                        }, 400);
                      }}
                    >
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Users"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    disablePadding
                    sx={{
                      ":hover": {
                        borderRight: 5,
                        borderColor: "blue",
                        borderRadius: 0.8,
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        setloading(!loading);
                        navigate("doctors");
                        setTimeout(() => {
                          setloading(loading);
                        }, 400);
                      }}
                    >
                      <ListItemIcon>
                        <HailIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Doctors"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    disablePadding
                    sx={{
                      ":hover": {
                        borderRight: 5,
                        borderColor: "blue",
                        borderRadius: 0.8,
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        setloading(!loading);
                        navigate("labTests");
                        setTimeout(() => {
                          setloading(loading);
                        }, 400);
                      }}
                    >
                      <ListItemIcon>
                        <BiotechIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Lab Tests"} />
                    </ListItemButton>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem
                    disablePadding
                    sx={{
                      ":hover": {
                        borderRight: 5,
                        borderColor: "blue",
                        borderRadius: 0.8,
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        setloading(!loading);
                        navigate("patients");
                        setTimeout(() => {
                          setloading(loading);
                        }, 400);
                      }}
                    >
                      <ListItemIcon>
                        <AccessibilityIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Patients"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    disablePadding
                    sx={{
                      ":hover": {
                        borderRight: 5,
                        borderColor: "blue",
                        borderRadius: 0.8,
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        setloading(!loading);
                        navigate("medicalAppointments");
                        setTimeout(() => {
                          setloading(loading);
                        }, 400);
                      }}
                    >
                      <ListItemIcon>
                        <MedicationIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Medical Appointments"} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    disablePadding
                    sx={{
                      ":hover": {
                        borderRight: 5,
                        borderColor: "blue",
                        borderRadius: 0.8,
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={() => {
                        setloading(!loading);
                        navigate("labTestResults");
                        setTimeout(() => {
                          setloading(loading);
                        }, 400);
                      }}
                    >
                      <ListItemIcon>
                        <VaccinesIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Lab Test Results"} />
                    </ListItemButton>
                  </ListItem>
                </>
              )}
              <List>
                <Divider />
              </List>
            </List>
            <List>
              <ListItem
                disablePadding
                sx={{
                  background: "#B8022E",
                  color: "white",
                  ":hover": {
                    color: "black",
                    background: "#E96282",
                    borderRight: 5,
                    borderColor: "#B8022E",
                    borderRadius: 0.8,
                  },
                }}
              >
                <ListItemButton
                  onClick={() => {
                    setopen(!open);
                    setTimeout(() => {
                      setopen(open);
                      localStorage.removeItem("token_user");
                      localStorage.removeItem("data_user");
                      navigate("/login");
                    }, 1000);
                  }}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Log Out"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Toolbar />
          {loading ? (
            <Box
              /*container
              direction={"columns"}
              justifyContent={"center"}
              alignContent={"center"}*/
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <LinearProgress
                sx={{ marginTop: "40vh", ml: "20vh", mr: "20vh" }}
              />
            </Box>
          ) : (
            <Outlet />
          )}
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Home;
