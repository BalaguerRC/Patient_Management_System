import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Users = () => {
  return (
    <div>
      Users
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800}}>
          <TableHead>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Jhon</TableCell>
              <TableCell>primera</TableCell>
              <TableCell>@email.com</TableCell>
              <TableCell>jhoncena</TableCell>
              <TableCell>20-2020</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;