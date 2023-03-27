import {
  Archive,
  ChevronLeft,
  Create,
  Delete,
  GitHub,
  Lightbulb,
  Menu,
  NotificationsNone,
} from "@mui/icons-material";
import * as React from "react";
import classes from "./drawer.module.css";

export default function Drawer() {
  const [collapse, setCollapse] = React.useState(false);
  const drawerClasses = [classes["drawer"]];
  if (collapse) drawerClasses.push(classes["drawer-collapsed"]);

  return (
    <section className={classes["drawer-wrapper"]}>
      <div className={drawerClasses.join(" ")}>
        <button onClick={() => setCollapse((prev) => !prev)}>
          {collapse ? <Menu /> : <ChevronLeft />}
          {collapse ? null : <span>Collapse</span>}
        </button>
        <span className={classes["divider"]}></span>
        <div className={classes["nav"]}>
          <a href={"/"}>
            <Lightbulb />
            {collapse ? null : <span>Notes</span>}
          </a>
          <a href={"/reminders"}>
            <NotificationsNone />
            {collapse ? null : <span>Prompts</span>}
          </a>
          <button onClick={() => null}>
            <Create />
            {collapse ? null : <span>Modify tags</span>}
          </button>
          <a href={"/archive"}>
            <Archive />
            {collapse ? null : <span>Stash</span>}
          </a>
          <a href={"/thrash"}>
            <Delete />
            {collapse ? null : <span>Bin</span>}
          </a>
        </div>
      </div>
      <a
        href={"https://github.com/purrrplelipton"}
        target={"_blank"}
        className={classes["attribution"]}
      >
        <GitHub />
        {collapse ? null : <span>purrrplelipton</span>}
      </a>
    </section>
  );
}
