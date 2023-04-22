import * as React from "react";
// import KwikNotesContext from "./kwik-notes_context";

export const KwikNotesContext = React.createContext({
  user: null,
  setUser: () => {},
  theme: "light",
  setTheme: () => {},
  displayMasonry: true,
  setDisplayMasonry: () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
  searchQueryResults: [],
  setSearchQueryResults: () => {},
});

export function KwikNotesContextProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [theme, setTheme] = React.useState("light");
  const [displayMasonry, setDisplayMasonry] = React.useState(true);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [searchQueryResults, setSearchQueryResults] = React.useState([]);

  const memoizedKwikNotesContextValues = React.useMemo(
    () => ({
      user,
      setUser,
      theme,
      setTheme,
      displayMasonry,
      setDisplayMasonry,
      drawerOpen,
      setDrawerOpen,
      searchQueryResults,
      setSearchQueryResults,
    }),
    [user, theme, displayMasonry, drawerOpen, searchQueryResults]
  );

  return (
    <KwikNotesContext.Provider value={memoizedKwikNotesContextValues}>
      {children}
    </KwikNotesContext.Provider>
  );
}
