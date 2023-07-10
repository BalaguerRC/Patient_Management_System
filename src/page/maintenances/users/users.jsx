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

const Users = () => {
  const [Usuarios, setUsuarios] = useState([]);

  const token = localStorage.getItem("token_user");

  const GetUsers = () => {
    fetch(import.meta.env.VITE_APIURL + "Users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsuarios(data.data));
  };

  useEffect(() => {
    GetUsers();
  }, []);

  const deleteUser = (id) => {
    console.log(id);
    fetch(import.meta.env.VITE_APIURL + "Users/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        GetUsers();
      });
  };

  const navigate = useNavigate();
  return (
    <div>
      Users
      <Button variant="outlined" onClick={() => navigate("addUser")}>
        Add
      </Button>
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
                    <Button
                      variant="contained"
                      onClick={() => navigate("" + data.id_User)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => deleteUser(data.id_User)}
                    >
                      Delete
                    </Button>
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
