import { TableCell, TableRow } from "@mui/material";

const TablePatients = ({id,name,lastname,identity}) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{lastname}</TableCell>
      <TableCell>{identity}</TableCell>
    </TableRow>
  );
};

export default TablePatients;
