import Drawer from "@components/drawer/drawer";
import Header from "@components/header/header";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import * as React from "react";

export default function Prompts() {
  const notes_ = (
    <div className={"empty-dependency"}>
      <NotificationsNone
        sx={{ fontSize: "3em", opacity: 0.85, alignSelf: "center" }}
      />
      Notes with upcoming prompts show up here
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
