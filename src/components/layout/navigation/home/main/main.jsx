import Create from "./create/create";
import classes from "./main.module.css";
import Notes from "./notes/notes";

export default function Main() {
  return (
    <section className={classes["main-content"]}>
      <Create />
      <Notes />
    </section>
  );
}
