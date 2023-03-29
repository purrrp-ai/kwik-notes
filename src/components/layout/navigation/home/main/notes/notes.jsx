import Masonry from "@mui/lab/Masonry";
import * as React from "react";
import axios from "redaxios";
import { Data } from "../../../../../context";
import Note from "./note/note";
import classes from "./notes.module.css";

export default function Notes() {
  const { collapse, notes, setNotes, gridView } = React.useContext(Data);
  React.useEffect(() => {
    axios
      .create({ baseURL: "/notes" })
      .get("/")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error(error.response.data.error));
  }, []);
  const gridViewCols = {
    xl: collapse ? 7 : 6,
    lg: collapse ? 5 : 4,
    sm: 3,
    xs: 1,
  };
  if (gridView) {
    return (
      <Masonry
        columns={gridViewCols}
        spacing={1.25}
        sx={{ mt: 8 }}
        className={classes["notes-wrapper_grid"]}
      >
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </Masonry>
    );
  } else {
    return (
      <div className={classes["notes-wrapper_list"]}>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    );
  }
}
