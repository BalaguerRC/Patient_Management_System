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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledTableCell } from "../../components/table";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";

const MedicalAppointments = () => {
  const [Name, setName] = useState("");
  const [MAppointmets, setMAppointmets] = useState();
  const [time, setTime] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token_user");
  const theme = localStorage.getItem("theme");

  const getMAppointmets = () => {
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointments", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setMAppointmets(data.data);
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

  const GetMaByPatientOrDoctor = (name) => {
    fetch(import.meta.env.VITE_APIURL + "MedicalAppointments/byName", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        patientOrDoctor: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMAppointmets(data.data);
        if (data.data.length === 0) getMAppointmets();
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
    getMAppointmets();
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
            Medical Appointments
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
                  navigate("addMedicalAppointments");
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
              <Chip label={"Medical Appointments"} />
            </Link>
          </Breadcrumbs>
          <FormControl sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              label={"Search"}
              size="small"
              placeholder="Patient or doctor"
              value={Name}
              InputProps={{
                startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <IconButton onClick={() => GetMaByPatientOrDoctor(Name)}>
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
                  <StyledTableCell align="right">Patient</StyledTableCell>
                  <StyledTableCell align="right">Doctor</StyledTableCell>
                  <StyledTableCell align="right">Registration</StyledTableCell>
                  <StyledTableCell align="right">Hour</StyledTableCell>
                  <StyledTableCell align="right">Cause</StyledTableCell>
                  <StyledTableCell align="right">State</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {MAppointmets?.map((data) => {
                  return (
                    <TableRow
                      key={data.id_MA}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        ":hover": { background: theme == 1 ? "#81BDF7" : "#729582" },
                      }}
                    >
                      <TableCell align="right">{data.id_MA}</TableCell>
                      <TableCell align="right">{data.patient}</TableCell>
                      <TableCell align="right">{data.doctor}</TableCell>
                      <TableCell align="right">
                        {data.date_MA.slice(0, 10)}
                      </TableCell>
                      <TableCell align="right">
                        {data.date_MA.slice(11, 16)}
                      </TableCell>
                      <TableCell align="right">{data.cause_MA}</TableCell>
                      <TableCell align="right">
                        {data.state_MA === 0 ? (
                          <Chip
                            label={"pending consultation"}
                            variant="filled"
                            color="warning"
                          />
                        ) : data.state_MA === 2 ? (
                          <Chip
                            label={"completed"}
                            variant="filled"
                            color="success"
                          />
                        ) : (
                          <Chip
                            label={"pending results"}
                            variant="filled"
                            color="info"
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={
                            data.state_MA === 0
                              ? () =>
                                  navigate("pending_consultation/" + data.id_MA)
                              : data.state_MA === 2
                              ? () => navigate("results/" + data.id_Patient)
                              : () =>
                                  navigate("pending_results/" + data.id_Patient)
                          }
                          color={
                            data.state_MA === 0
                              ? "warning"
                              : data.state_MA === 2
                              ? "success"
                              : "info"
                          }
                        >
                          {data.state_MA === 0
                            ? "Check consultation"
                            : data.state_MA === 2
                            ? "Check completed results"
                            : "Check results"}
                        </Button>
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

export default MedicalAppointments;
