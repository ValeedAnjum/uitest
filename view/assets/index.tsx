"use client";

import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import AvailableCars from "./available-cars/available-cars";
import { UseAsset } from "./use-asset";
import { IsFetching } from "@/atom/is-fetching/is-fecthing";
import { useEffect, useState } from "react";

const CarInfoCard = ({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) => {
  return (
    <Box>
      <Typography sx={{ color: "#C6DCFC", fontSize: "1rem" }}>
        {primary}
      </Typography>
      <Typography sx={{ color: "white", fontSize: "1.25rem" }}>
        {secondary}
      </Typography>
    </Box>
  );
};

const Line = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "0",
        left: "-2rem",
        height: "100%",
      }}
    />
  );
};
const CardContentContainer = ({ currentCar }: any) => {
  const { fuelUsage, Driver, Price, topSpeed } = currentCar;
  return (
    <Grid container flexDirection="column" sx={{ p: "2rem 1rem" }}>
      <Grid container item>
        <Grid item sm={6}>
          <CarInfoCard
            primary="Fuel Usage"
            secondary={fuelUsage ? `${fuelUsage} Ltr` : "----"}
          />
        </Grid>
        <Grid item sm={6} sx={{ position: "relative" }}>
          <CarInfoCard
            primary="KM Driven"
            secondary={Driver ? `${Driver}` : "----"}
          />
          <Line />
        </Grid>
      </Grid>
      <Grid item container sx={{ mt: "1rem" }}>
        <Grid item sm={6}>
          <CarInfoCard
            primary="Total cost"
            secondary={Price ? `$ ${Price}` : "----"}
          />
        </Grid>
        <Grid item sm={6} sx={{ position: "relative" }}>
          <CarInfoCard
            primary="Top Speed"
            secondary={topSpeed ? `${topSpeed} mph` : "----"}
          />
          <Line />
        </Grid>
      </Grid>
    </Grid>
  );
};

