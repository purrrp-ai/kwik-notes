import {
  Apps,
  Close,
  CloudDoneOutlined,
  CloudOffOutlined,
  GridView as GridViewIcon,
  Person,
  Refresh,
  Search,
  Settings,
  ViewAgenda,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import LogoLink from "../../assets/logo/logo-link";
import { get_notes } from "../../services/auth";
import { Color, Context } from "../context-provider";
import styles from "./header.module.css";

export default function Header() {
  const {
      user,
      setUser,
      gridView,
      setGridView,
      showAccountState,
      setShowAccountState,
      setShowSignIn,
      setMessage,
    } = useContext(Context),
    searchBoxRef = useRef(null),
    [states, setStates] = useState({
      query: "",
      refreshing: false,
      refreshStatus: null,
      showAccountDetails: false,
    });

  useEffect(() => {
    if (states.refreshStatus !== null) {
      const timeoutId = setTimeout(() => {
        setStates((prev) => ({ ...prev, refreshStatus: null }));
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [states.refreshStatus]);

  function refreshNotes() {
    if (user) {
      if (states.refreshing) return;

      setStates((prev) => ({
        ...prev,
        refreshing: true,
        refreshStatus: null,
      }));

      const randomDelay = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000);

      setTimeout(() => {
        get_notes()
          .then(({ notes }) => {
            setUser((prev) => ({ ...prev, notes }));
            setStates((prev) => ({ ...prev, refreshStatus: "success" }));
          })
          .catch(({ message }) => {
            setStates((prev) => ({ ...prev, refreshStatus: "error" }));
            if (message == "token expired") {
              window.localStorage.removeItem("token");
              setUser(null);
              setShowSignIn(true);
              setTimeout(
                () =>
                  setMessage({
                    color: Color.warn,
                    info: "Session expired. Please Sign in again.",
                  }),
                1000
              );
            } else {
              setMessage({ color: Color.error, info: message });
            }
          })
          .finally(() => {
            setStates((prev) => ({ ...prev, refreshing: false }));
          });
      }, randomDelay);
    } else {
      setMessage({
        color: Color.warn,
        info: "Notes refreshing is allowed to signed in users only.",
      });
    }
  }

  let refreshButtonIcon;

  if (states.refreshing) {
    refreshButtonIcon = (
      <CircularProgress color={"inherit"} style={{ width: 24, height: 24 }} />
    );
  } else {
    if (states.refreshStatus === "success") {
      refreshButtonIcon = <CloudDoneOutlined color={"inherit"} />;
    } else if (states.refreshStatus === "error") {
      refreshButtonIcon = <CloudOffOutlined color={"inherit"} />;
    } else {
      refreshButtonIcon = <Refresh />;
    }
  }

  return (
    <header className={styles.appBar}>
      <LogoLink w={2} />
      <div className={styles.search} role={"search"}>
        <button
          type={"button"}
          className={`${styles.focusSearchBox}`}
          onClick={() => searchBoxRef.current.focus()}
          aria-label={"Search notes"}
        >
          <Search />
        </button>
        <input
          className={styles.searchBox}
          autoComplete={"off"}
          id={"search-box"}
          placeholder={"Search"}
          role={"searchbox"}
          onChange={({ target: { value } }) =>
            setStates((prev) => ({ ...prev, query: value }))
          }
          spellCheck={"false"}
          value={states.query}
          ref={searchBoxRef}
          type={"text"}
          aria-label={"Search"}
        />
        <button
          type={"button"}
          className={`${styles.clearQueryBtn}`}
          onClick={() => setStates((prev) => ({ ...prev, query: "" }))}
          aria-label={"Clear search"}
          disabled={!states.query}
        >
          <Close sx={{ opacity: states.query ? 1 : 0 }} />
        </button>
      </div>
      <div className={styles.navTools}>
        <button
          className={styles.headerBtns}
          onClick={() => refreshNotes()}
          disabled={states.refreshing}
          aria-label={"Refresh notes"}
        >
          {refreshButtonIcon}
        </button>
        <button
          className={styles.headerBtns}
          onClick={() => setGridView((prev) => !prev)}
          aria-label={gridView ? "List view" : "Grid view"}
        >
          {gridView ? <ViewAgenda /> : <GridViewIcon />}
        </button>
        <button
          className={styles.headerBtns}
          type={"button"}
          aria-label={"Settings"}
        >
          <Settings />
        </button>
        <span className={styles.divider} />
        <button
          className={styles.headerBtns}
          type={"button"}
          aria-label={"More apps"}
        >
          <Apps />
        </button>
        <button
          className={styles.headerBtns}
          onClick={() => setShowAccountState((prev) => !prev)}
          aria-label={"User details"}
          aria-expanded={showAccountState}
        >
          <Person />
        </button>
      </div>
    </header>
  );
}
