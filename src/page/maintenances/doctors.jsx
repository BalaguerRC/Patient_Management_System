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

const Doctors = () => {

  const [Doctores, setDoctores] = useState([]);

  const token = localStorage.getItem("token_user");

  const navigate = useNavigate();

  const GetDoctors = () => {
    fetch(import.meta.env.VITE_APIURL + "Doctors", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setDoctores(data.data));
  };

  const deleteDoctor=(id)=>{
    fetch(import.meta.env.VITE_APIURL + "Doctors/"+id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        GetDoctors();
      });
  }

  useEffect(() => {
    GetDoctors();
  }, []);

  return (
    <div>
      Doctors
      <Button variant="contained" onClick={()=>navigate('addDoctors')}>Add</Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>IDPerson</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            {Doctores?.map((data) => (
              <TableRow key={data.id_Doctor}>
                <TableCell>{data.id_Doctor}</TableCell>
                <TableCell>{data.name_Doctor}</TableCell>
                <TableCell>{data.lastName_Doctor}</TableCell>
                <TableCell>{data.email_Doctor}</TableCell>
                <TableCell>{data.phone_Doctor}</TableCell>
                <TableCell>{data.identity_Doctor}</TableCell>
                <TableCell>{data.img_Doctor}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={()=>navigate(""+data.id_Doctor)}>Edit</Button>
                  <Button variant="contained" onClick={()=>deleteDoctor(data.id_Doctor)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Doctors;
