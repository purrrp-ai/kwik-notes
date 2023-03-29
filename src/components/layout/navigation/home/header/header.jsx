import Apps from "@mui/icons-material/Apps";
// import CloudDone from "@mui/icons-material/CloudDone";
import GridView from "@mui/icons-material/GridView";
import Person from "@mui/icons-material/Person";
import Refresh from "@mui/icons-material/Refresh";
import Search from "@mui/icons-material/Search";
import Settings from "@mui/icons-material/Settings";
// import Sync from "@mui/icons-material/Sync";
import ViewAgenda from "@mui/icons-material/ViewAgenda";
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
