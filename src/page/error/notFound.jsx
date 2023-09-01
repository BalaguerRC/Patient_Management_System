import { Grid, Link, Typography } from "@mui/material";

const Notfound = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Typography variant="h4">404 - Not Found</Typography>
      </Grid>
      <Grid item>
        <Link href="/" underline="none">Home</Link>
      </Grid>
    </Grid>
  );
};

export default Notfound;
