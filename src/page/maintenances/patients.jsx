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

const Patients = () => {
  const [Patients, setPatients] = useState();

  const navigate = useNavigate();

  const GetPatients = () => {
    fetch(import.meta.env.VITE_APIURL + "Patients")
      .then((resp) => resp.json())
      .then((data) => {
        setPatients(data.data);
        console.log(data.data);
      });
  };

  const deletePatient = (id) => {
    console.log(id);
    fetch(import.meta.env.VITE_APIURL + "Patients/" + id, {
      method: "DELETE",
      /*headers: {
        Authorization: "Bearer " + token,
      },*/
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        GetPatients();
      });
  };

  useEffect(() => {
    GetPatients();
  }, []);

  return (
    <div>
      Users
      <Button onClick={() => navigate("addPatients")}>Add</Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>IDPerson</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Smoker</TableCell>
              <TableCell>Allergies</TableCell>
              <TableCell>Img</TableCell>
              <TableCell>Registration date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Patients?.map((data) => (
              <TableRow key={data.id_Patient}>
                <TableCell>{data.id_Patient}</TableCell>
                <TableCell>{data.name_Patient}</TableCell>
                <TableCell>{data.lastName_Patient}</TableCell>
                <TableCell>{data.phone_Patient}</TableCell>
                <TableCell>{data.address_Patient}</TableCell>
                <TableCell>{data.identity_Patient}</TableCell>
                <TableCell>{data.birthdate_Patient.slice(0, 10)}</TableCell>
                <TableCell>{data.smoker_Patient===0 ? "No": "Yes"}</TableCell>
                <TableCell>{data.allergies_Patient}</TableCell>
                <TableCell>{data.img_Patient}</TableCell>
                <TableCell>
                  {data.date_Patient.slice(0, 10)} -
                  {data.date_Patient.slice(11, 16)}
                </TableCell>
                <TableCell>
                  <Button onClick={() => navigate("" + data.id_Patient)}>
                    Edit
                  </Button>
                  <Button onClick={() => deletePatient(data.id_Patient)}>
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

export default Patients;
