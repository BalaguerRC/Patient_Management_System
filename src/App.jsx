import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Notfound from "./page/error/notFound";
import Home from "./page/home/home";
import Users from "./page/maintenances/users/users";
import Doctors from "./page/maintenances/doctors";
import LabTest from "./page/maintenances/labTest";
import Patients from "./page/maintenances/patients";
import MedicalAppointments from "./page/maintenances/medicalAppointments";
import LabTestResults from "./page/maintenances/labTestResults";
import Login from "./page/auth/login";
import { AuthLayout, Logged } from "./components/AuthLayout";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import AddDoctors from "./components/doctors/AddDoctors";
import EditDoctor from "./components/doctors/EditDoctor";
import AddLabTest from "./components/labTests/AddLabTest";
import EditLabTest from "./components/labTests/EditLabTest";
import AddPatients from "./components/patients/AddPatients";
import EditPatients from "./components/patients/EditPatients";
import AddMA from "./components/medical appointments/addMA";
import PendingConsultation from "./components/medical appointments/PendingConsultation";
import PendingResults from "./components/medical appointments/PendingResults";
import Results from "./components/medical appointments/Results";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./components/Dashboard";
import "@fontsource/roboto/400.css";
/*import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';*/

//localStorage.setItem("theme", 1);
const theme = localStorage.getItem("theme");
if (!theme) localStorage.setItem("theme", 1);
const darkTheme = createTheme({
  palette: {
    mode: theme == 1 ? "light" : "dark",
  },
  
});

function App() {
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "users",
              children: [
                {
                  index: true,
                  element: <Users />,
                },
                {
                  path: "addUser",
                  element: <AddUser />,
                },
                {
                  path: ":id",
                  element: <EditUser />,
                },
              ],
            },
            {
              path: "doctors",
              children: [
                {
                  index: true,
                  element: <Doctors />,
                },
                {
                  path: "addDoctors",
                  element: <AddDoctors />,
                },
                {
                  path: ":id",
                  element: <EditDoctor />,
                },
              ],
            },
            {
              path: "labTests",
              children: [
                {
                  index: true,
                  element: <LabTest />,
                },
                {
                  path: "addLabTest",
                  element: <AddLabTest />,
                },
                {
                  path: ":id",
                  element: <EditLabTest />,
                },
              ],
            },
            {
              path: "patients",
              children: [
                {
                  index: true,
                  element: <Patients />,
                },
                {
                  path: "addPatients",
                  element: <AddPatients />, //test token <AddPatients token=token/>
                },
                {
                  path: ":id",
                  element: <EditPatients />,
                },
              ],
            },
            {
              path: "medicalAppointments",
              children: [
                {
                  index: true,
                  element: <MedicalAppointments />,
                },
                {
                  path: "addMedicalAppointments",
                  element: <AddMA />,
                },
                {
                  path: "pending_consultation/:id",
                  element: <PendingConsultation />,
                },
                {
                  path: "pending_results/:id",
                  element: <PendingResults />,
                },
                {
                  path: "results/:id",
                  element: <Results />,
                },
              ],
            },
            {
              path: "labTestResults",
              element: <LabTestResults />,
            },
          ],
        },
      ],
    },
    {
      element: <Logged />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ]);

  return (
    <>
      <div className="containerApp">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
