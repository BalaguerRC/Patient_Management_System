import {
  Avatar,
  Breadcrumbs,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledTableCell } from "../../components/table";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteDoctor } from "../../components/doctors/DeleteDoctor";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
//import DeleteIcon from "@mui/icons-material/Delete";

// CommonJS

const Doctors = () => {
  const [Doctores, setDoctores] = useState([]);
  const [Name, setName] = useState("");
  const [time, setTime] = useState(false);

  const token = localStorage.getItem("token_user");

  const theme = localStorage.getItem("theme");

  const navigate = useNavigate();

  const GetDoctors = () => {
    fetch(import.meta.env.VITE_APIURL + "Doctors", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setDoctores(data.data))
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

  const GetDoctorsByNameOrIdentity = (name) => {
    fetch(import.meta.env.VITE_APIURL + "Doctors/byName", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name_Doctor: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDoctores(data.data);
        if (data.data.length === 0) GetDoctors();
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
    GetDoctors();
  }, []);

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
          <Typography variant="h6" gutterBottom sx={{ fontWeight:600}}>
            Doctors
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
                  navigate("addDoctors");
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
              <Chip label={"Doctors"} />
            </Link>
          </Breadcrumbs>
          <FormControl sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              label={"Search"}
              size="small"
              placeholder="name or identity"
              value={Name}
              InputProps={{
                startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <IconButton onClick={() => GetDoctorsByNameOrIdentity(Name)}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </FormControl>
        </Grid>

        <Grid item sx={{ pt: 2 }}>
          <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
            <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Last Name</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Phone</StyledTableCell>
                  <StyledTableCell align="right">IDPerson</StyledTableCell>
                  <StyledTableCell align="right">Image</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Doctores?.map((data) => {
                  return (
                    <TableRow
                      key={data.id_Doctor}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        ":hover": {
                          background: theme == 1 ? "#81BDF7" : "#729582",
                        },
                      }}
                    >
                      <TableCell align="right">{data.id_Doctor}</TableCell>
                      <TableCell align="right">{data.name_Doctor}</TableCell>
                      <TableCell align="right">
                        {data.lastName_Doctor}
                      </TableCell>
                      <TableCell align="right">{data.email_Doctor}</TableCell>
                      <TableCell align="right">{data.phone_Doctor}</TableCell>
                      <TableCell align="right">
                        {data.identity_Doctor}
                      </TableCell>
                      <TableCell align="right">
                        <Avatar alt="Perfil" src={data.img_Doctor} />
                      </TableCell>
                      <TableCell align="right">
                        <Grid
                          container
                          direction={"row"}
                          justifyContent={"right"}
                        >
                          <Grid item>
                            <IconButton
                              onClick={() => navigate("" + data.id_Doctor)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <DeleteDoctor
                              id={data.id_Doctor}
                              name={data.name_Doctor}
                              lastname={data.lastName_Doctor}
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
        <Grid
          item
          pt={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Pagination count={5} variant="outlined" disabled shape="rounded" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Doctors;
