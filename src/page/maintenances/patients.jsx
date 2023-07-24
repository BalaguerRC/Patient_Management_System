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

  const GetPatients=()=>{
    fetch(import.meta.env.VITE_APIURL+"Patients").then(resp=>resp.json()).then(data=>setPatients(data.data))
  }

  useEffect(() => {
    GetPatients()
  }, []);

  return (
    <div>
      Users
      <Button onClick={()=>navigate("addPatients")}>Add</Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>IDPerson</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Smoker</TableCell>
            <TableCell>Allergies</TableCell>
            <TableCell>Img</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            {Patients?.map((data)=>(<TableRow key={data.id_Patient}>
              <TableCell>{data.id_Patient}</TableCell>
              <TableCell>{data.name_Patient}</TableCell>
              <TableCell>{data.lastName_Patient}</TableCell>
              <TableCell>{data.phone_Patient}</TableCell>
              <TableCell>{data.address_Patient}</TableCell>
              <TableCell>{data.identity_Patient}</TableCell>
              <TableCell>{data.birthdate_Patient}</TableCell>
              <TableCell>{data.smoker_Patient}</TableCell> {/**yes or no */}
              <TableCell>{data.allergies_Patient}</TableCell>{/**yes or no */}
              <TableCell>{data.img_Patient}</TableCell>
              <TableCell>
                <Button onClick={()=>navigate(""+data.id_Patient)}>Edit</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>))}
            
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Patients;
