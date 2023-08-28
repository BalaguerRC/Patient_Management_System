import {
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
import TableLabTest from "./table/TableLabTest";

const PendingConsultation = () => {
  const [LabTests, setLabTests] = useState([]);
  const [LabTestById, setLabTestById] = useState(0);
  const [RadioSelect, setRadioSelect] = useState(0);
  const [IdMA, setIdMA] = useState(0);
  const [IdPatient, setIdPatient] = useState(0);
  const [IdDoctor, setIdDoctor] = useState(0);

  const getLabTests = () => {
    fetch(import.meta.env.VITE_APIURL + "LabTest")
      .then((res) => res.json())
      .then((data) => {
        setLabTests(data.data);
      });
  };

  const { id } = useParams();

  const navigate = useNavigate();

  const getMAppointmets = () => {
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointments/" + id)
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
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("PutMedicalAppointmen", data);
        //console.log(data.data)
      });
  };

  useEffect(() => {
    getLabTests();
    getMAppointmets();
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
              <Typography variant="h6">Pending Consultation</Typography>
            </Grid>
          </Grid>
          <Divider />
          <RadioGroup
            value={RadioSelect}
            onChange={(e) => {
              setRadioSelect(e.target.value);
              setLabTestById(e.target.value);
            }}
            sx={{ p: 4 }}
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
    </div>
  );
};

{
  /**
  <div>
      Pending Consultation {id}
      <Button onClick={() => navigate("/medicalAppointments")}>Back</Button>
      <RadioGroup
        value={RadioSelect}
        onChange={(e) => {
          setRadioSelect(e.target.value);
          setLabTestById(e.target.value);
        }}
      >
      <Typography variant="h5" gutterBottom>Select a Lab Test</Typography>
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
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LabTests?.map((data) => (
                <TableRow key={data.id_LabTest}>
                  <TableCell>
                    <FormControlLabel
                      value={data.id_LabTest}
                      control={<Radio />}
                    />
                  </TableCell>
                  <TableCell>{data.id_LabTest}</TableCell>
                  <TableCell>{data.name_LabTest}</TableCell>
                  <TableCell>{data.date_LabTest}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </RadioGroup>
      <Button variant="contained" onClick={()=>save(IdPatient,IdMA,LabTestById,IdDoctor)} disabled={RadioSelect ===0 ? true: false}>Save</Button>
    </div>
   */
}

export default PendingConsultation;
