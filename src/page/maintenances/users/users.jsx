import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
/*const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));*/

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
          <TextField
            label={"Search"}
            size="small"
            placeholder="name..."
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" />,
            }}
          />
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
                        <Chip
                          variant="filled"
                          label={
                            <Typography variant="caption" noWrap>
                              {data.password_User}
                            </Typography>
                          }/>
                      </TableCell>
                      <TableCell align="right">
                        {data.date_User.slice(0, 10)}
                      </TableCell>
                      <TableCell align="right">{data.type_User}</TableCell>
                      <TableCell align="right"></TableCell>
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
      </TableContainer>*/}
    </div>
  );
};

export default Users;
