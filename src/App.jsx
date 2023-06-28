import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Notfound from "./page/error/notFound";
import Home from "./page/home/home";
import Users from "./page/maintenances/users";
import Doctors from "./page/maintenances/doctors";
import LabTest from "./page/maintenances/labTest";
import Patients from "./page/maintenances/patients";
import MedicalAppointments from "./page/maintenances/medicalAppointments";
import LabTestResults from "./page/maintenances/labTestResults";
import Login from "./page/auth/login";
import { AuthLayout, Logged } from "./components/AuthLayout";

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
              path: "users",
              element: <Users />,
            },
            {
              path: "doctors",
              element: <Doctors />,
            },
            {
              path: "labTests",
              element: <LabTest />,
            },
            {
              path: "patients",
              element: <Patients />,
            },
            {
              path: "medicalAppointments",
              element: <MedicalAppointments />,
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
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
