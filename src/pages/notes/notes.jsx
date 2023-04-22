import AddNote from "@components/add-note/add-note";
import Drawer from "@components/drawer/drawer";
import Header from "@components/header/header";
import { KwikNotesContext } from "@context/kwik-notes_context-provider";
import LightBulb from "@mui/icons-material/Lightbulb";
import Masonry from "@mui/lab/Masonry";
import * as React from "react";
import Note from "./note/note";
import classes from "./notes.module.css";

export default function Notes() {
  const { drawerOpen, notes, displayMasonry } =
    React.useContext(KwikNotesContext);

  let notes_ = null;

  if (notes) {
    notes_ = displayMasonry ? (
      <Masonry
        columns={{
          xl: drawerOpen ? 6 : 7,
          lg: drawerOpen ? 4 : 5,
          sm: 3,
          xs: 1,
        }}
        spacing={1.25}
        sx={{ mt: 8 }}
        className={classes["notes-wrapper_grid"]}
      >
        {notes
          .slice()
          .reverse()
          .map((note) => (
            <Note key={note.id} note={note} />
          ))}
      </Masonry>
    ) : (
      <div className={classes["notes-wrapper_list"]}>
        {notes
          .slice()
          .reverse()
          .map((note) => (
            <Note key={note.id} note={note} />
          ))}
      </div>
    );
  } else {
    notes_ = (
      <div className={"empty-dependency"}>
        <LightBulb
          sx={{ fontSize: "3em", opacity: 0.85, alignSelf: "center" }}
        />
        Added notes show up here
      </div>
    );
  }

  return (
    <section className={"container"}>
      <Drawer />
      <section className={"main"}>
        <Header />
        <AddNote />
        {notes_}
      </section>
    </section>
  );
}
