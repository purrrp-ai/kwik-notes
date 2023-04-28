import { KwikNotesContext } from "@context/kwik-notes_context-provider";
import CloseRounded from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import React, { useContext } from "react";
import styles from "./notification.module.css";

const Notification = ({ message }) => {
  const { contexts, setContexts } = useContext(KwikNotesContext);
  return (
    <div className={styles.notification}>
      <p style={{ all: "unset" }}>{message}</p>
      <IconButton type={"button"} onClick={() => console.log("notif closed")}>
        <CloseRounded />
      </IconButton>
    </div>
  );
};

export default Notification;
