import {
  Breadcrumbs,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
//import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableCell } from "../../../components/users/style/table";
import { DialogComponent } from "../../../components/users/DeleteUser";

/*const DialogComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <IconButton onClick={() => setOpenDialog(true)}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(!openDialog)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(!openDialog)}>Disagree</Button>
          <Button onClick={() => setOpenDialog(!openDialog)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};*/

const Users = () => {
  const [Usuarios, setUsuarios] = useState([]);
  const [name, setName] = useState("");
  //const [openDialog, setOpenDialog] = useState(false);

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

  const GetUsersByName = (name) => {
    fetch(import.meta.env.VITE_APIURL + "Users/byName", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name_User: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data.data)
        if(data.data.length===0) GetUsers();
      });
  };

  useEffect(() => {
    GetUsers();
  }, []);

  /* const deleteUser = (id) => {
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
  };*/

  const navigate = useNavigate();
  return (
    <div>
      <Grid container direction={"column"} justifyContent={"center"}>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            pb: 5,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Users
          </Typography>
          <Button variant="contained" onClick={() => navigate("addUser")}>
            Add
          </Button>
        </Grid>

        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Breadcrumbs separator="-›">
            <Link underline="hover" onClick={() => navigate("/")}>
              <Chip label={"Home"} />
            </Link>
            <Link underline="hover" href="#">
              <Chip label={"Users"} />
            </Link>
          </Breadcrumbs>
          <FormControl sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              label={"Search"}
              size="small"
              placeholder="name..."
              value={name}
              InputProps={{
                startAdornment: <SearchIcon fontSize="small" />,
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <IconButton onClick={() => GetUsersByName(name)}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </FormControl>
        </Grid>

        <Grid item sx={{ pt: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Last Name</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">UserName</StyledTableCell>
                  <StyledTableCell align="right">Password</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Type</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Usuarios?.map((data) => {
                  return (
                    <TableRow
                      key={data.id_User}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        ":hover": { background: "#81BDF7" },
                      }}
                    >
                      <TableCell align="right">{data.id_User}</TableCell>
                      <TableCell align="right">{data.name_User}</TableCell>
                      <TableCell align="right">{data.lastName_User}</TableCell>
                      <TableCell align="right">{data.email_User}m</TableCell>
                      <TableCell align="right">{data.userName}</TableCell>
                      <TableCell align="right">
                        <Tooltip title={data.password_User}>
                          {/*data.password_User*/}
                          <Chip variant="filled" label={"..."} />
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        {data.date_User.slice(0, 10)}
                      </TableCell>
                      <TableCell align="right">{data.type_User}</TableCell>
                      <TableCell align="right">
                        <Grid
                          container
                          direction={"row"}
                          justifyContent={"right"}
                        >
                          <Grid item>
                            <IconButton
                              onClick={() => navigate("" + data.id_User)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <DialogComponent
                              id={data.id_User}
                              name={data.name_User}
                              lastname={data.lastName_User}
                              token={token}
                            />
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {/*<Button variant="outlined" onClick={() => navigate("addUser")}>
        Add
      </Button>
      <TableContainer component={Paper} sx={{ width: 1000 }}>
        <Table sx={{ width: "30%", minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
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
      */}
    </div>
  );
};

export default Users;
