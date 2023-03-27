import classes from "./layout.module.css";
import Drawer from "./navigation/drawer/drawer";
import Home from "./navigation/home/home";

export default function Layout() {
  return (
    <main className={classes["layout"]}>
      <Drawer />
      <Home />
    </main>
  );
}
