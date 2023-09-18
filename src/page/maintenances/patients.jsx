import {
  Breadcrumbs,
  Button,
  Chip,
  FormControl,
  Grid,
  IconButton,
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
import { Link, useNavigate } from "react-router-dom";
import { StyledTableCell } from "../../components/table";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeletePatient from "../../components/patients/DeletePatient";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";

const Patients = () => {
  const [Patients, setPatients] = useState();
  const [Name, setName] = useState("");
  const [time, setTime] = useState(false);

  const token = localStorage.getItem("token_user");

  const navigate = useNavigate();

  const GetPatients = () => {
    fetch(import.meta.env.VITE_APIURL + "Patients", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPatients(data.data);
        console.log(data.data);
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
  const GetPatientByNameOrIdentity = (name) => {
    fetch(import.meta.env.VITE_APIURL + "Patients/byName", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name_Patient: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPatients(data.data);
        if (data.data.length === 0) GetPatients();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: "Token Expired by",
          confirmButtonText: "OK",
        });
      });
  };

  useEffect(() => {
    GetPatients();
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
          <Typography variant="h6" gutterBottom>
            Patients
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
                  navigate("addPatients");
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
              <Chip label={"Patients"} />
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
            <IconButton onClick={() => GetPatientByNameOrIdentity(Name)}>
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
                  <StyledTableCell align="right">Phone</StyledTableCell>
                  <StyledTableCell align="right">Address</StyledTableCell>
                  <StyledTableCell align="right">IDPerson</StyledTableCell>
                  <StyledTableCell align="right">Birthday</StyledTableCell>
                  <StyledTableCell align="right">Smoker</StyledTableCell>
                  <StyledTableCell align="right">Allergies</StyledTableCell>
                  <StyledTableCell align="right">Image</StyledTableCell>
                  <StyledTableCell align="right">Registration</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Patients?.map((data) => {
                  return (
                    <TableRow
                      key={data.id_Patient}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        ":hover": { background: "#81BDF7" },
                      }}
                    >
                      <TableCell align="right">{data.id_Patient}</TableCell>
                      <TableCell align="right">{data.name_Patient}</TableCell>
                      <TableCell align="right">
                        {data.lastName_Patient}
                      </TableCell>
                      <TableCell align="right">{data.phone_Patient}</TableCell>
                      <TableCell align="right">
                        <Tooltip title={data.address_Patient}>
                          {/*data.password_User*/}
                          <Chip variant="filled" label={"..."} />
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        {data.identity_Patient}
                      </TableCell>
                      <TableCell align="right">
                        {data.birthdate_Patient.slice(0, 10)}
                      </TableCell>
                      <TableCell align="right">
                        {data.smoker_Patient === 0 ? "No" : "Yes"}
                      </TableCell>
                      <TableCell align="right">
                        {data.allergies_Patient}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title={data.img_Patient}>
                          {/*data.password_User*/}
                          <Chip variant="filled" label={"..."} />
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        {data.date_Patient.slice(0, 10)} (
                        {data.date_Patient.slice(11, 16)})
                      </TableCell>
                      <TableCell align="right">
                        <Grid
                          container
                          direction={"row"}
                          justifyContent={"right"}
                        >
                          <Grid item>
                            <IconButton
                              onClick={() => navigate("" + data.id_Patient)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <DeletePatient
                              id={data.id_Patient}
                              name={data.name_Patient}
                              lastname={data.lastName_Patient}
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

export default Patients;
