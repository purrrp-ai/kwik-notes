import Drawer from "@components/drawer/drawer";
import Header from "@components/header/header";
import Archive from "@mui/icons-material/Archive";
import * as React from "react";
import styles from "./stash.module.css";

export default function Stash() {
  const stashes = (
    <p className={"empty-dependency"}>
      <Archive sx={{ fontSize: "3em", opacity: 0.85, alignSelf: "center" }} />
      Your stashed notes appear here
    </p>
  );

  return (
    <>
      <Drawer />
      <main className={"main"}>
        <Header />
        <section
          className={styles.stashes}
          aria-label={"Your stash"}
          role={"region"}
        >
          {stashes}
        </section>
      </main>
    </>
  );
}
