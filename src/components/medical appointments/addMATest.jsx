const test = () => {
    return (
      <div>
        Add Medical Appointments
        <Button onClick={() => navigate("/medicalAppointments")}>Back</Button>
        <Paper sx={{ width: "100%", minWidth: 800 }}>
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
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
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                    <Button
                      onClick={() =>
                        Save(RadioSelect, RadioSelect, DateMA, Cause)
                      }
                    >
                      Guardar
                    </Button>
                    {/**clicking on it sends us to the main menu.*/}
                  </Box>
                </Fragment>
              ) : (
                <Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    {/**steps */}
                    Step {activeStep + 1} test
                  </Typography>
  
                  {activeStep === 0 ? (
                    <>
                      <h2>Patients</h2>
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
                          sx={{ visibility: "hidden" }}
                        />
                        <TableContainer component={Paper}>
                          <Table sx={{ width: "100%", minWidth: 800 }}>
                            <TableHead>
                              <TableCell>Id</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Last Name</TableCell>
                              <TableCell>IDPerson</TableCell>
                            </TableHead>
                            <TableBody>
                              {Patients?.map((data) => (
                                <>
                                  <FormControlLabel
                                    value={data.id_Patient}
                                    control={<Radio />}
                                  />
                                  <TablePatients
                                    key={data.id_Patient}
                                    id={data.id_Patient}
                                    name={data.name_Patient}
                                    lastname={data.lastName_Patient}
                                    identity={data.identity_Patient}
                                  />
                                </>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </RadioGroup>
                    </>
                  ) : activeStep === 1 ? (
                    <>
                      <h2>Doctors</h2>
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
                          sx={{ visibility: "hidden" }}
                        />
                        <TableContainer component={Paper}>
                          <Table sx={{ width: "100%", minWidth: 800 }}>
                            <TableHead>
                              <TableCell>Id</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Last Name</TableCell>
                              <TableCell>IDDoctor</TableCell>
                            </TableHead>
                            <TableBody>
                              {Doctors?.map((data) => (
                                <>
                                  <FormControlLabel
                                    value={data.id_Doctor}
                                    control={<Radio />}
                                  />
                                  <TableDoctor
                                    key={data.id_Doctor}
                                    id={data.id_Doctor}
                                    name={data.name_Doctor}
                                    lastname={data.lastName_Doctor}
                                    identity={data.identity_Doctor}
                                  />
                                </>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </RadioGroup>
                    </>
                  ) : activeStep === 2 ? (
                    <>
                      <h2>Final</h2>
                      <Grid
                        container
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <TextField
                          label="Patient"
                          value={Patient}
                          disabled
                          fullWidth
                        />
                        <TextField
                          label="Doctor"
                          value={Doctor}
                          disabled
                          fullWidth
                        />
                        <TextField
                          type="datetime-local"
                          placeholder="date"
                          fullWidth
                          onChange={(e) => setDateMA(e.target.value)}
                        />
                        <TextField
                          type="text"
                          placeholder="cause..."
                          fullWidth
                          onChange={(e) => setCause(e.target.value)}
                        />
                      </Grid>
                    </>
                  ) : null}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
                      onClick={handleNext}
                      disabled={RadioSelect == 0 ? true : false}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </Fragment>
              )}
            </Box>
  
            {/*<Button disabled>Save</Button>*/}
          </Grid>
        </Paper>
      </div>
    );
  };