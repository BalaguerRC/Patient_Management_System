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

  const [Name, setName] = useState();
  const [LastName, setLastName] = useState();
  const [Mail, setMail] = useState();
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();
  const [Type, setType] = useState();
  
  const AddUser = (Name,LastName,Mail,Username,Password,ConfirmPassword,Type) => {

    if(ConfirmPassword === Password){

      fetch(import.meta.env.VITE_APIURL + "Users",{
        method: "POST",
        headers: {
          "Content-Type": "application/Json",
        },
        body: JSON.stringify({
          name_User: Name,
          lastName_User: LastName,
          email_User: Mail,
          userName: Username,
          password_User: ConfirmPassword,
          type_User: Type
        })
      }).then(res=>res.json()).then(data=>{
        console.log(data)
  
        GetUsers()
      })
    }
    else{
      console.log("la contrase;a no es igual")
    }
    
  }

  return (
    <div>
      Users
      <Button variant="outlined" onClick={() => setActive(!Active)}>
        Add
      </Button>
      <Dialog onClose={() => setActive(!Active)} open={Active}>
        <DialogTitle>Add new User</DialogTitle>
        <DialogContent>
          <TextField type="text" placeholder="name..." fullWidth onChange={(e)=>setName(e.target.value)}/>
          <TextField type="text" placeholder="lastname..." fullWidth onChange={(e)=>setLastName(e.target.value)}/>
          <TextField type="text" placeholder="mail..." fullWidth onChange={(e)=>setMail(e.target.value)}/>
          <TextField type="text" placeholder="username..." fullWidth onChange={(e)=>setUsername(e.target.value)}/>
          <TextField type="password" placeholder="password..." fullWidth onChange={(e)=>setPassword(e.target.value)}/>
          <TextField type="password" placeholder="confirm password..." fullWidth onChange={(e)=>setConfirmPassword(e.target.value)}/>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              value={Type}
              onChange={(e)=>setType(e.target.value)}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Doctor</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" fullWidth onClick={()=>AddUser(Name,LastName,Mail,Username,Password,ConfirmPassword,Type)}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => setActive(!Active)} fullWidth>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
