import { TableCell } from "@mui/material";

const TableLabTest = ({id,name,date}) => {
  return (
    <>
      <TableCell align="right">{id}</TableCell>
      <TableCell align="right">{name}</TableCell>
      <TableCell align="right">{date}</TableCell>
    </>
  );
};

export default TableLabTest;
