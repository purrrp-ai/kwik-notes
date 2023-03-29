import AddAlert from "@mui/icons-material/AddAlert";
import Archive from "@mui/icons-material/Archive";
import ColorLens from "@mui/icons-material/ColorLens";
import Image from "@mui/icons-material/Image";
import MoreVert from "@mui/icons-material/MoreVert";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
import PushPin from "@mui/icons-material/PushPin";
import PushPinOutlined from "@mui/icons-material/PushPinOutlined";
import axios from "redaxios";
import NoteList from "./note-list/note-list";
import classes from "./note.module.css";

function toggleImportance(id, note) {
  axios
    .create({ baseURL: "/notes" })
    .put(`/${id}`, { ...note, important: !note.important })
    .then(() => console.log(note.important ? "note unpinned" : "note pinned"))
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
