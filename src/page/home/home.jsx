import {
  AppBar,
  Avatar,
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
              boxSizing: "border-box"
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
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </ListItem>
            {data.type === 1 ? (
              <>
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
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => navigate("patients")}>
                    <ListItemIcon>
                      <AccessibilityIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Patients"} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate("medicalAppointments")}
                  >
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
              </>
            )}

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
        <Box sx={{ flexGrow: 1, bgcolor: "background.default", p: 3}}>
          <Toolbar />
          <Outlet/>
        </Box>
      </Box>
      
    </div>
  );
};

export default Home;
