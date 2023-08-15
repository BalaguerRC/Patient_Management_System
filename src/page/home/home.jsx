import { Button, Grid } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("data_user"));
  return (
    <div>
      {data.type === 1 ? (
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
          {/**content */}

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
          {/**content */}

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
      )}
    </div>
  );
};

export default Home;
