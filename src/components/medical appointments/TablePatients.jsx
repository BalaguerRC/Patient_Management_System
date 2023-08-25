import { TableCell } from "@mui/material";

const TablePatients = ({ id, name, lastname, identity }) => {
  return (
    <>
      <TableCell align="right">{id}</TableCell>
      <TableCell align="right">{name}</TableCell>
      <TableCell align="right">{lastname}</TableCell>
      <TableCell align="right">{identity}</TableCell>
    </>
  );
};

export default TablePatients;
