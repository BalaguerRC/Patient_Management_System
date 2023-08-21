import {
  Avatar,
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
import { DeleteDoctor } from "../../components/doctors/DeleteDoctor";
//import DeleteIcon from "@mui/icons-material/Delete";

const Doctors = () => {
  const [Doctores, setDoctores] = useState([]);
  const [Name, setName] = useState("");

  const token = localStorage.getItem("token_user");

  const navigate = useNavigate();

  const GetDoctors = () => {
    fetch(import.meta.env.VITE_APIURL + "Doctors", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setDoctores(data.data));
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
      });
  };

  /*const deleteDoctor = (id) => {
    fetch(import.meta.env.VITE_APIURL + "Doctors/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        GetDoctors();
      });
  };*/

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
          <Typography variant="h6" gutterBottom>
            Doctors
          </Typography>
          <Button variant="contained" onClick={() => navigate("addDoctors")}>
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
                startAdornment: <SearchIcon fontSize="small" />,
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <IconButton onClick={() => GetDoctorsByNameOrIdentity(Name)}>
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
                        ":hover": { background: "#81BDF7" },
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
                        <Tooltip title={data.img_Doctor}>
                          {/*data.password_User*/}
                          <Chip variant="filled" label={"..."} />
                        </Tooltip>
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
      </Grid>
    </div>
  );
};

{
  /**
  <div>
      Doctors
      <Button variant="contained" onClick={() => navigate("addDoctors")}>
        Add
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%", minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>IDPerson</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Doctores?.map((data) => (
              <TableRow key={data.id_Doctor}>
                <TableCell>{data.id_Doctor}</TableCell>
                <TableCell>{data.name_Doctor}</TableCell>
                <TableCell>{data.lastName_Doctor}</TableCell>
                <TableCell>{data.email_Doctor}</TableCell>
                <TableCell>{data.phone_Doctor}</TableCell>
                <TableCell>{data.identity_Doctor}</TableCell>
                <TableCell>{data.img_Doctor}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => navigate("" + data.id_Doctor)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => deleteDoctor(data.id_Doctor)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
   */
}
export default Doctors;
