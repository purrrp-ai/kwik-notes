import Drawer from "@components/drawer/drawer";
import Header from "@components/header/header";
import Delete from "@mui/icons-material/Delete";
import * as React from "react";
import style from "./bin.module.css";

export default function Bin() {
  const notes_ = (
    <div className={"empty-dependency"}>
      <Delete sx={{ fontSize: "3em", opacity: 0.85, alignSelf: "center" }} />
      No binned notes
    </div>
  );

  return (
    <section className={"container"}>
      <Drawer />
      <section className={"main"}>
        <Header />
        <div className={style["bin-emphasis"]}>
          Binned notes are permanently deleted after 7 days
        </div>
        {notes_}
      </section>
    </section>
  );
}
