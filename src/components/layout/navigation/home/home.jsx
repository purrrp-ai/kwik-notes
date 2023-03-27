import Header from "./header/header";
import classes from "./home.module.css";
import Main from "./main/main";

export default function Home() {
  return (
    <section className={classes["home"]}>
      <Header />
      <Main />
    </section>
  );
}
