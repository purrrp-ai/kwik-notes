import {
  AddAlert,
  Archive,
  ColorLens,
  Image,
  MoreVert,
  PersonAddAlt1,
  PushPin,
  PushPinOutlined,
} from "@mui/icons-material";
import axios from "redaxios";
import classes from "./note.module.css";
import NoteList from "./note-list/note-list";

function toggleImportance(id, note) {
  axios
    .create({ baseURL: "/notes" })
    .put(`/${id}?_=${Math.random()}`, { ...note, important: !note.important })
    .then((response) =>
      console.log(
        `the note is ${
          response.data.important ? "now important" : "no longer important"
        }.`
      )
    )
    .catch((error) => console.log(error.response.data.error));
}

const toolbarBtns = [
  {
    icon: <AddAlert />,
    clickFunc: () => null,
    tooltip: "Prompt me",
  },
  {
    icon: <PersonAddAlt1 />,
    clickFunc: () => null,
    tooltip: "Partner",
  },
  {
    icon: <ColorLens />,
    clickFunc: () => null,
    tooltip: "Environment alternatives",
  },
  { icon: <Image />, clickFunc: () => null, tooltip: "Insert picture" },
  { icon: <Archive />, clickFunc: () => null, tooltip: "Stash" },
  { icon: <MoreVert />, clickFunc: () => null, tooltip: "Extra" },
];

export default function Note({ note }) {
  return (
    <div tabIndex={0} role={"button"} className={classes["actual-note"]}>
      <div className={classes["toggle-container"]}>
        <button onClick={() => toggleImportance(note.id, note)}>
          {note.important ? <PushPin /> : <PushPinOutlined />}
        </button>
      </div>
      <section className={classes["note-attributes"]}>
        {note.title ? (
          <div className={classes["note-title"]}>{note.title}</div>
        ) : null}
        <NoteList content={note.content} />
      </section>
      <div className={classes["note-toolbar"]}>
        {toolbarBtns.map((item, i) => (
          <button key={i} aria-label={item.tooltip} onClick={item.clickFunc}>
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
