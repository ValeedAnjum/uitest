"use client";

import { ReactNode } from "react";
import { Box, Grid } from "@mui/material";
import LeftSideBar from "./left-sidebar/left-sidebar";
import Image from "next/image";

export const AdminDashboard = ({ children }: { children: ReactNode }) => {
  return (
    <Grid container>
      {/* Left Side bar */}
      <Grid
        item
        sx={{
          width: "248px",
          // border: "1px solid black",
          height: "100vh",
          position: "fixed",
        }}
      >
        <Box sx={{ padding: "30px 24px", height: "100%" }}>
          <LeftSideBar />
        </Box>
      </Grid>
      {/* top bar and connet area */}
      <Grid
        item
        sx={{
          // border: "1px solid blue",
          flexGrow: 1,
          paddingLeft: "248px",
        }}
      >
        <Box
          sx={{
            borderLeft: "1px solid #F5F5F5",
            backgroundColor: "white",
            height: "78px",
            position: "fixed",
            padding: "15px 20px",
            width: "calc(100% - 248px)",
          }}
        >
          <Box
            sx={{
              height: "100%",
              // border: "1px solid blue",
              display: "flex",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  width: "358px",
                  backgroundColor: "#F5F4F6",
                  height: "100%",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "12px",
                }}
              >
                <Box
                  sx={{
                    marginRight: "5px",
                    display: "flex",
                  }}
                >
                  <Image
                    src={`/assets/icons/search.svg`}
                    width={20}
                    height={20}
                    alt="dashboard_icon"
                  />
                </Box>
                <Box
                  sx={{
                    border: "1px solid #EF9011",
                    mr: "5px",
                    height: "22px",
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <input
                    type="text"
                    placeholder="Search or type"
                    style={{
                      fontSize: "16px",
                      border: "none",
                      width: "100%",
                      backgroundColor: "transparent",
                      outline: "none",
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", width: "106px" }}>
              {/* Notification */}
              <Box sx={{ display: "flex", flexGrow: "1" }}>
                <Image
                  style={{ cursor: "pointer" }}
                  src={`/assets/icons/notification.svg`}
                  width={20}
                  height={20}
                  alt="dashboard_icon"
                />
              </Box>
              {/* User Image  */}
              <Box sx={{ height: "100%" }}>
                <Image
                  style={{ cursor: "pointer" }}
                  src={`/assets/avatar/user.svg`}
                  width={48}
                  height={48}
                  alt="dashboard_icon"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            padding: "10px 10px",
            backgroundColor: "#F5F5F5",
            marginTop: "78px",
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};
