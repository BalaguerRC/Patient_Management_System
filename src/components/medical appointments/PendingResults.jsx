import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

  const [open, setOpen] = useState(true);

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
  }, [LabTestResultByPatient]);
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
              <Typography variant="h6">Pending Results - {id}</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
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
        </DialogContent>
        <Divider />
        <DialogActions sx={{ mr: 2, ml: 2 }}>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => navigate("/medicalAppointments")}
          >
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

{
  /**
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
              <Button
                variant="outlined"
                type="submit"
                onClick={() => navigate("/medicalAppointments")}
              >
                ok
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
   */
}
export default PendingResults;
