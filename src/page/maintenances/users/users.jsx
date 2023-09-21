import {
  Breadcrumbs,
  Button,
  Chip,
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
import { StyledTableCell } from "../../../components/users/style/table";
import { DialogComponent } from "../../../components/users/DeleteUser";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";

const Users = () => {
  const [Usuarios, setUsuarios] = useState([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState(false);

  const token = localStorage.getItem("token_user");
  const theme = localStorage.getItem("theme");

  const GetUsers = () => {
    fetch(import.meta.env.VITE_APIURL + "Users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsuarios(data.data))
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Token Expired",
          confirmButtonText: "OK",
        });
      });
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
        setUsuarios(data.data);
        if (data.data.length === 0) GetUsers();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Token Expired",
          confirmButtonText: "OK",
        });
      });
  };

  useEffect(() => {
    GetUsers();
  }, []);

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
          {time ? (
            <LoadingButton loading variant="contained">
              Add
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                setTime(!time);
                setTimeout(() => {
                  setTime(time);
                  navigate("addUser");
                }, 500);
              }}
            >
              Add
            </Button>
          )}
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
                startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
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
                        ":hover": {
                          background: theme == 1 ? "#81BDF7" : "#729582",
                        },
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
                      <TableCell align="right">
                        <Chip
                          label={data.type_User === 1 ? "Admin" : "Doctor"}
                          variant={data.type_User === 1 ? "outlined" : "filled"}
                        />
                      </TableCell>
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
    </div>
  );
};

export default Users;
