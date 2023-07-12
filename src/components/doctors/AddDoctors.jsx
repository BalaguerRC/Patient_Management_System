import { Button, Grid, Paper, TextField } from "@mui/material";

const AddDoctors = () => {
  return (
    <div>
      AddDoctors
      <Paper>
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <TextField type="text" placeholder="name..." fullWidth />
          <TextField type="text" placeholder="lastname..." fullWidth />
          <TextField type="text" placeholder="mail..." fullWidth />
          <TextField type="text" placeholder="phone..." fullWidth />
          <TextField type="text" placeholder="identity..." fullWidth />
          <TextField type="file"/>

          <Button>Save</Button>
        </Grid>
      </Paper>
    </div>
  );
};

export default AddDoctors;
