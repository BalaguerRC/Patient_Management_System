import {
  Button,
  ButtonGroup,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
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
  const [RadioSelect, setRadioSelect] = useState(0);
  //const [LabTestResultById, setLabTestResultById] = useState(0);

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

  const complete_MA = (id_MA, id_LabTestResult) => {
    console.log(
      "IDMedicalAppointment: ",
      id_MA,
      "IDLabTestResult: ",
      id_LabTestResult
    );
    fetch(import.meta.env.VITE_APIURL + "LabTestResult/" + id_LabTestResult, {
      method: "PUT",
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
    fetch(
      import.meta.env.VITE_APIURL +
        "MedicalAppointment/pendingResults/" +
        id_MA,
      {
        method: "PUT",
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
    getLabTestResultsByPatient();
  };

  useEffect(() => {
    //
    getLabTestResultsByPatient();
  }, []);
  return (
    <div>
      Pending Results - {id}
      <Button onClick={() => navigate("/medicalAppointments")}>Back</Button>
      <RadioGroup
        value={RadioSelect}
        onChange={(e) => {
          setRadioSelect(e.target.value);
          /*setLabTestResultById(e.target.value);*/
        }}
      >
        <FormControlLabel
          value={0}
          control={<Radio />}
          sx={{ visibility: "hidden" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%", minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>id_LabTestResult</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Lab Test</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LabTestResultByPatient?.map((data) => (
                <TableRow key={data.id_LabTestResult}>
                  <TableCell>
                    <FormControlLabel
                      value={data.id_LabTestResult}
                      control={<Radio />}
                    />
                  </TableCell>
                  <TableCell>{data.id_LabTestResult}</TableCell>
                  <TableCell>{data.id_Patient}</TableCell>
                  <TableCell>{data.id_LabTest}</TableCell>
                  <TableCell>
                    {data.state_Result == 0 ? "pending" : "completed"}
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={RadioSelect === 0 ? true : false}
                      onClick={() =>
                        complete_MA(
                          data.id_MedicalAppointment,
                          data.id_LabTestResult
                        )
                      }
                    >
                      complete appointment
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </RadioGroup>
    </div>
  );
};

export default PendingResults;
