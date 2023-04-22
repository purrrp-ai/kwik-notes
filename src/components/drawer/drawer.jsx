import { KwikNotesContext } from "@context/kwik-notes_context-provider";
import * as muiIcons from "@mui/icons-material";
import * as React from "react";
import * as RRD from "react-router-dom";
import classes from "./drawer.module.css";

export default function Drawer() {
  const { drawerOpen, setDrawerOpen } = React.useContext(KwikNotesContext);
  const drawerClasses = [classes["drawer"], classes["drawer-closed"]];
  if (drawerOpen) drawerClasses.pop();

  return (
    <section className={classes["drawer-wrapper"]}>
      <div className={drawerClasses.join(" ")}>
        <button
          className={classes["collapsible-nav-btn"]}
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          {drawerOpen ? <muiIcons.ChevronLeft /> : <muiIcons.Menu />}
          {drawerOpen && <span>Collapse</span>}
        </button>
        <span className={classes.divider} />
        <div className={classes["nav"]}>
          {[
            { to: "/", icon: <muiIcons.Lightbulb />, label: "Notes" },
            {
              to: "/prompts",
              icon: <muiIcons.NotificationsNone />,
              label: "Prompts",
            },
          ].map((item, i) => (
            <RRD.NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes["collapsible-nav-link"]} ${classes.active}`
                  : classes["collapsible-nav-link"]
              }
              to={item.to}
              key={`${item.label}-${i}`}
              // exact
            >
              {item.icon}
              {drawerOpen && <span>{item.label}</span>}
            </RRD.NavLink>
          ))}
          <button
            className={classes["collapsible-nav-btn"]}
            onClick={() => null}
          >
            <muiIcons.Create />
            {drawerOpen && <span>Modify tags</span>}
          </button>
          {[
            { to: "/stash", icon: <muiIcons.Archive />, label: "Stash" },
            { to: "/bin", icon: <muiIcons.Delete />, label: "Bin" },
          ].map((item, i) => (
            <RRD.NavLink
              className={({ isActive }) =>
                isActive
                  ? `${classes["collapsible-nav-link"]} ${classes.active}`
                  : classes["collapsible-nav-link"]
              }
              key={`${item.label}-${i}`}
              to={item.to}
            >
              {item.icon}
              {drawerOpen && <span>{item.label}</span>}
            </RRD.NavLink>
          ))}
        </div>
      </div>
      <a
        href={"https://github.com/purrrplelipton"}
        target={"_blank"}
        className={classes["attribution"]}
      >
        <muiIcons.GitHub />
        {drawerOpen && <span>purrrplelipton</span>}
      </a>
    </section>
  );
}
