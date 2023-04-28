import AddNote from "@components/add-note/add-note";
import Drawer from "@components/drawer/drawer";
import Header from "@components/header/header";
import Note from "@components/note/note";
import { KwikNotesContext } from "@context/kwik-notes_context-provider";
import LightBulb from "@mui/icons-material/Lightbulb";
import Masonry from "@mui/lab/Masonry";
import React, { useContext } from "react";
import styles from "./notes.module.css";

export default function Notes() {
  const { contexts } = useContext(KwikNotesContext);

  let notes_ = null;

  if (contexts.notes) {
    notes_ = contexts.masonryDisplay ? (
      <Masonry
        columns={{
          xl: drawerCollapsed ? 7 : 6,
          lg: drawerCollapsed ? 5 : 4,
          sm: 3,
          xs: 1,
        }}
        // spacing={1.25}
        // sx={{ mt: 8 }}
        className={styles["notes-wrapper_grid"]}
      >
        {contexts.notes
          .slice()
          .reverse()
          .map((note) => (
            <Note key={note.id} note={note} />
          ))}
      </Masonry>
    ) : (
      <div className={styles["notes-wrapper_list"]}>
        {contexts.notes
          .slice()
          .reverse()
          .map((note) => (
            <Note key={note.id} note={note} />
          ))}
      </div>
    );
  } else {
    notes_ = (
      <p className={"empty-dependency"} aria-live={"polite"}>
        <LightBulb
          sx={{ fontSize: "3em", opacity: 0.85, alignSelf: "center" }}
        />
        Added notes show up here
      </p>
    );
  }

  return (
    <>
      <Drawer />
      <main className={"main"}>
        <Header />
        <section
          className={styles.notes}
          aria-label={"Your notes"}
          role={"region"}
        >
          <AddNote />
          {notes_}
        </section>
      </main>
    </>
  );
}
