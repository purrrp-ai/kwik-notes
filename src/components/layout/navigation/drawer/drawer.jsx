import Archive from "@mui/icons-material/Archive";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import Create from "@mui/icons-material/Create";
import Delete from "@mui/icons-material/Delete";
import GitHub from "@mui/icons-material/GitHub";
import Lightbulb from "@mui/icons-material/LightBulb";
import Menu from "@mui/icons-material/Menu";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import * as React from "react";
import { Data } from "../../../context";
import classes from "./drawer.module.css";

export default function Drawer() {
  const { collapse, setCollapse } = React.useContext(Data);
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
          {[
            { href: "/", icon: <Lightbulb />, label: "Notes" },
            { href: "/prompts", icon: <NotificationsNone />, label: "Prompts" },
          ].map((item, i) => (
            <a key={`${item.label}-${i}`} href={item.href}>
              {item.icon}
              {collapse ? null : <span>{item.label}</span>}
            </a>
          ))}
          <button onClick={() => null}>
            <Create />
            {collapse ? null : <span>Modify tags</span>}
          </button>
          {[
            { href: "/stash", icon: <Archive />, label: "Stash" },
            { href: "/bin", icon: <Delete />, label: "Bin" },
          ].map((item, i) => (
            <a key={`${item.label}-${i}`} href={item.href}>
              {item.icon}
              {collapse ? null : <span>{item.label}</span>}
            </a>
          ))}
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
