import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const LabTestResults = () => {
  return (
    <div>
      Lab Tests Results
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableCell>Id</TableCell>
            <TableCell>PatientName</TableCell>
            <TableCell>IDPerson</TableCell>
            <TableCell>TestName</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Marcos Castro</TableCell>
              <TableCell>000-000000-0</TableCell>
              <TableCell>Diagnostico</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LabTestResults;
