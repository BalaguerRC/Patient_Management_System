import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Chip,
  FormControl,
  Grid,
  IconButton,
  Link,
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
import { useNavigate } from "react-router-dom";
import { StyledTableCell } from "../../components/table";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const LabTestResults = () => {
  const [LabTestResults, setLabTestResults] = useState([]);
  const [Name, setName] = useState("");

  const token = localStorage.getItem("token_user");
  const theme = localStorage.getItem("theme");

  const navigate = useNavigate();

  const GetLabTestResults = () => {
    fetch(import.meta.env.VITE_APIURL + "LabTestResult", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setLabTestResults(data.data))
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
  const getLabTestResultByPatientOrDoctor = (name) => {
    fetch(import.meta.env.VITE_APIURL + "LabTestResults/byName", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLabTestResults(data.data);
        if (data.data.length === 0) GetLabTestResults();
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
    GetLabTestResults();
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
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Lab Test Results
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/medicalAppointments")}
          >
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
              <Chip label={"Lab Test Results"} />
            </Link>
          </Breadcrumbs>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Grid container direction={"row"} spacing={1} alignItems={"center"}>
              <Grid item>
                <ButtonGroup disabled>
                  <Button>Filter</Button>
                  <Button size="small">
                    <ArrowDropDownIcon />
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item>
                <FormControl sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    label={"Search"}
                    size="small"
                    placeholder="name..."
                    value={Name}
                    InputProps={{
                      startAdornment: (
                        <SearchIcon fontSize="small" sx={{ mr: 1 }} />
                      ),
                    }}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <IconButton
                    onClick={() => getLabTestResultByPatientOrDoctor(Name)}
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item sx={{ pt: 2 }}>
          <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
            <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">ID</StyledTableCell>
                  <StyledTableCell align="left">
                    {"(ID)"}PatientName
                  </StyledTableCell>
                  <StyledTableCell align="right">ID_MA</StyledTableCell>
                  <StyledTableCell align="right">LabTest</StyledTableCell>
                  <StyledTableCell align="right">Doctor</StyledTableCell>
                  <StyledTableCell align="right">Test_Result</StyledTableCell>
                  <StyledTableCell align="right">State</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {LabTestResults?.map((data) => {
                  return (
                    <TableRow
                      key={data.id_LabTestResult}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        ":hover": {
                          background: theme == 1 ? "#81BDF7" : "#729582",
                        },
                      }}
                    >
                      <TableCell align="right">
                        {data.id_LabTestResult}
                      </TableCell>
                      <TableCell align="left">
                        ({data.id_Patient}) {data.patient}
                      </TableCell>
                      <TableCell align="right">
                        {data.id_MedicalAppointment}
                      </TableCell>
                      <TableCell align="right">{data.labTest}</TableCell>
                      <TableCell align="right">{data.doctor}</TableCell>
                      <TableCell align="right">{data.test_Result}</TableCell>
                      <TableCell align="right">
                        {data.state_Result == 0 ? (
                          <Chip
                            label={"pending"}
                            variant="filled"
                            color="warning"
                          />
                        ) : (
                          <Chip
                            label={"completed"}
                            variant="filled"
                            color="success"
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {data.date_TestResult.slice(0, 10)} (
                        {data.date_TestResult.slice(11, 16)})
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

export default LabTestResults;
