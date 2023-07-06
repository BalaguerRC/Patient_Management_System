import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import UserForm from "../../../components/users/UserForm";
import { useNavigate } from "react-router-dom";



const Users = () => {
  const [Active, setActive] = useState(false);
  const [ActiveEdit, setActiveEdit] = useState(false);
  const [Usuarios, setUsuarios] = useState([]);
  const [Id, setId] = useState();
  const [Name, setName] = useState();
  const [LastName, setLastName] = useState();
  const [Mail, setMail] = useState();
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();
  const [Type, setType] = useState();

  const GetUsers = () => {
    fetch(import.meta.env.VITE_APIURL + "Users")
      .then((res) => res.json())
      .then((data) => setUsuarios(data.data));
  };

  useEffect(() => {
    GetUsers();
  }, []);

  /*const EditeForm = (id, name, lastName, email, userName, type) => {
    console.log(id, name, lastName, email, userName, type);
  };*/
  const EditForm = (id, name, lastname,email,username,type) => {
    console.log(id, name, lastname);
    if(id) {
      setId(id)
      setActiveEdit(!ActiveEdit)
      setName(name)
      setLastName(lastname)
      setMail(email)
      setUsername(username)
      setType(type)
    }
  };

  const Edited=(Id,Name,LastName,Mail,Username,Password,ConfirmPassword,Type)=>{
    console.log(Id,Name,LastName,Mail,Username,Password,ConfirmPassword,Type)
  }
  

  const navigate = useNavigate()
  return (
    <div>
      Users
      <Button variant="outlined" onClick={() => navigate("addUser")}>
        Add
      </Button>
      {/**component dialog */}
      <UserForm Active={Active} />
      {/**end */}
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
                      onClick={() =>
                        EditForm(
                          data.id_User,
                          data.name_User,
                          data.lastName_User,
                          data.email_User,
                          data.userName,
                          data.type_User
                        )
                      }
                    >
                      Edit
                    </Button>
                    <Button variant="contained">Delete</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        onClose={() => setActiveEdit(!ActiveEdit)}
        open={ActiveEdit}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <input  value={Id}/>
          <TextField
            type="text"
            placeholder="name..."
            value={Name}
            onChange={(e)=>setName(e.target.value)}
            fullWidth
          />
          <TextField
            type="text"
            placeholder="lastname..."
            value={LastName}
            onChange={(e)=>setLastName(e.target.value)}
            fullWidth
          />
          <TextField
            type="text"
            placeholder="mail..."
            value={Mail}
            onChange={(e)=>setMail(e.target.value)}
            fullWidth
          />
          <TextField
            type="text"
            placeholder="username..."
            value={Username}
            onChange={(e)=>setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            type="password"
            placeholder="password..."
            onChange={(e)=>setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            type="password"
            placeholder="confirm password..."
            onChange={(e)=>setConfirmPassword(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              value={Type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Doctor</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            fullWidth
            onClick={()=>Edited(Id,Name,LastName,Mail,Username,Password,ConfirmPassword,Type)}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            fullWidth
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
