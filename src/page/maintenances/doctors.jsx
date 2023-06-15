import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Doctors = () => {
  return (
    <div>
      Doctors
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>IDPerson</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Jhon</TableCell>
              <TableCell>Cena</TableCell>
              <TableCell>@email.com</TableCell>
              <TableCell>111-955-2144</TableCell>
              <TableCell>000-000000-0</TableCell>
              <TableCell>img</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Doctors;
