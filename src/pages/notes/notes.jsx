import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Masonry from "@mui/lab/Masonry";
import { useContext, useState } from "react";
import AddNote from "../../components/add-note/add-note";
import { Context } from "../../components/context-provider";
import Drawer from "../../components/drawer/drawer";
import Header from "../../components/header/header";
import Note from "../../components/note/note";
import styles from "./notes.module.css";

export default function Notes() {
  const { user, gridView, navOpen, setShowSignIn } = useContext(Context);

  const [textDecoration, setTextDecoration] = useState("underline");

  const handleMouseEnter = () => setTextDecoration("none");
  const handleMouseLeave = () => setTextDecoration("underline");

  let display = null;

  if (user) {
    const notes_ = user.notes?.slice().filter((n) => !n.stashed && !n.binned);
    if (notes_?.length) {
      display = gridView ? (
        <Masonry
          columns={{
            xl: navOpen ? 7 : 6,
            lg: navOpen ? 5 : 4,
            sm: 3,
            xs: 1,
          }}
          spacing={1.25}
          sx={{ mt: 8 }}
          className={styles["notes-wrapper_grid"]}
        >
          {notes_
            .slice()
            .reverse()
            .map((n) => (
              <Note key={n._id} n={n} />
            ))}
        </Masonry>
      ) : (
        <div className={styles["notes-wrapper_list"]}>
          {notes_
            .slice()
            .reverse()
            .map((n) => (
              <Note key={n._id} n={n} />
            ))}
        </div>
      );
    } else {
      display = (
        <p className={"empty-dependency"} aria-live={"polite"}>
          <LightbulbIcon
            sx={{ fontSize: "3em", opacity: 0.85, alignSelf: "center" }}
          />
          Added notes show up here
        </p>
      );
    }
  } else {
    display = (
      <p
        className={"empty-dependency"}
        style={{
          flexFlow: "row nowrap",
          alignItems: "center",
        }}
      >
        <button
          type={"button"}
          onClick={() => setShowSignIn(true)}
          style={{
            border: 0,
            padding: "0 6px",
            backgroundColor: "transparent",
            pointerEvents: "auto",
            textDecoration,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Sign in
        </button>
        to see your notes
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
          {display}
        </section>
      </main>
    </>
  );
}
