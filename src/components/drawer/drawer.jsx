import { KwikNotesContext } from "@context/kwik-notes_context-provider";
import * as muiIcons from "@mui/icons-material";
import React, { useContext } from "react";
import * as RRD from "react-router-dom";
import styles from "./drawer.module.css";

export default function Drawer() {
  const { contexts, setContexts } = useContext(KwikNotesContext);

  return (
    <aside
      aria-expanded={contexts.drawerCollapsed}
      id={"side-drawer"}
      className={
        contexts.drawerCollapsed
          ? `${styles.drawer} ${styles.drawerCollapsed}`
          : styles.drawer
      }
    >
      <button
        className={`${styles.collapsibleBtn} ${styles.expandToggle}`}
        onClick={() =>
          setContexts((prev) => ({
            ...prev,
            drawerCollapsed: !prev.drawerCollapsed,
          }))
        }
        aria-label={
          contexts.drawerCollapsed ? "Collapse drawer" : "Expand drawer"
        }
      >
        {contexts.drawerCollapsed ? (
          <muiIcons.Menu />
        ) : (
          <muiIcons.ChevronLeft />
        )}
        {contexts.drawerCollapsed ? null : <span>Collapse</span>}
      </button>
      <span className={styles.divider} />
      <div className={styles.navLinksBtns}>
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
                ? `${styles.collapsibleLink} ${styles.active}`
                : styles.collapsibleLink
            }
            to={item.to}
            key={`${item.label}-${i}`}
            aria-label={item.label}
          >
            {item.icon}
            {contexts.drawerCollapsed ? null : <span>{item.label}</span>}
          </RRD.NavLink>
        ))}
        <button
          aria-label={"Modify tags"}
          className={styles.collapsibleBtn}
          onClick={() => null}
        >
          <muiIcons.Create />
          {contexts.drawerCollapsed ? null : <span>Modify tags</span>}
        </button>
        {[
          { to: "/stash", icon: <muiIcons.Archive />, label: "Stash" },
          { to: "/bin", icon: <muiIcons.Delete />, label: "Bin" },
        ].map((item, i) => (
          <RRD.NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.collapsibleLink} ${styles.active}`
                : styles.collapsibleLink
            }
            to={item.to}
            key={`${item.label}-${i}`}
            aria-label={item.label}
          >
            {item.icon}
            {contexts.drawerCollapsed ? null : <span>{item.label}</span>}
          </RRD.NavLink>
        ))}
      </div>
      <a
        href={"https://github.com/purrrplelipton"}
        target={"_blank"}
        className={`${styles.collapsibleLink} ${styles.attribution}`}
        aria-label={"Creator's GitHub"}
      >
        <muiIcons.GitHub />
        {contexts.drawerCollapsed ? null : <span>purrrplelipton</span>}
      </a>
    </aside>
  );
}
