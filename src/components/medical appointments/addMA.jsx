import {
  Box,
  Button,
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

const steps = ["Select a Patient", "Select a Doctor", "Last Step"];

const AddMA = () => {
  const token = localStorage.getItem("token_user");

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [Patients, setPatients] = useState();
  const [Doctors, setDoctors] = useState();

  const getPatients = () => {
    fetch(import.meta.env.VITE_APIURL + "Patients/getPInMA")
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
        console.log(data);
      });
  };

  /*const isStepOptional = (step) => {
    return step === 1;
  };*/

  const isStepSkipped = (step) => {
    /**when starting choose the value that has the usestate, 0, or if it has a value then go to the next step */
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      /**only in test cases */
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
      console.log("finish");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [Patient, setPatient] = useState();
  const [Doctor, setDoctor] = useState();
  const [DateMA, setDateMA] = useState();
  const [Cause, setCause] = useState();

  const Save = (patient, doctor, date, cause) => {
    console.log(patient, doctor, date, cause);
    /*fetch(import.meta.env.VITE_APIURL + "MedicalAppointments", {
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
        console.log(data);
      });*/
  };

  

  useEffect(() => {
    getPatients();
    getDoctors();
  }, []);

  const [RadioSelect, setRadioSelect] = useState(0);
  const [RadioSelect2, setRadioSelect2] = useState(1);

  const getPatientById = (id) => {
    fetch(import.meta.env.VITE_APIURL + "PatientsMa/" + id)
      .then((resp) => resp.json())
      .then((data) => {
        setPatient(data.data.name_Patient);
      });
  }; //DoctorsMA
  const getDoctorById = (id) => {
    fetch(import.meta.env.VITE_APIURL + "DoctorsMA/" + id)
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
              <Typography variant="h6">Add Medical Appointments</Typography>
            </Grid>
          </Grid>
          <Divider />

          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            p={4}
          >
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={activeStep}>
                {/**top */}
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  {
                    /*if (isStepOptional(index)) { optionalstep
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }*/
                  }
                  if (isStepSkipped(index)) {
                    /**nothing changes */
                    stepProps.completed = false;
                  }

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
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    {/*<Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                    <Button
                      onClick={() =>
                        Save(RadioSelect, RadioSelect, DateMA, Cause)
                      }
                    >
                      Guardar
                    </Button>*/}
                    {/**clicking on it sends us to the main menu.*/}
                  </Box>
                </Fragment>
              ) : (
                <Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    {/**steps */}
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
                            fullWidth
                            onChange={(e) => setDateMA(e.target.value)}
                          />
                        </Grid>

                        <Grid item xs={8}>
                          <TextField
                            type="text"
                            placeholder="cause..."
                            label="Cause"
                            fullWidth
                            onChange={(e) => setCause(e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </>
                  ) : null}
                </Fragment>
              )}
            </Box>

            {/*<Button disabled>Save</Button>*/}
          </Grid>

          <Divider />

          {activeStep === steps.length ? (
            <Grid
              container
              direction={"row"}
              justifyContent={"right"}
              sx={{ p: 2 }}
            >
              <Grid item>
                <Button onClick={handleReset} sx={{ mr: 2 }} variant="outlined">
                  Reset
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={() => Save(RadioSelect, RadioSelect, DateMA, Cause)}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "row", p: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {/**{isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}*/}

              <Button
                variant="contained"
                onClick={handleNext}
                disabled={RadioSelect == 0 ? true : false}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          )}

          {/**/}
        </Paper>
      </Grid>
    </div>
  );
};

export default AddMA;
