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
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TablePatients from "./TablePatients";
import TableDoctor from "./TableDoctor";
import { StyledTableCell } from "../table";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";

const steps = ["Select a Patient", "Select a Doctor", "Last Step"];

const AddMA = () => {
  const token = localStorage.getItem("token_user");
  // const data = JSON.parse(localStorage.getItem("data_user"));

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [Patients, setPatients] = useState();
  const [Doctors, setDoctors] = useState();
  const [open, setOpen] = useState(true);
  const [time, setTime] = useState(false);

  const getPatients = () => {
    fetch(import.meta.env.VITE_APIURL + "Patients/getPInMA", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPatients(data.data);
      });
  };

  const getDoctors = () => {
    fetch(import.meta.env.VITE_APIURL + "Doctors/getDoctorsMA", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDoctors(data.data);
      });
  };

  const handleNext = () => {
    if (activeStep == 2) {
      if (!DateMA || DateMA === "") setErrDateMa(!ErrDateMa);
      else if (!Cause || Cause === "") setErrCause(!ErrCause);
      else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [Patient, setPatient] = useState();
  const [Doctor, setDoctor] = useState();
  const [DateMA, setDateMA] = useState("");
  const [Cause, setCause] = useState("");

  /**Errors */
  const [ErrDateMa, setErrDateMa] = useState(false);
  const [ErrCause, setErrCause] = useState(false);

  const Save = (patient, doctor, date, cause) => {
    console.log(patient, doctor, date, cause);
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        id_Patient: patient,
        id_Doctros: doctor,
        date_MA: date,
        cause_MA: cause,
      }),
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
          console.log(data);
          setTimeout(() => {
            Swal.fire({
              title: "Error!",
              icon: "error",
              confirmButtonText: "OK",
            });
          }, 800);
        }
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
    getPatients();
    getDoctors();
  }, []);

  const [RadioSelect, setRadioSelect] = useState(0);
  //data.id ? data.id : 1
  const [RadioSelect2, setRadioSelect2] = useState(1);

  const getPatientById = (id) => {
    fetch(import.meta.env.VITE_APIURL + "PatientsMa/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPatient(data.data.name_Patient);
      });
  }; //DoctorsMA
  const getDoctorById = (id) => {
    fetch(import.meta.env.VITE_APIURL + "DoctorsMA/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDoctor(data.data.name_Doctor);
      });
  };

  const handleReset = () => {
    /**main menu */
    setActiveStep(0);
    setRadioSelect(0);
    setRadioSelect2(1);
  };
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
              <Typography variant="h6">Add Medical Appointments</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};

                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              {activeStep === steps.length ? (
                <Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                  ></Box>
                </Fragment>
              ) : (
                <Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Step {activeStep === 2 ? "Final" : activeStep + 1}
                  </Typography>

                  {activeStep === 0 ? (
                    <>
                      <RadioGroup
                        value={RadioSelect}
                        onChange={(e) => {
                          setRadioSelect(e.target.value);
                          getPatientById(e.target.value);
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
                                <StyledTableCell align="right">
                                  Select
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  Id
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  Name
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  Last Name
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  IDPerson
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Patients?.map((data) => (
                                <TableRow
                                  key={data.id_Patient}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                    ":hover": { background: "#81BDF7" },
                                  }}
                                >
                                  <TableCell align="right">
                                    <FormControlLabel
                                      value={data.id_Patient}
                                      control={<Radio />}
                                    />
                                  </TableCell>

                                  <TablePatients
                                    id={data.id_Patient}
                                    name={data.name_Patient}
                                    lastname={data.lastName_Patient}
                                    identity={data.identity_Patient}
                                  />
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </RadioGroup>
                    </>
                  ) : activeStep === 1 ? (
                    <>
                      <RadioGroup
                        value={RadioSelect2}
                        onChange={(e) => {
                          setRadioSelect2(e.target.value);
                          getDoctorById(e.target.value);
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
                                <StyledTableCell align="right">
                                  Select
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  Id
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  Name
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  Last Name
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  IDDoctor
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Doctors?.map((data) => (
                                <TableRow
                                  key={data.id_Doctor}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                    ":hover": { background: "#81BDF7" },
                                  }}
                                >
                                  <TableCell align="right">
                                    <FormControlLabel
                                      value={data.id_Doctor}
                                      control={<Radio />}
                                    />
                                  </TableCell>
                                  <TableDoctor
                                    id={data.id_Doctor}
                                    name={data.name_Doctor}
                                    lastname={data.lastName_Doctor}
                                    identity={data.identity_Doctor}
                                  />
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </RadioGroup>
                    </>
                  ) : activeStep === 2 ? (
                    <>
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        pt={2}
                      >
                        <Grid item xs={6}>
                          <TextField
                            label="Patient"
                            value={Patient}
                            disabled
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Doctor"
                            value={Doctor}
                            disabled
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={4}>
                          <TextField
                            type="datetime-local"
                            placeholder="date"
                            error={ErrDateMa}
                            helperText={ErrDateMa ? "falta fecha" : null}
                            fullWidth
                            onChange={(e) => {
                              setDateMA(e.target.value);
                              setErrDateMa(false);
                            }}
                          />
                        </Grid>

                        <Grid item xs={8}>
                          <TextField
                            type="text"
                            placeholder="cause..."
                            error={ErrCause}
                            helperText={ErrCause ? "falta causa" : null}
                            label="Cause"
                            fullWidth
                            onChange={(e) => {
                              setCause(e.target.value);
                              setErrCause(false);
                            }}
                          />
                        </Grid>
                      </Grid>
                    </>
                  ) : null}
                </Fragment>
              )}
            </Box>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ mr: 2, ml: 2 }}>
          {activeStep === steps.length ? (
            <Grid container direction={"row"} justifyContent={"right"}>
              <Grid item>
                <Button onClick={handleReset} sx={{ mr: 2 }} variant="outlined">
                  Reset
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
                        Save(RadioSelect, RadioSelect2, DateMA, Cause);
                      }, 1000);
                    }}
                  >
                    Save
                  </Button>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid container direction={"row"} justifyContent={"space-between"}>
              <Grid item>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  Back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={RadioSelect == 0 ? true : false}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Grid>
            </Grid>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMA;
