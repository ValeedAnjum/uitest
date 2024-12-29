import { Box, Checkbox, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

function formatNumber(num: any) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

const CarItem = ({ model, fuelUsage, active, onClick }: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        width: "100%",
        userSelect: "none",
        transition: "color 0.3s ease",
        ...(active && {
          color: "#F84F56",
        }),
        "&:hover": {
          color: "#F84F56",
        },
      }}
      onClick={onClick}
    >
      <Checkbox
        disableRipple
        checked={active}
        sx={{
          p: "0",
          mr: "0.5rem",
          "&.Mui-checked": {
            color: "#F84F56",
          },
        }}
      />
      <Typography sx={{ flexGrow: 1 }}>
        {model}
        <span style={{ color: "#72767C", marginLeft: "0.5rem" }}>
          ({formatNumber(Number(fuelUsage))} km)
        </span>
      </Typography>
      <Image
        src="./assets/icons/line-chart.svg"
        width={20}
        height={20}
        alt="line-chart"
      />
    </Box>
  );
};
const Header = () => {
  return (
    <>
      <Typography sx={{ flexGrow: 1, fontSize: "18px", color: "black" }}>
        Available Cars
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: "#72767C",
          cursor: "pointer",
        }}
      >
        <Typography>Assets</Typography>
        <Image
          style={{ marginLeft: "0.5rem" }}
          src="./assets/icons/rectangle.svg"
          width={9}
          height={9}
          alt="reactangle-option"
        />
      </Box>
    </>
  );
};
const AvailabelCars = ({ availableCars, handleCurrentCarUpdate }: any) => {
  const [activeCarIndex, setAvtiveCarIndex] = useState(null);

  const handleCarClick = (index: any) => {
    if (index === activeCarIndex) {
      setAvtiveCarIndex(null);
      handleCurrentCarUpdate(null);
      return;
    }
    handleCurrentCarUpdate(index);
    setAvtiveCarIndex(index);
  };
  return (
    <Grid container direction="column" sx={{ height: "100%" }}>
      <Grid
        item
        container
        sx={{ borderBottom: "1px solid #F3F3F3", pb: "0.8rem", mb: "0.5rem" }}
      >
        <Header />
      </Grid>
      <Grid item container sx={{ flexGrow: 1 }}>
        {/* car item  */}
        {/* <CarItem />
        <CarItem />
        <CarItem />
        <CarItem />
        <CarItem /> */}
        {availableCars.length > 1 &&
          availableCars.map((car: any, index: any) => (
            <CarItem
              onClick={() => handleCarClick(index)}
              key={index}
              model={car.modal}
              fuelUsage={car.fuelUsage}
              active={index === activeCarIndex}
            />
          ))}
      </Grid>
      <Grid item>
        <button
          style={{
            border: "none",
            padding: " 5px 12px",
            backgroundColor: "#FF6370",
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "0.5rem",
          }}
        >
          See All
        </button>
      </Grid>
    </Grid>
  );
};

export default AvailabelCars;
