import Delete from "@mui/icons-material/Delete";
import Masonry from "@mui/lab/Masonry";
import { useContext, useState } from "react";
import { Context } from "../../components/context-provider";
import Drawer from "../../components/drawer/drawer";
import Header from "../../components/header/header";
import Note from "../../components/note/note";
import styles from "./bin.module.css";

export default function Bin() {
  const { user, gridView, navOpen, setShowSignIn } = useContext(Context);
  const [textDecoration, setTextDecoration] = useState("underline");

  const handleMouseEnter = () => setTextDecoration("none");
  const handleMouseLeave = () => setTextDecoration("underline");

  let display = null;

  if (user) {
    const notes = user.notes?.filter((nt) => nt.binned);
    if (notes.length) {
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
          {notes
            .slice()
            .reverse()
            .map((n) => (
              <Note key={n._id} n={n} />
            ))}
        </Masonry>
      ) : (
        <div className={styles["notes-wrapper_list"]}>
          {notes
            .slice()
            .reverse()
            .map((n) => (
              <Note key={n._id} n={n} />
            ))}
        </div>
      );
    } else {
      display = (
        <>
          <div className={styles.binEmphasis}>
            <em>Binned notes are permanently deleted after 7 days</em>
            {notes.length ? (
              <button
                type={"button"}
                onClick={() => console.log("bin emptied.")}
              >
                Empty your bin
              </button>
            ) : null}
          </div>
          <p className={"empty-dependency"}>
            <Delete
              sx={{ fontSize: "3em", opacity: 0.85, alignSelf: "center" }}
            />
            No binned notes
          </p>
        </>
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
        to see your notes in bin
      </p>
    );
  }

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
          {display}
        </section>
      </main>
    </>
  );
}
