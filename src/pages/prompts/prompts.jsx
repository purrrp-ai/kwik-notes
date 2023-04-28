import Drawer from "@components/drawer/drawer";
import Header from "@components/header/header";
import AddNote from "@components/add-note/add-note";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import * as React from "react";
import styles from "./prompts.module.css";

export default function Prompts() {
  const prompts = (
    <p className={"empty-dependency"}>
      <NotificationsNone
        sx={{ fontSize: "3em", opacity: 0.85, alignSelf: "center" }}
      />
      Notes with upcoming prompts show up here
    </p>
  );

  return (
    <>
      <Drawer />
      <main className={"main"}>
        <Header />
        <section
          className={styles.prompts}
          aria-label={"Your prompts"}
          role={"region"}
        >
          <AddNote />
          {prompts}
        </section>
      </main>
    </>
  );
}