const CarNameAndImage = ({ name, year, image }: any) => {
  return (
    <Grid
      item
      sx={{
        backgroundColor: "white",
        borderRadius: "0.875rem",
        padding: "0 2rem",
        maxHeight: "400px",
        position: "relative",
      }}
    >
      <Typography sx={{ fontSize: "1.9rem", fontWeight: "bold" }}>
        {year} {name}
      </Typography>
      <Box
        sx={{
          height: "269px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Image src={image} fill alt="Logo" quality={100} />
      </Box>
      <Box
        sx={{
          height: "269px",
          top: "-214px",
          position: "relative",
          width: "100%",
        }}
      >
        <Image src="/assets/images/circles.svg" fill alt="Logo" quality={100} />
      </Box>
    </Grid>
  );
};

const NotesCards = () => {
  return (
    <>
      <Grid item>
        <Typography
          sx={{ fontSize: "1.25rem", fontWeight: "bold", mb: "1rem" }}
        >
          Notes
        </Typography>
      </Grid>
      <Grid item>
        {/* Notes cards */}
        <Box sx={{ display: "flex" }}>
          <Box>
            <Box
              sx={{
                width: "44px",
                height: "44px",
                boxShadow: "0px 2px 4px rgba(147, 144, 144, 0.2)",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              <Image
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
                src={`/assets/icons/sms.svg`}
                width={20}
                height={20}
                alt="dashboard_icon"
              />
            </Box>
          </Box>
          <Box sx={{ pl: "1rem" }}>
            <Typography
              sx={{
                fontSize: "0.813rem",
                fontWeight: "medium",
              }}
            >
              Monday, 6th Apirl 2020
            </Typography>
            <Typography
              sx={{
                fontSize: "0.688rem",
                color: "#72767C",
              }}
            >
              Book for General Service
            </Typography>
            <button
              style={{
                textTransform: "uppercase",
                border: "none",
                padding: "5px",
                backgroundColor: "#70CF97",
                color: "white",
                fontSize: "10px",
                fontWeight: "bold",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              completed
            </button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", mt: "1rem" }}>
          <Box>
            <Box
              sx={{
                width: "44px",
                height: "44px",
                boxShadow: "0px 2px 4px rgba(147, 144, 144, 0.2)",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              <Image
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
                src={`/assets/icons/vector.svg`}
                width={20}
                height={20}
                alt="dashboard_icon"
              />
            </Box>
          </Box>
          <Box sx={{ pl: "1rem" }}>
            <Typography
              sx={{
                fontSize: "0.813rem",
                fontWeight: "medium",
              }}
            >
              Thursday, 24th October 2021
            </Typography>
            <Typography
              sx={{
                fontSize: "0.688rem",
                color: "#72767C",
              }}
            >
              Vehicle LV 001 has been marked for recall.
            </Typography>
            <button
              style={{
                textTransform: "uppercase",
                border: "none",
                padding: "5px",
                backgroundColor: "#ECEEF0",
                color: "black",
                fontSize: "10px",
                fontWeight: "bold",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              14:07-21/11/2021
            </button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", mt: "1rem" }}>
          <Box>
            <Box
              sx={{
                width: "44px",
                height: "44px",
                boxShadow: "0px 2px 4px rgba(147, 144, 144, 0.2)",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              <Image
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
                src={`/assets/icons/tool.svg`}
                width={20}
                height={20}
                alt="dashboard_icon"
              />
            </Box>
          </Box>
          <Box sx={{ pl: "1rem" }}>
            <Typography
              sx={{
                fontSize: "0.813rem",
                fontWeight: "medium",
              }}
            >
              Monday, 13th August 2018
            </Typography>
            <Typography
              sx={{
                fontSize: "0.688rem",
                color: "#72767C",
              }}
            >
              Maintenance Completed, Collect
            </Typography>
            <button
              style={{
                textTransform: "uppercase",
                border: "none",
                padding: "5px",
                backgroundColor: "#ECEEF0",
                color: "black",
                fontSize: "10px",
                fontWeight: "bold",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "0.5rem",
              }}
            >
              14:07-21/11/2021
            </button>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
const CarConatiner = ({ currentCar }: any) => {
  return (
    <Grid
      item
      sm={3}
      sx={{
        // height: "calc(100vh - 190px)",
        height: "calc(100vh - 310px)",
        minWidth: "361px",
        backgroundColor: "#438FFE",
        borderRadius: "14px",
        position: "relative",
      }}
    >
      <CardContentContainer currentCar={currentCar} />
      <Box
        sx={{
          position: "absolute",
          bottom: "-20%",
          left: 0,
          width: "100%",
          height: "80%",
        }}
      >
        <Image
          src="/assets/images/vertical-car.svg"
          fill
          alt="Logo"
          quality={100}
        />
      </Box>
      {/* <Box
        sx={{
          position: "absolute",
          height: "500px",
          bottom: "-80px",
          width: "100%",
        }}
      >
        <Image
          src="/assets/images/vertical-car.svg"
          fill
          alt="Logo"
          quality={100}
        />
      </Box> */}
    </Grid>
  );
};
export const AssetView = () => {
  const { availableCars, currentCar, handleCurrentCarUpdate } = UseAsset();

  return (
    <>
      <Typography
        sx={{
          height: "calc(100vh - 98px)",
          display: { lg: "block", xl: "none" },
        }}
      >
        Please View It Screen larger than 1536Px width
      </Typography>
      <Grid
        sx={{
          height: "calc(100vh - 98px)",
          position: "relative",
          display: { lg: "none", xl: "block" },
          overflow: "hidden",
        }}
      >
        <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Assets
        </Typography>
        <Grid container>
          {/* car container */}
          <CarConatiner currentCar={currentCar} />
          {/* car info */}
          <Grid
            item
            md={6}
            sm={12}
            xs={12}
            sx={{
              rowGap: "1rem",
              p: "0 2rem",
            }}
            container
            flexDirection="column"
          >
            <CarNameAndImage
              name={currentCar?.modal ? `${currentCar?.modal}` : "----"}
              year={currentCar?.Year ? `${currentCar?.Year}` : "----"}
              image={currentCar?.image ? `${currentCar?.image}` : "----"}
            />
            <Grid
              item
              container
              justifyContent="space-between"
              gap={2}
              flexWrap="nowrap"
            >
              <Grid
                item
                sm={6}
                sx={{
                  backgroundColor: "white",
                  p: "1.25rem ",
                  borderRadius: "14px",
                }}
                container
                direction="column"
              >
                {/* Notes Cards  */}
                <NotesCards />
              </Grid>
              <Grid
                item
                sm={6}
                sx={{
                  backgroundColor: "white",
                  p: "1.25rem ",
                  borderRadius: "14px",
                }}
              >
                <AvailableCars
                  availableCars={availableCars}
                  handleCurrentCarUpdate={handleCurrentCarUpdate}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
