import * as React from "react";

const KwikNotesContext = React.createContext({
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

export default KwikNotesContext;
