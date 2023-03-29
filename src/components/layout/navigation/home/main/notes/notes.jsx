import Masonry from "@mui/lab/Masonry";
import * as React from "react";
import axios from "redaxios";
import { Data } from "../../../../../context";
import Note from "./note/note";
import classes from "./notes.module.css";

export default function Notes() {
  const { collapse, notes, setNotes } = React.useContext(Data);
  React.useEffect(() => {
    axios
      .create({ baseURL: "/notes" })
      .get("/")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error(error.response.data.error));
  }, []);
  return (
    <Masonry
      columns={{ xl: collapse ? 7 : 6, lg: collapse ? 5 : 4, sm: 3, xs: 1 }}
      spacing={1}
      className={classes["notes-wrapper"]}
    >
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </Masonry>
  );
}
