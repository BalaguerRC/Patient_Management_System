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
import { useNavigate } from "react-router-dom";

const LabTest = () => {
  const [LabTests, setLabTests] = useState([]);

  const getLabTests = () => {
    fetch(import.meta.env.VITE_APIURL + "LabTest")
      .then((res) => res.json())
      .then((data) => setLabTests(data.data));
  };

  const navigate = useNavigate();

  const Delete = (id) => {
    console.log("Delete", id);
    fetch(import.meta.env.VITE_APIURL + "LabTest/" + id, {
      method: "DELETE",
      /*headers: {
        Authorization: "Bearer " + token,
      },*/
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getLabTests();
      });
  };

  useEffect(() => {
    getLabTests();
  }, []);

  return (
    <div>
      Lab Test
      <Button onClick={() => navigate("addLabTest")}>Add</Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {LabTests?.map((data) => (
              <TableRow key={data.id_LabTest}>
                <TableCell>{data.id_LabTest}</TableCell>
                <TableCell>{data.name_LabTest}</TableCell>
                <TableCell>{data.date_LabTest}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => navigate("" + data.id_LabTest)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => Delete(data.id_LabTest)}
                  >
                    Delete
                  </Button>
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
