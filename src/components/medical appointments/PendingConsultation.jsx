import {
  Button,
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
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
      .then((data) => setLabTests(data.data));
  };

  const { id } = useParams();

  const navigate = useNavigate();

  const getMAppointmets = () => {
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointments/" + id)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setIdMA(data.data.id_MA);
        setIdPatient(data.data.id_Patient);
        setIdDoctor(data.data.id_Doctros);
        //console.log(data.data)
      });
  };
  const save =(patient,ma,labTest,doctor)=>{
    console.log(patient,ma,labTest,doctor)
    fetch(import.meta.env.VITE_APIURL + "LabTestResult", {
      method: "POST",
      headers:{
        "Content-Type": "application/Json",
      },
      body: JSON.stringify({
        id_Patient: patient,
        id_MedicalAppointment: ma,
        id_LabTest: labTest,
        id_Doctor: doctor
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if(data) PutMedicalAppointmen()
        console.log(data)
      }).catch(err=>console.log(err));
  }

  const PutMedicalAppointmen=()=>{
    //MedicalAppointments
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointments/" + id,{
      method: "PUT"
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("PutMedicalAppointmen",data);
        //console.log(data.data)
      });
  }

  useEffect(() => {
    getLabTests();
    getMAppointmets();
  }, []);

  return (
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
  );
};

export default PendingConsultation;
