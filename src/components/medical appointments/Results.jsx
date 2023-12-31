import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
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
  const [open, setOpen] = useState(true);

  const { id } = useParams();

  const token = localStorage.getItem("token_user");
  const theme = localStorage.getItem("theme");

  const GetResultsByPatient = () => {
    //LabTestResults
    fetch(import.meta.env.VITE_APIURL + "LabTestResults/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
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
      <Dialog
        open={open}
        onClose={() => navigate("/medicalAppointments")}
        maxWidth={"md"}
        fullWidth
        sx={{
          ".css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop": {
            backgroundColor: "rgba(0, 0, 0, 0.91)",
          },
        }}
      >
        <DialogTitle>
          <Grid
            container
            direction={"row"}
            justifyContent={"left"}
            alignItems={"center"}
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
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%", minWidth: 800 }} size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">
                      <Typography variant="caption">
                        (ID)LabTestResult
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography variant="caption">(ID)MA</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">Lab Test</StyledTableCell>
                    <StyledTableCell align="right">Doctor</StyledTableCell>
                    <StyledTableCell align="right">Test Result</StyledTableCell>
                    <StyledTableCell align="right">State</StyledTableCell>
                    <StyledTableCell align="right">
                      Date Test Result
                    </StyledTableCell>
                    <StyledTableCell align="right">Hour</StyledTableCell>
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
                        ":hover": { background: theme == 1 ? "#81BDF7" : "#729582" },
                      }}
                    >
                      <TableResult
                        id_LabTestResult={data.id_LabTestResult}
                        id_ma={data.id_MedicalAppointment}
                        labTest={data.labTest}
                        doctor={data.doctor}
                        testResult={data.test_Result}
                        state={data.state_Result == 0 ? "pending" : "completed"}
                        date={data.date_TestResult.slice(0, 10)}
                        hour={data.date_TestResult.slice(11, 16)}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ mr: 2, ml: 2 }}>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => navigate("/medicalAppointments")}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Results;
