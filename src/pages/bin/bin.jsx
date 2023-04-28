import Drawer from "@components/drawer/drawer";
import Header from "@components/header/header";
import Delete from "@mui/icons-material/Delete";
import * as React from "react";
import styles from "./bin.module.css";

export default function Bin() {
  const binned = (
    <p className={"empty-dependency"}>
      <Delete sx={{ fontSize: "3em", opacity: 0.85, alignSelf: "center" }} />
      No binned notes
    </p>
  );

  return (
    <>
      <Drawer />
      <main className={"main"}>
        <Header />
        <section
          className={styles.binned}
          aria-label={"Your binned notes"}
          role={"region"}
        >
          <div className={styles.binEmphasis}>
            <em>Binned notes are permanently deleted after 7 days</em>
            {binned.length && (
              <button
                type={"button"}
                onClick={() => console.log("bin emptied.")}
              >
                Empty your bin
              </button>
            )}
          </div>
          {binned}
        </section>
      </main>
    </>
  );
}
