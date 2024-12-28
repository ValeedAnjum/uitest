import React from "react";
import Image from "next/image";
import { Box, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

const SideBarNavLink = ({
  label,
  iconPathName,
  link,
}: {
  label: string;
  iconPathName: string;
  link: string;
}) => {
  const pathname = usePathname();
  return (
    <Link href={link} sx={{ textDecoration: "none" }}>
      <Box
        sx={{
          display: "flex",
          // backgroundColor: "#F3F5F8",
          padding: " 7px 8px",
          borderRadius: "6px",
          cursor: "pointer",
          userSelect: "none",
          maxHeight: "34px",
          alignItems: "center",
          transition: "background-color 0.3s ease",
          ...(pathname === link && {
            backgroundColor: "#F3F5F8",
          }),
          "&:hover": {
            backgroundColor: "#F0F3F6",
          },
        }}
      >
        <Image
          src={`/assets/icons/${iconPathName}.svg`}
          width={20}
          height={20}
          alt="dashboard_icon"
        />
        {/* <span style={{ color: "5F6165" }}>{label}</span> */}
        <Typography variant="body2" sx={{ ml: "7px", color: "#5F6165" }}>
          {label}
        </Typography>
      </Box>
    </Link>
  );
};
const LeftSideBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "34px",
        }}
      >
        <Image src="/assets/icons/logo.svg" width={27} height={27} alt="Logo" />
        <Typography
          variant="h4"
          sx={{ ml: "7px", fontSize: "24px", fontWeight: "bold" }}
        >
          Test
        </Typography>
      </Box>

      <Box
        sx={{
          maxWidth: "174px",
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          flexGrow: 1,
        }}
      >
        <SideBarNavLink
          label="Dashboard"
          iconPathName="dashboard"
          link="/dashboard"
        />
        <SideBarNavLink label="Assets" iconPathName="asset" link="/asset" />
        <SideBarNavLink
          label="Booking"
          iconPathName="booking"
          link="/booking"
        />
        <SideBarNavLink
          label="Sell Cars"
          iconPathName="shoping-bag"
          link="/sell-cars"
        />
        <SideBarNavLink
          label="Buy Cars"
          iconPathName="shoping-cart"
          link="/shoping-cart"
        />
        <SideBarNavLink
          label="Services"
          iconPathName="fencing"
          link="/fencing"
        />
        <SideBarNavLink
          label="Calender"
          iconPathName="calender"
          link="/calender"
        />
        <SideBarNavLink
          label="Messages"
          iconPathName="comment"
          link="/comment"
        />
      </Box>
      <Box
        sx={{
          maxWidth: "174px",
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
        }}
      >
        <SideBarNavLink
          label="Settings"
          iconPathName="setting"
          link="/setting"
        />
        <SideBarNavLink
          label="Log out"
          iconPathName="sign-out"
          link="/sign-out"
        />
      </Box>
    </Box>
  );
};

export default LeftSideBar;
