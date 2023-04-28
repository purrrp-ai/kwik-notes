import KwikNotesLogo from "@assets/svgs/logo";
import { KwikNotesContext } from "@context/kwik-notes_context-provider";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/Close";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import GridViewIcon from "@mui/icons-material/GridView";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
// import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { getAllNotes } from "@services/note";
import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./header.module.css";
import UserDetails from "./user-details/user-details";

export default function Header() {
  const { contexts, setContexts } = useContext(KwikNotesContext),
    searchBoxRef = useRef(null),
    [headerStates, setHeaderStates] = useState({
      searchQuery: "",
      refreshing: false,
      refreshStatus: null,
      showAccountDetails: false,
    });

  useEffect(() => {
    if (headerStates.refreshStatus !== null) {
      const timeoutId = setTimeout(() => {
        setHeaderStates((prev) => ({ ...prev, refreshStatus: null }));
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [headerStates.refreshStatus]);

  function refreshNotes() {
    if (headerStates.refreshing) return;

    setHeaderStates((prev) => ({
      ...prev,
      refreshing: true,
      refreshStatus: null,
    }));

    const randomDelay = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000);

    setTimeout(() => {
      getAllNotes()
        .then((data) => {
          setHeaderStates((prev) => ({ ...prev, refreshStatus: "success" }));
        })
        .catch((error) => {
          setHeaderStates((prev) => ({ ...prev, refreshStatus: "error" }));
          console.error(error.message);
        })
        .finally(() => {
          setHeaderStates((prev) => ({ ...prev, refreshing: false }));
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

  if (headerStates.refreshing) {
    refreshButtonIcon = (
      <CircularProgress color={"inherit"} style={{ width: 24, height: 24 }} />
    );
  } else {
    if (headerStates.refreshStatus === "success") {
      refreshButtonIcon = <CloudDoneIcon color={"success"} />;
    } else if (headerStates.refreshStatus === "error") {
      refreshButtonIcon = <CloudOffIcon color={"error"} />;
    } else {
      refreshButtonIcon = <RefreshIcon />;
    }
  }

  return (
    <header className={styles.appBar}>
      <NavLink className={styles.logoLink} to={"/"} target={"_self"}>
        <KwikNotesLogo w={2} />
        Kwik Notes
      </NavLink>
      <div className={styles.search} role={"search"}>
        <button
          type={"button"}
          className={`${styles.focusSearchBox}`}
          onClick={() => searchBoxRef.current.focus()}
          aria-label={"Search notes"}
        >
          <SearchIcon />
        </button>
        <input
          className={styles.searchBox}
          autoComplete={"off"}
          id={"search-box"}
          placeholder={"Search"}
          role={"searchbox"}
          onChange={({ target }) =>
            setHeaderStates((prev) => ({ ...prev, searchQuery: target.value }))
          }
          spellCheck={"false"}
          value={headerStates.searchQuery}
          ref={searchBoxRef}
          type={"text"}
          aria-label={"Search"}
        />
        <button
          type={"button"}
          className={`${styles.clearQueryBtn}`}
          onClick={() =>
            setHeaderStates((prev) => ({ ...prev, searchQuery: "" }))
          }
          aria-label={"Clear search"}
          disabled={!headerStates.searchQuery}
        >
          <CloseIcon sx={{ opacity: headerStates.searchQuery ? 1 : 0 }} />
        </button>
      </div>
      <div className={styles.navTools}>
        <button
          className={styles.headerBtns}
          onClick={() => refreshNotes()}
          disabled={headerStates.refreshing}
          aria-label={"Refresh notes"}
        >
          {refreshButtonIcon}
        </button>
        <button
          className={styles.headerBtns}
          onClick={() =>
            setContexts((prev) => ({
              ...prev,
              mansoryDisplay: !prev.mansoryDisplay,
            }))
          }
          aria-label={contexts.mansoryDisplay ? "List view" : "Grid view"}
        >
          {contexts.mansoryDisplay ? <ViewAgendaIcon /> : <GridViewIcon />}
        </button>
        <button
          className={styles.headerBtns}
          // type={"button"}
          aria-label={"Settings"}
        >
          <SettingsIcon />
        </button>
        <span className={styles.divider} />
        <button
          className={styles.headerBtns}
          // type={"button"}
          aria-label={"More apps"}
        >
          <AppsIcon />
        </button>
        <>
          <button
            className={styles.headerBtns}
            onClick={() =>
              setContexts((prev) => ({
                ...prev,
                showUserDetails: !prev.showUserDetails,
              }))
            }
            aria-label={"User details"}
            aria-expanded={contexts.showUserDetails}
          >
            <PersonIcon />
          </button>
          <UserDetails />
        </>
      </div>
    </header>
  );
}
