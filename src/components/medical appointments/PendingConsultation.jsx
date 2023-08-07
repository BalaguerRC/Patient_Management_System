import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PendingConsultation = () => {
  const [LabTests, setLabTests] = useState([]);

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
        //console.log(data.data)
      });
  };

  useEffect(() => {
    getLabTests();
    getMAppointmets();
  }, []);

  return (
    <div>
      Pending Consultation {id}
      <Button onClick={() => navigate("/medicalAppointments")}>Back</Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
          </TableHead>
          <TableBody>
            {LabTests?.map((data) => (
              <TableRow key={data.id_LabTest}>
                <TableCell>{data.id_LabTest}</TableCell>
                <TableCell>{data.name_LabTest}</TableCell>
                <TableCell>{data.date_LabTest}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PendingConsultation;
