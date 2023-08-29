import { Chip, TableCell } from "@mui/material";

const TableResult = ({
  id_LabTestResult,
  id_ma,
  labTest,
  doctor,
  testResult,
  state,
  date,
  hour,
}) => {
  return (
    <>
      <TableCell align="right">{id_LabTestResult}</TableCell>
      <TableCell align="right">{id_ma}</TableCell>
      <TableCell align="right">{labTest}</TableCell>
      <TableCell align="right">{doctor}</TableCell>
      <TableCell align="right">{testResult}</TableCell>
      <TableCell align="right">
        {state === "completed" ? (
          <Chip label={"completed"} variant="filled" color="success" />
        ) : (
          <Chip label={"pending"} variant="filled" color="warning" />
        )}
      </TableCell>
      <TableCell align="right">{date}</TableCell>
      <TableCell align="right">{hour}</TableCell>
    </>
  );
};

export default TableResult;
