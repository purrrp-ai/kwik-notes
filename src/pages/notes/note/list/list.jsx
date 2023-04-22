import classes from "./list.module.css";

export default function List({ content }) {
  if (content.includes("\n")) {
    return content.split(/\n/).map((note, i) => (
      <div key={note + i} className={classes["note-content"]}>
        {note}
      </div>
    ));
  }
  return <div className={classes["note-content"]}>{content}</div>;
}
