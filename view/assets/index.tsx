import { Grid, Typography } from "@mui/material";

export const AssetView = () => {
  return (
    <Grid sx={{ height: "calc(100vh - 98px)", border: "1px solid red" }}>
      <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
        Assets
      </Typography>
    </Grid>
  );
};
