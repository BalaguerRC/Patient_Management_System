import {
  Box,
  Breadcrumbs,
  Button,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteLabTest from "../../components/labTests/DeleteLabTest";
import { LoadingButton } from "@mui/lab";
import Swal from "sweetalert2";
import Info from "../../components/labTests/Info";

const LabTest = () => {
  const [LabTests, setLabTests] = useState([]);
  const [Name, setName] = useState("");
  const [time, setTime] = useState(false);

  const token = localStorage.getItem("token_user");
  const theme = localStorage.getItem("theme");

  const getLabTests = () => {
    fetch(import.meta.env.VITE_APIURL + "LabTest", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setLabTests(data.data))
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

  const getLabTestByName = (name) => {
    fetch(import.meta.env.VITE_APIURL + "LabTest/byName", {
      method: "POST",
      headers: {
        "Content-Type": "application/Json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name_LabTest: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLabTests(data.data);
        if (data.data.length === 0) getLabTests();
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

  const navigate = useNavigate();

  /*const Delete = (id) => {
    console.log("Delete", id);
    fetch(import.meta.env.VITE_APIURL + "LabTest/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getLabTests();
      });
  };*/

  useEffect(() => {
    getLabTests();
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
            Lab Test
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
                  navigate("addLabTest");
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
              <Chip label={"Lab Test"} />
            </Link>
          </Breadcrumbs>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Grid container direction={"row"} spacing={1} alignItems={"center"}>
              <Grid item>
                <Info/>
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
                  <IconButton onClick={() => getLabTestByName(Name)}>
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
                  <StyledTableCell align="right">Id</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {LabTests?.map((data) => {
                  return (
                    <TableRow
                      key={data.id_LabTest}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        ":hover": {
                          background: theme == 1 ? "#81BDF7" : "#729582",
                        },
                      }}
                    >
                      <TableCell align="right">{data.id_LabTest}</TableCell>
                      <TableCell align="right">{data.name_LabTest}</TableCell>
                      <TableCell align="right">
                        {data.date_LabTest.slice(0, 10)} (
                        {data.date_LabTest.slice(11, 16)})
                      </TableCell>
                      <TableCell align="right">
                        <Grid
                          container
                          direction={"row"}
                          justifyContent={"right"}
                        >
                          <Grid item>
                            <IconButton
                              onClick={() => navigate("" + data.id_LabTest)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <DeleteLabTest
                              id={data.id_LabTest}
                              name={data.name_LabTest}
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

export default LabTest;
