import * as React from "react";
import axios from "redaxios";
import Note from "./note/note";
import classes from "./notes.module.css";

export default function Notes() {
  const [notes, updateNotes] = React.useState([]);
  React.useEffect(() => {
    axios
      .create({ baseURL: "/notes" })
      .get("/")
      .then((response) => updateNotes(response.data))
      .catch((error) => console.error(error.response.data.error));
  }, []);

  return (
    <div className={classes["notes-wrapper"]}>
      {notes.map((n) => (
        <Note key={n.id} note={n} />
      ))}
    </div>
  );
}
