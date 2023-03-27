import {
  Apps,
  // CloudDone,
  GridView,
  Person,
  Refresh,
  Search,
  Settings,
  // Sync,
  ViewAgenda,
} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton/IconButton";
import * as React from "react";
import KwikNotesLogo from "../../../../logo/logo";
import classes from "./header.module.css";

export default function Header() {
  const [gridView, setGridView] = React.useState(true);
  return (
    <header className={classes["app-bar"]}>
      <a className={classes["logo-link"]} href={"/"} target={"_self"}>
        <KwikNotesLogo w={2} />
        <span>Kwik Notes</span>
      </a>
      <form action={"#"} className={classes["search-form"]}>
        <input
          className={classes["search-form__input"]}
          placeholder={"Search"}
        />
        <IconButton
          className={classes["search-form__submit"]}
          color={"inherit"}
        >
          <Search />
        </IconButton>
      </form>
      <div>
        <button>
          <Refresh />
        </button>
        <button onClick={() => setGridView((prev) => !prev)}>
          {gridView ? <ViewAgenda /> : <GridView />}
        </button>
        <button>
          <Settings />
        </button>
        <span className={classes["divider"]}></span>
        <button>
          <Apps />
        </button>
        <button>
          <Person />
        </button>
      </div>
    </header>
  );
}
