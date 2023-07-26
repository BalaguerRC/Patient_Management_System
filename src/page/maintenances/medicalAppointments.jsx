import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MedicalAppointments = () => {
  const [MAppointmets, setMAppointmets] = useState();

  const navigate = useNavigate();

  const getMAppointmets = () => {
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointments")
      .then((resp) => resp.json())
      .then((data) => {
        setMAppointmets(data.data);
        //console.log(data.data)
      });
  };

  useEffect(() => {
    getMAppointmets();
  }, []);

  return (
    <div>
      Medical Appointments
      <Button onClick={()=> navigate("addMedicalAppointments")}>Add</Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableCell>Id</TableCell>
            <TableCell>Patient Name</TableCell>
            <TableCell>Doctor Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Hour</TableCell>
            <TableCell>Cause</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            {MAppointmets?.map((data) => (
              <TableRow key={data.id_MA}>
                <TableCell>{data.id_MA}</TableCell>
                <TableCell>{data.id_Patient}</TableCell>
                <TableCell>{data.id_Doctros}</TableCell>
                <TableCell>{data.date_MA.slice(0, 10)}</TableCell>
                <TableCell>{data.date_MA.slice(11, 16)}</TableCell>
                <TableCell>{data.cause_MA}</TableCell>
                <TableCell>
                  {data.state_MA === 0 ? "Inactiva" : "Activa"}
                </TableCell>
                <TableCell>
                  <Button disabled>Edit</Button>
                  <Button disabled>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MedicalAppointments;
