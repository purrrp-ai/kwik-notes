import * as React from "react";
export const Data = React.createContext({
  collapse: false,
  notes: [],
});

export function Context({ children }) {
  const [notes, setNotes] = React.useState([]);
  const [collapse, setCollapse] = React.useState(false);
  const contextValue = React.useMemo(
    () => ({ collapse, setCollapse, notes, setNotes }),
    [collapse, notes]
  );
  return <Data.Provider value={contextValue}>{children}</Data.Provider>;
}
