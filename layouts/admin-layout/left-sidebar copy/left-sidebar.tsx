import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Box } from "@mui/material";
// import { Box } from "@mui/material";

const SideBarNavLink = ({
  label,
  iconPathName,
}: {
  label: string;
  iconPathName: string;
}) => {
  return (
    <div className={styles.nav_link_item}>
      <Image
        src={`/assets/icons/${iconPathName}.svg`}
        width={20}
        height={20}
        alt="dashboard_icon"
      />
      <span>{label}</span>
    </div>
  );
};
const LeftSideBar = () => {
  return (
    <div className={styles.left_sidebar}>
      <div className={styles.logo}>
        <Image src="/assets/icons/logo.svg" width={27} height={27} alt="Logo" />
        <h3 className={styles.heading}>Test</h3>
      </div>

      <div className={styles.nav_links_container}>
        <SideBarNavLink label="Dashboard" iconPathName="dashboard" />
        <SideBarNavLink label="Assets" iconPathName="asset" />
        <SideBarNavLink label="Booking" iconPathName="booking" />
        <SideBarNavLink label="Sell Cars" iconPathName="shoping-bag" />
        <SideBarNavLink label="Buy Cars" iconPathName="shoping-cart" />
        <SideBarNavLink label="Services" iconPathName="fencing" />
        <SideBarNavLink label="Calender" iconPathName="calender" />
        <SideBarNavLink label="Messages" iconPathName="comment" />
        {/* <Box sx={{ border: "1px solid blue", flexGrow: 1 }} />
        <SideBarNavLink label="Settings" iconPathName="setting" />
        <SideBarNavLink label="Log out" iconPathName="sign-out" /> */}
      </div>
      <Box sx={{ border: "1px solid red" }}>as</Box>
    </div>
  );
};

export default LeftSideBar;
