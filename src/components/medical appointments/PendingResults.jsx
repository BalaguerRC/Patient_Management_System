import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
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
import { StyledTableCell } from "../table";
import TableTestResultByPatient from "./table/TableTestResultByPatient";

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

  /*const complete_MA = (id_MA, id_LabTestResult) => {
    console.log(
      "IDMedicalAppointment: ",
      id_MA,
      "IDLabTestResult: ",
      id_LabTestResult
    );
    /*fetch(import.meta.env.VITE_APIURL + "LabTestResult/" + id_LabTestResult, {
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
  };*/

  useEffect(() => {
    //
    getLabTestResultsByPatient();
  }, []);
  return (
    <div>
      <Grid item>
        <Paper>
          <Grid
            container
            direction={"row"}
            justifyContent={"left"}
            alignItems={"center"}
            sx={{ p: 1 }}
          >
            <Grid item>
              <Button onClick={() => navigate("/medicalAppointments")}>
                {"<"}
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">Pending Results - {id}</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Box p={2}>
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%", minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">
                      id_LabTestResult
                    </StyledTableCell>
                    <StyledTableCell align="right">Patient</StyledTableCell>
                    <StyledTableCell align="right">Test</StyledTableCell>
                    <StyledTableCell align="right">State</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {LabTestResultByPatient?.map((data) => (
                    <TableRow
                      key={data.id_LabTestResult}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                        ":hover": { background: "#81BDF7" },
                      }}
                    >
                      <TableTestResultByPatient
                        idLabTest={data.id_LabTestResult}
                        patient={data.patient}
                        labTest={data.labTest}
                        state={data.state_Result == 0 ? "pending" : "completed"}
                        RadioSelect={RadioSelect}
                        idMedicalAppointment={data.id_MedicalAppointment}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Divider />
          <Grid
            container
            direction={"row"}
            justifyContent={"right"}
            sx={{ p: 2 }}
          >
            <Grid item>
              <Button variant="outlined" type="submit">
                ok
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};
{
  /**
  <div>
      Pending Results - {id}
      <Button onClick={() => navigate("/medicalAppointments")}>Back</Button>
      <RadioGroup
        value={RadioSelect}
        onChange={(e) => {
          setRadioSelect(e.target.value);
          setLabTestResultById(e.target.value);
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
                    <TableCell>{data.patient}</TableCell>
                    <TableCell>{data.labTest}</TableCell>
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
*/
}
export default PendingResults;
