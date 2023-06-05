import {
  Archive,
  ChevronLeft,
  Create,
  Delete,
  GitHub,
  Lightbulb,
  Menu,
  Notifications,
} from "@mui/icons-material";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../context-provider";
import styles from "./drawer.module.css";

export default function Drawer() {
  const { navOpen, setNavOpen } = useContext(Context);

  return (
    <aside
      aria-expanded={navOpen}
      id={"side-drawer"}
      className={navOpen ? styles.drawer : `${styles.drawer} ${styles.navOpen}`}
    >
      <button
        className={`${styles.collapsibleBtn} ${styles.expandToggle}`}
        onClick={() => setNavOpen((prev) => !prev)}
        aria-label={navOpen ? "Expand drawer" : "Collapse drawer"}
      >
        {navOpen ? <ChevronLeft /> : <Menu />}
        {navOpen ? <span>Collapse</span> : null}
      </button>
      <span className={styles.divider} />
      <div className={styles.navLinksBtns}>
        {[
          { to: "/", icon: <Lightbulb />, label: "Notes" },
          {
            to: "/prompts",
            icon: <Notifications />,
            label: "Prompts",
          },
        ].map((item, i) => (
          <NavLink
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
            {navOpen ? <span>{item.label}</span> : null}
          </NavLink>
        ))}
        <button
          aria-label={"Modify tags"}
          className={styles.collapsibleBtn}
          onClick={() => null}
        >
          <Create />
          {navOpen ? <span>Modify tags</span> : null}
        </button>
        {[
          { to: "/stash", icon: <Archive />, label: "Stash" },
          { to: "/bin", icon: <Delete />, label: "Bin" },
        ].map((item, i) => (
          <NavLink
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
            {navOpen ? <span>{item.label}</span> : null}
          </NavLink>
        ))}
      </div>
      <a
        href={"https://github.com/purrrplelipton"}
        target={"_blank"}
        className={`${styles.attribution}`}
        aria-label={"Creator's GitHub"}
        rel="noreferrer"
      >
        <GitHub />
        {navOpen ? <span>purrrplelipton</span> : null}
      </a>
    </aside>
  );
}
