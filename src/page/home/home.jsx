import { Grid } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
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
              <button onClick={() => navigate("/")}>Home</button>
            </li>
            <li>
              <button onClick={() => navigate("users")}>Users</button>
            </li>
            <li>
              <button onClick={() => navigate("doctors")}>Doctors</button>
            </li>
            <li>
              <button onClick={() => navigate("labTests")}>Lab Tests</button>
            </li>
            <li>
              <button onClick={() => navigate("patients")}>Patients</button>
            </li>
            <li>
              <button onClick={() => navigate("medicalAppointments")}>
                Medical Appointments
              </button>
            </li>
            <li>
              <button onClick={() => navigate("labTestResults")}>
                Lab test Results
              </button>
            </li>
            <li>
              <button>Log out</button>
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
    </div>
  );
};

export default Home;
