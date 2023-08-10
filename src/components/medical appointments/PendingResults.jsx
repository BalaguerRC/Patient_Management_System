import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PendingResults = () => {
  const [LabTestResultByPatient, setLabTestResultByPatient] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const getLabTestResultsByPatient = () => {
    fetch(import.meta.env.VITE_APIURL + "LabTestResult/" + id)
      .then((resp) => resp.json())
      .then((data) => {
        //console.log(data);
        setLabTestResultByPatient(data.data);
      });
  };

  useEffect(() => {
    //
    getLabTestResultsByPatient();
  }, []);
  return (
    <div>
      Pending Results - {id}
      <Button onClick={() => navigate("/medicalAppointments")}>Back</Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {LabTestResultByPatient?.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{data.id_Patient}</TableCell>
                <TableCell>
                  {data.state_Result == 0 ? "pending" : "completed"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonGroup disabled>
        <Button>complete appointment</Button>
        <Button>close results</Button>
      </ButtonGroup>
    </div>
  );
};

export default PendingResults;
