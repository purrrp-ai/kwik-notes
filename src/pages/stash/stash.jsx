import Archive from "@mui/icons-material/Archive";
import { Masonry } from "@mui/lab";
import { useContext, useState } from "react";
import { Context } from "../../components/context-provider";
import Drawer from "../../components/drawer/drawer";
import Header from "../../components/header/header";
import Note from "../../components/note/note";
import styles from "./stash.module.css";

export default function Stash() {
  const { user, gridView, navOpen, setShowSignIn } = useContext(Context);
  const [textDecoration, setTextDecoration] = useState("underline");

  const handleMouseEnter = () => setTextDecoration("none");
  const handleMouseLeave = () => setTextDecoration("underline");

  let display = null;

  const masonryColumns = {
    xl: navOpen ? 7 : 6,
    lg: navOpen ? 5 : 4,
    sm: 3,
    xs: 1,
  };

  if (user) {
    const stashes = user.notes?.slice().filter((n) => n.stashed && !n.binned);
    if (stashes?.length) {
      display = gridView ? (
        <Masonry columns={masonryColumns} spacing={1.25} sx={{ mt: 8 }}>
          {stashes
            .slice()
            .reverse()
            .map((n) => (
              <Note key={n._id} n={n} />
            ))}
        </Masonry>
      ) : (
        <div>
          {stashes
            .slice()
            .reverse()
            .map((n) => (
              <Note key={n._id} n={n} />
            ))}
        </div>
      );
    } else {
      display = (
        <p className={"empty-dependency"}>
          <Archive
            sx={{ fontSize: "3em", opacity: 0.85, alignSelf: "center" }}
          />
          Your stashed notes appear here
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
          className={styles.stashes}
          aria-label={"Your stash"}
          role={"region"}
        >
          {display}
        </section>
      </main>
    </>
  );
}
