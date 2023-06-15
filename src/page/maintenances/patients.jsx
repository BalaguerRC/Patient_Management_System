import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Patients = () => {
  return (
    <div>
      Users
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>IDPerson</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Smoker</TableCell>
            <TableCell>Allergies</TableCell>
            <TableCell>Img</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Marcos</TableCell>
              <TableCell>Castro</TableCell>
              <TableCell>m@exa.com</TableCell>
              <TableCell>809-000-0000</TableCell>
              <TableCell>Calle tacio</TableCell>
              <TableCell>000-000000-0</TableCell>
              <TableCell>24-02-1998</TableCell>
              <TableCell>No</TableCell>
              <TableCell>Si</TableCell>
              <TableCell>Img</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Patients;
