import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const MedicalAppointments = () => {
  return (
    <div>
      Medical Appointments
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
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Marcos Castro</TableCell>
              <TableCell>jhoncena</TableCell>
              <TableCell>15-06-2023</TableCell>
              <TableCell>11:09</TableCell>
              <TableCell>Una causa</TableCell>
              <TableCell>Activa</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MedicalAppointments;
