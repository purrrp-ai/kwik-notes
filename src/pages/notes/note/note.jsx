import {KwikNotesContext} from "@context/kwik-notes_context-provider";
import * as muiIcons from "@mui/icons-material";
import { updateNote } from "@services/note";
import * as React from "react";
import List from "./list/list";
import classes from "./note.module.css";

export default function Note({ note }) {
  const { notes, setNotes } = React.useContext(KwikNotesContext);

  function togglePinnedState(id, note) {
    updateNote(id, { ...note, pinned: !note.pinned })
      .then((response) => {
        const newNotesArray = notes.map((note) =>
          note.id == id ? response : note
        );
        setNotes(newNotesArray);
      })
      .catch((error) => console.log(error.message));
  }

  const toolbarBtns = [
    {
      icon: <muiIcons.AddAlert />,
      clickFunc: () => null,
      tooltip: "Prompt me",
    },
    {
      icon: <muiIcons.PersonAddAlt1 />,
      clickFunc: () => null,
      tooltip: "Partner",
    },
    {
      icon: <muiIcons.ColorLens />,
      clickFunc: () => null,
      tooltip: "Environment alternatives",
    },
    {
      icon: <muiIcons.Image />,
      clickFunc: () => null,
      tooltip: "Insert picture",
    },
    { icon: <muiIcons.Archive />, clickFunc: () => null, tooltip: "Stash" },
    { icon: <muiIcons.MoreVert />, clickFunc: () => null, tooltip: "Extra" },
  ];

  return (
    <div tabIndex={0} role={"button"} className={classes["actual-note"]}>
      <div className={classes["toggle-container"]}>
        <button
          aria-label={note.pinned ? "Unpin note" : "Pin note"}
          onClick={() => togglePinnedState(note.id, note)}
        >
          {note.pinned ? <muiIcons.PushPin /> : <muiIcons.PushPinOutlined />}
        </button>
      </div>
      <section className={classes["note-attributes"]}>
        {note.title ? (
          <div className={classes["note-title"]}>{note.title}</div>
        ) : null}
        <List content={note.content} />
      </section>
      <div className={classes["note-toolbar"]}>
        {toolbarBtns.map((item, i) => (
          <button
            key={`${i}-${item.tooltip}`}
            aria-label={item.tooltip}
            onClick={item.clickFunc}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
