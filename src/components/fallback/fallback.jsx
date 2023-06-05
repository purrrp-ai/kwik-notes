import LinearProgress from "@mui/material/LinearProgress";
import styles from "./fallback.module.css";

export default function Fallback() {
  return (
    <div className={styles.fallback}>
      <div style={{ textAlign: "center" }}>
        <LinearProgress
          color={"inherit"}
          sx={{ minWidth: "360px", width: "40%", maxWidth: "720px" }}
        />
        <h1>Hold Tight...</h1>
      </div>
    </div>
  );
}
