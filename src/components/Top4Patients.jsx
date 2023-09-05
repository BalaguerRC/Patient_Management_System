import { Avatar, Chip, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Top4Patients = () => {
  const [patients, setPatients] = useState([]);
  const GetTop4Patients = () => {
    fetch(import.meta.env.VITE_APIURL + "Patients/top4")
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
          >
            <Grid container direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
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
    </>
  );
};

export default Top4Patients;
