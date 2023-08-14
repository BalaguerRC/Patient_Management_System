import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Results = () => {
  const [Results, setResults] = useState([]);

  const { id } = useParams();

  const GetResultsByPatient = () => {
    //LabTestResults
    fetch(import.meta.env.VITE_APIURL + "LabTestResults/" + id)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setResults(data.data);
      });
  };

  useEffect(() => {
    GetResultsByPatient();
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h6" gutterBottom>Results - Patient: {Results[0]?.patient}</Typography>
      <Button onClick={() => navigate("/medicalAppointments")}>{'<'}-BACK</Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID_LabTestResult</TableCell>
              <TableCell>ID_MA</TableCell>
              <TableCell>Lab Test</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Test Result</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Date Test Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Results?.map((data) => (
              <TableRow key={data.id_LabTestResult}>
                <TableCell>{data.id_LabTestResult}</TableCell>
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

export default Results;
