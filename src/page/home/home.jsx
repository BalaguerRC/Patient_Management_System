import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
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

const Home = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("data_user"));
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
            <Typography variant="h6" noWrap component="div">
              Welcome, User!
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: "#1976d2",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("users")}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={"Users"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("doctors")}>
                <ListItemIcon>
                  <HailIcon />
                </ListItemIcon>
                <ListItemText primary={"Doctors"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("labTests")}>
                <ListItemIcon>
                  <BiotechIcon />
                </ListItemIcon>
                <ListItemText primary={"Lab Tests"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("patients")}>
                <ListItemIcon>
                  <AccessibilityIcon />
                </ListItemIcon>
                <ListItemText primary={"Patients"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("medicalAppointments")}>
                <ListItemIcon>
                  <MedicationIcon />
                </ListItemIcon>
                <ListItemText primary={"Medical Appointments"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("labTestResults")}>
                <ListItemIcon>
                  <VaccinesIcon />
                </ListItemIcon>
                <ListItemText primary={"Lab Test Results"} />
              </ListItemButton>
            </ListItem>
            <form>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ background: "#B8022E" }}
                  onClick={() => {
                    localStorage.removeItem("token_user");
                    localStorage.removeItem("data_user");
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Log Out"} />
                </ListItemButton>
              </ListItem>
            </form>
          </List>
        </Drawer>
        <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>

      {/*data.type === 1 ? (
        <Grid container direction={"row"} sx={{ position: "relative" }}>
          <nav
            style={{
              position: "fixed",
              width: 200,
              height: "100%",
              background: "#4b4276",
              padding: "30px 0",
              textAlign: "center",
            }}
          >
            <ul className="ulFromNav">
              <li>
                <Button variant="contained" onClick={() => navigate("/")}>
                  Home
                </Button>
              </li>
              <li>
                <Button variant="contained" onClick={() => navigate("users")}>
                  Users
                </Button>
              </li>
              <li>
                <Button variant="contained" onClick={() => navigate("doctors")}>
                  Doctors
                </Button>
              </li>
              <li>
                <Button
                  variant="contained"
                  onClick={() => navigate("labTests")}
                >
                  Lab Tests
                </Button>
              </li>
              <li>
                <form>
                  <Button
                    variant="contained"
                    sx={{ background: "red", ":hover": { background: "none" } }}
                    type="submit"
                    onClick={() => {
                      localStorage.removeItem("token_user");
                      localStorage.removeItem("data_user");
                    }}
                  >
                    Log out
                  </Button>
                </form>
              </li>
            </ul>
          </nav>

          <div style={{ width: "100%", marginLeft: 200 }}>
            <div
              style={{
                background: "#343D54",
                width: "100%",
                color: "white",
                padding: 20,
              }}
            >
              Welcome, User!
            </div>
            <Grid container direction={"row"} sx={{ margin: 2 }}>
              <Outlet></Outlet>
            </Grid>
          </div>
        </Grid>
      ) : (
        <Grid container direction={"row"} sx={{ position: "relative" }}>
          <nav
            style={{
              position: "fixed",
              width: 200,
              height: "100%",
              background: "#4b4276",
              padding: "30px 0",
              textAlign: "center",
            }}
          >
            <ul className="ulFromNav">
              <li>
                <Button variant="contained" onClick={() => navigate("/")}>
                  Home
                </Button>
              </li>
              <li>
                <Button
                  variant="contained"
                  onClick={() => navigate("patients")}
                >
                  Patients
                </Button>
              </li>
              <li>
                <Button
                  variant="contained"
                  onClick={() => navigate("medicalAppointments")}
                >
                  Medical Appointments
                </Button>
              </li>
              <li>
                <Button
                  variant="contained"
                  onClick={() => navigate("labTestResults")}
                >
                  Lab test Results
                </Button>
              </li>
              <li>
                <form>
                  <Button
                    variant="contained"
                    sx={{ background: "red", ":hover": { background: "none" } }}
                    type="submit"
                    onClick={() => {
                      localStorage.removeItem("token_user");
                      localStorage.removeItem("data_user");
                    }}
                  >
                    Log out
                  </Button>
                </form>
              </li>
            </ul>
          </nav>

          <div style={{ width: "100%", marginLeft: 200 }}>
            <div
              style={{
                background: "#343D54",
                width: "100%",
                color: "white",
                padding: 20,
              }}
            >
              Welcome, User!
            </div>
            <Grid container direction={"row"} sx={{ margin: 2 }}>
              <Outlet></Outlet>
            </Grid>
          </div>
        </Grid>
      )*/}
    </div>
  );
};

export default Home;
