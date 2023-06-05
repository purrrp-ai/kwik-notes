import CloseIcon from "@mui/icons-material/Close";
import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../context-provider";
import styles from "./notification.module.css";

export default function Notification() {
  const {
    message: { color, info },
    setMessage,
  } = useContext(Context);

  const [show, setShow] = useState(false);

  const dismissNotification = useCallback(() => {
    setShow(false);
    setTimeout(() => setMessage({ color: null, info: null }), 250);
  }, [setMessage]);

  useEffect(() => {
    if (info) {
      setTimeout(() => setShow(true), 250);
      const timeoutId = setTimeout(() => dismissNotification(), 5250);
      return () => clearTimeout(timeoutId);
    }
  }, [info, dismissNotification]);

  return (
    <div
      className={`${styles.notification} ${styles[color] && styles[color]} ${
        !show && [styles.hide]
      }`}
    >
      {info && (
        <>
          <p className={styles.notificationInfo}>{info}</p>
          <button
            type={"button"}
            className={styles.dismissBtn}
            onClick={dismissNotification}
          >
            <CloseIcon color={"inherit"} />
          </button>
        </>
      )}
    </div>
  );
}
