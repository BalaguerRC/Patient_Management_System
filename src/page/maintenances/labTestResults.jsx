import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

const LabTestResults = () => {
  const [LabTestResults, setLabTestResults] = useState([]);

  const GetLabTestResults = () => {
    fetch(import.meta.env.VITE_APIURL + "LabTestResult")
      .then((resp) => resp.json())
      .then((data) => setLabTestResults(data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    GetLabTestResults();
  }, []);

  return (
    <div>
      Lab Tests Results
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ID_Patient</TableCell>
              <TableCell>PatientName</TableCell>
              <TableCell>ID_MA</TableCell>
              <TableCell>LabTest</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Test_Result</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {LabTestResults?.map((data) => (
              <TableRow key={data.id_LabTestResult}>
                <TableCell>{data.id_LabTestResult}</TableCell>
                <TableCell>{data.id_Patient}</TableCell>
                <TableCell>{data.patient}</TableCell>
                <TableCell>{data.id_MedicalAppointment}</TableCell>
                <TableCell>{data.labTest}</TableCell>
                <TableCell>{data.doctor}</TableCell>
                <TableCell>{data.test_Result}</TableCell>
                <TableCell>
                  {data.state_Result == 0 ? "pending" : "completed"}
                </TableCell>
                <TableCell>{data.date_TestResult}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LabTestResults;
