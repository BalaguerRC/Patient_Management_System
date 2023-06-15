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

function App() {
  const router = createBrowserRouter([
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
    {
      path: "*",
      element: <Notfound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
