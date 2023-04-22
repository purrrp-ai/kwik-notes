import KwikNotesLogo from "@assets/svgs/logo";
import {KwikNotesContext} from "@context/kwik-notes_context-provider";
import * as muiIcons from "@mui/icons-material";
import * as muiMaterial from "@mui/material";
// import SignIn from "@pages/sign-in/sign-in";
import { getAllNotes } from "@services/note";
import * as React from "react";
import classes from "./header.module.css";

export default function Header() {
  const { notes, setSearchQueryResults, displayMasonry, setDisplayMasonry } =
    React.useContext(KwikNotesContext);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [refreshStatus, setRefreshStatus] = React.useState(null);

  React.useEffect(() => {
    if (refreshStatus !== null) {
      const timeoutId = setTimeout(() => {
        setRefreshStatus(null);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [refreshStatus]);

  function refreshNotes() {
    if (refreshing) return;

    setRefreshing(true);
    setRefreshStatus(null);

    const randomDelay = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000);

    setTimeout(() => {
      getAllNotes()
        .then((data) => {
          setRefreshStatus("success");
          setNotes(data);
        })
        .catch((error) => {
          setRefreshStatus("error");
          console.error(error.statusText);
        })
        .finally(() => {
          setRefreshing(false);
        });
    }, randomDelay);
  }

  function handleNoteSearch(query) {
    if (!query) return;

    const searchResults = notes.filter(
      (note) =>
        (note.title &&
          note.title.toLowerCase().includes(query.toLowerCase())) ||
        (note.content &&
          note.content.toLowerCase().includes(query.toLowerCase()))
    );

    setSearchQueryResults([...searchResults]);
  }

  let refreshButtonIcon;

  if (refreshing) {
    refreshButtonIcon = (
      <muiMaterial.CircularProgress
        color={"inherit"}
        style={{ width: 24, height: 24 }}
      />
    );
  } else {
    if (refreshStatus === "success") {
      refreshButtonIcon = <muiIcons.CloudDone color={"success"} />;
    } else if (refreshStatus === "error") {
      refreshButtonIcon = <muiIcons.CloudOff color={"error"} />;
    } else {
      refreshButtonIcon = <muiIcons.Refresh />;
    }
  }

  return (
    <header className={classes["app-bar"]}>
      <a className={classes["logo-link"]} href={"/"} target={"_self"}>
        <KwikNotesLogo w={2} />
        <span>Kwik Notes</span>
      </a>
      <div className={classes["form-btns"]}>
        <form
          // action={"get"}
          className={classes["search-form"]}
          role={"search"}
          // onSubmit={handleNoteSearch}
        >
          <input
            className={classes["search-form__input"]}
            placeholder={"Search"}
            role={"searchbox"}
            onChange={({ target }) => {
              setSearchQuery(target.value);
              handleNoteSearch(searchQuery);
            }}
            value={searchQuery}
          />
          <button
            type={"button"}
            className={classes["search-form__submit"]}
            color={"inherit"}
            onClick={() => setSearchQuery("")}
            disabled={!searchQuery}
            style={{
              pointerEvents: searchQuery ? "auto" : "none",
            }}
          >
            <muiIcons.Close sx={{ opacity: searchQuery ? 1 : 0 }} />
          </button>
        </form>
        <section className={classes["btns"]}>
          <button onClick={() => refreshNotes()} disabled={refreshing}>
            {refreshButtonIcon}
          </button>
          <button onClick={() => setDisplayMasonry((prev) => !prev)}>
            {displayMasonry ? <muiIcons.ViewAgenda /> : <muiIcons.GridView />}
          </button>
          <button>
            <muiIcons.Settings />
          </button>
        </section>
      </div>
      <muiMaterial.Divider orientation={"vertical"} />
      <div>
        <button>
          <muiIcons.Apps />
        </button>
        <button>
          <muiIcons.Person />
        </button>
      </div>
    </header>
  );
}
