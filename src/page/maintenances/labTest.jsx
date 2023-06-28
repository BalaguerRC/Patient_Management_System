import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

const LabTest = () => {
  const [LabTests, setLabTests] = useState([]);

  const getLabTests = () => {
    fetch(import.meta.env.VITE_APIURL + "LabTest")
      .then((res) => res.json())
      .then((data) => setLabTests(data.data));
  };

  useEffect(() => {
    getLabTests();
  }, []);

  return (
    <div>
      Lab Test
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            {LabTests?.map((data) => (
              <TableRow key={data.id_LabTest}>
                <TableCell>{data.id_LabTest}</TableCell>
                <TableCell>{data.name_LabTest}</TableCell>
                <TableCell>{data.date_LabTest}</TableCell>
                <TableCell>
                  <Button variant="contained">Edit</Button>
                  <Button variant="contained">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LabTest;
