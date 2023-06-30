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
import UserForm from "../../components/users/UserForm";

const Users = () => {
  const [Active, setActive] = useState(false);
  const [Usuarios, setUsuarios] = useState([]);

  const GetUsers = () => {
    fetch(import.meta.env.VITE_APIURL + "Users")
      .then((res) => res.json())
      .then((data) => setUsuarios(data.data));
  };

  useEffect(() => {
    GetUsers();
  }, []);

  

  return (
    <div>
      Users
      <Button variant="outlined" onClick={() => setActive(!Active)}>
        Add
      </Button>
      {/**component dialog */}
      <UserForm Active={Active}/>

      <TableContainer component={Paper} sx={{ width: 1000 }}>
        <Table sx={{ width: "30%", minWidth: 800 }}>
          <TableHead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>
          <TableBody>
            {Usuarios?.map((data) => {
              return (
                <TableRow key={data.id_User}>
                  <TableCell>{data.id_User}</TableCell>
                  <TableCell>{data.name_User}</TableCell>
                  <TableCell>{data.lastName_User}</TableCell>
                  <TableCell>{data.email_User}m</TableCell>
                  <TableCell>{data.userName}</TableCell>
                  <TableCell>{data.password_User}</TableCell>
                  <TableCell>{data.date_User}</TableCell>
                  <TableCell>{data.type_User}</TableCell>
                  <TableCell>
                    <Button variant="contained">Edit</Button>
                    <Button variant="contained">Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
