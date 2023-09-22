import { Avatar, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Top4Patients = () => {
  const [patients, setPatients] = useState([]);

  const data = JSON.parse(localStorage.getItem("data_user"));

  const navigate = useNavigate();

  const GetTop4Patients = () => {
    fetch(import.meta.env.VITE_APIURL + "PatientsTop4")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setPatients(data.data);
        //localStorage.setItem("dashboard", JSON.stringify(data.data));
      });
  };
  useEffect(() => {
    GetTop4Patients();
  }, []);

  return (
    <>
      {patients.map((data, index) => (
        <Grid item key={index}>
          <Paper
            sx={{
              p: 1,
            }}
            variant="outlined"
          >
            <Grid
              container
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar src={data.img_Patient} alt={data.name_Patient} />
                <Typography ml={2}>
                  {data.name_Patient} {data.lastName_Patient}
                </Typography>
              </Grid>
              <Grid item>
                <Chip label="new" size="small" />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
      {data?.type === 1 ? null : (
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button size="small" fullWidth onClick={()=>navigate("/patients")}>
            View More
          </Button>
        </Grid>
      )}
    </>
  );
};

export default Top4Patients;
