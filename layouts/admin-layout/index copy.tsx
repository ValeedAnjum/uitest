import { ReactNode } from "react";
import styles from "./styles.module.css";
import LeftSideBar from "./left-sidebar/left-sidebar";
import { Typography } from "@mui/material";

export const AdminDashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.main_dashboard_conatiner}>
      <div className={styles.left_sidebar}>
        <LeftSideBar />
      </div>
      <div className={styles.rigth_container}>
        <div className={styles.top_bar}>Top Bar</div>
        {children}
        <Typography variant="h2">Hey</Typography>
      </div>
    </div>
  );
};
