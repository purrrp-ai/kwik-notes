import Drawer from "@components/drawer/drawer";
import Header from "@components/header/header";
import Archive from "@mui/icons-material/Archive";
import * as React from "react";

export default function Stash() {
  const notes_ = (
    <div className={"empty-dependency"}>
      <Archive sx={{ fontSize: "3em", opacity: 0.85, alignSelf: "center" }} />
      Your stashed notes appear here
    </div>
  );

  return (
    <section className={"container"}>
      <Drawer />
      <section className={"main"}>
        <Header />
        {notes_}
      </section>
    </section>
  );
}
