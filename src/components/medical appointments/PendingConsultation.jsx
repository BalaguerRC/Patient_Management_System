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
import TableLabTest from "./table/TableLabTest";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";

const PendingConsultation = () => {
  const [LabTests, setLabTests] = useState([]);
  const [LabTestById, setLabTestById] = useState(0);
  const [RadioSelect, setRadioSelect] = useState(0);
  const [IdMA, setIdMA] = useState(0);
  const [IdPatient, setIdPatient] = useState(0);
  const [IdDoctor, setIdDoctor] = useState(0);

  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(false);

  const token = localStorage.getItem("token_user");
  const theme = localStorage.getItem("theme");

  const getLabTests = () => {
    fetch(import.meta.env.VITE_APIURL + "LabTest", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLabTests(data.data);
      });
  };

  const { id } = useParams();

  const navigate = useNavigate();

  const getMAppointmets = () => {
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointments/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setIdMA(data.data.id_MA);
        setIdPatient(data.data.id_Patient);
        setIdDoctor(data.data.id_Doctros);
        //console.log(data.data)
      });
  };
  const save = (patient, ma, labTest, doctor) => {
    console.log(patient, ma, labTest, doctor);
    fetch(import.meta.env.VITE_APIURL + "LabTestResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id_Patient: patient,
        id_MedicalAppointment: ma,
        id_LabTest: labTest,
        id_Doctor: doctor,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) PutMedicalAppointmen();
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const PutMedicalAppointmen = () => {
    //MedicalAppointments
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointments/" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          navigate("/medicalAppointments");
          setTimeout(() => {
            Swal.fire({
              title: "Success",
              text: "Do you want to continue?",
              icon: "success",
              confirmButtonText: "OK",
            });
          }, 800);
        } else {
          navigate("/medicalAppointments");
          console.log("PutMedicalAppointmen", data);
          setTimeout(() => {
            Swal.fire({
              title: "Error!",
              icon: "error",
              confirmButtonText: "OK",
            });
          }, 800);
        }
        //console.log(data.data)
      })
      .catch((err) => {
        navigate("/medicalAppointments");
        console.log(err);
        setTimeout(() => {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: err,
            confirmButtonText: "OK",
          });
        }, 800);
      });
  };

  useEffect(() => {
    getLabTests();
    getMAppointmets();
  }, []);

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
              <Typography variant="h6">Pending Consultation</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
            <Typography variant="h6" gutterBottom>
              Select a Lab Test
            </Typography>
            <RadioGroup
              value={RadioSelect}
              onChange={(e) => {
                setRadioSelect(e.target.value);
                setLabTestById(e.target.value);
              }}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                sx={{ visibility: "hidden", display: "none" }}
              />
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%", minWidth: 800 }}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">Select</StyledTableCell>
                      <StyledTableCell align="right">Id</StyledTableCell>
                      <StyledTableCell align="right">Name</StyledTableCell>
                      <StyledTableCell align="right">Date</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {LabTests?.map((data) => (
                      <TableRow
                        key={data.id_LabTest}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                          ":hover": { background: theme == 1 ? "#81BDF7" : "#729582" },
                        }}
                      >
                        <TableCell align="right">
                          <FormControlLabel
                            value={data.id_LabTest}
                            control={<Radio />}
                          />
                        </TableCell>

                        <TableLabTest
                          id={data.id_LabTest}
                          name={data.name_LabTest}
                          date={data.date_LabTest.slice(0, 10)}
                        />
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </RadioGroup>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ mr: 2, ml: 2 }}>
          <Button
            variant="outlined"
            type="submit"
            onClick={() => navigate("/medicalAppointments")}
          >
            Cancel
          </Button>
          {time ? (
            <LoadingButton loading variant="outlined">
              Save
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              type="submit"
              onClick={() => {
                setTime(!time);
                setTimeout(() => {
                  setTime(time);
                  save(IdPatient, IdMA, LabTestById, IdDoctor);
                }, 1000);
              }}
            >
              Save
            </Button>
          )}
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
              <Typography variant="h6">Pending Consultation</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Box p={2}>
            <Typography variant="h6" gutterBottom>Select a Lab Test</Typography>
            <RadioGroup
              value={RadioSelect}
              onChange={(e) => {
                setRadioSelect(e.target.value);
                setLabTestById(e.target.value);
              }}
            >
              <FormControlLabel
                value={0}
                control={<Radio />}
                sx={{ visibility: "hidden", display: "none" }}
              />
              <TableContainer component={Paper}>
                <Table sx={{ width: "100%", minWidth: 800 }}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">Select</StyledTableCell>
                      <StyledTableCell align="right">Id</StyledTableCell>
                      <StyledTableCell align="right">Name</StyledTableCell>
                      <StyledTableCell align="right">Date</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {LabTests?.map((data) => (
                      <TableRow
                        key={data.id_LabTest}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                          ":hover": { background: "#81BDF7" },
                        }}
                      >
                        <TableCell align="right">
                          <FormControlLabel
                            value={data.id_LabTest}
                            control={<Radio />}
                          />
                        </TableCell>

                        <TableLabTest
                          id={data.id_LabTest}
                          name={data.name_LabTest}
                          date={data.date_LabTest.slice(0, 10)}
                        />
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </RadioGroup>
          </Box>

          <Divider />
          <Grid
            container
            direction={"row"}
            justifyContent={"right"}
            sx={{ p: 2 }}
          >
            <Grid item>
              <Button variant="contained" type="submit" disabled sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button
                variant="outlined"
                type="submit"
                onClick={() => save(IdPatient, IdMA, LabTestById, IdDoctor)}
                disabled={RadioSelect === 0 ? true : false}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
   */
}

export default PendingConsultation;
