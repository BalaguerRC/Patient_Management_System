import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const Users = () => {
  return (
    <div>
      Users
      <Table>
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
    </div>
  );
};

export default Users;
