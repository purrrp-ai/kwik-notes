import classes from "./note-list.module.css";

export default function NoteList({ content }) {
  if (content.includes("\n")) {
    return content.split(/\n/).map((note, i) => (
      <div key={i} className={classes["note-content"]}>
        {note}
      </div>
    ));
  }
  return <div className={classes["note-content"]}>{content}</div>;
}
