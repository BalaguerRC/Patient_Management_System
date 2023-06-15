import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";

const LabTest = () => {
  return (
    <div>
      Lab Test
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Diagnostico</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LabTest;
