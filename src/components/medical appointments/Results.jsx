import {
  Box,
  Button,
  Divider,
  Grid,
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
import { StyledTableCell } from "../table";
import TableResult from "./table/TableResult";

const Results = () => {
  const [Results, setResults] = useState([]);

  const { id } = useParams();

  const GetResultsByPatient = () => {
    //LabTestResults
    fetch(import.meta.env.VITE_APIURL + "LabTestResults/" + id)
      .then((resp) => resp.json())
      .then((data) => {
        setResults(data.data);
      });
  };

  useEffect(() => {
    GetResultsByPatient();
  }, []);

  const navigate = useNavigate();
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
              <Typography variant="h6">
                Results Patient: {Results[0]?.patient}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Box p={4}>
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%", minWidth: 800 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">
                      Id_LabTestResult
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Id_MedicalAppointment
                    </StyledTableCell>
                    <StyledTableCell align="right">Lab Test</StyledTableCell>
                    <StyledTableCell align="right">Doctor</StyledTableCell>
                    <StyledTableCell align="right">Test Result</StyledTableCell>
                    <StyledTableCell align="right">State</StyledTableCell>
                    <StyledTableCell align="right">
                      Date Test Result
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Hour
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Results?.map((data) => (
                    <TableRow
                      key={data.id_LabTestResult}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                        ":hover": { background: "#81BDF7" },
                      }}
                    >
                      <TableResult
                        id_LabTestResult={data.id_LabTestResult}
                        id_ma={data.id_MedicalAppointment}
                        labTest={data.labTest}
                        doctor={data.doctor}
                        testResult={data.test_Result}
                        state={data.state_Result == 0 ? "pending" : "completed"}
                        date={data.date_TestResult.slice(0,10)}
                        hour={data.date_TestResult.slice(11,16)}
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
                OK
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
   */
}
export default Results;
