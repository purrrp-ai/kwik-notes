import React, { createContext, useMemo, useState } from "react";
// import KwikNotesContext from "./kwik-notes_context";

export const KwikNotesContext = createContext({
  contexts: {
    user: null,
    theme: "light",
    masonryDisplay: true,
    drawerCollapsed: true,
    queryResults: [],
    showUserDetails: false,
    showSignInModal: false,
    showSignUpModal: false,
  },
  setContexts: () => {},
});

export function KwikNotesContextProvider({ children }) {
  const [contexts, setContexts] = useState({
    user: null,
    theme: "light",
    masonryDisplay: true,
    drawerCollapsed: true,
    queryResults: [],
    showUserDetails: false,
    showSignInModal: false,
    showSignUpModal: false,
  });

  const contextValues = useMemo(() => ({ contexts, setContexts }), [contexts]);

  return (
    <KwikNotesContext.Provider value={contextValues}>
      {children}
    </KwikNotesContext.Provider>
  );
}
