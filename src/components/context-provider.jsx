import PropTypes from "prop-types";
import { createContext, useEffect, useMemo, useState } from "react";
import { get_notes, set_token } from "../services/auth";

const Color = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [gridView, setGridView] = useState(true);
  const [navOpen, setNavOpen] = useState(true);
  const [showAccountState, setShowAccountState] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [message, setMessage] = useState({ color: null, info: null });

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      set_token(JSON.parse(token).accessToken);
      get_notes()
        .then(({ notes }) => setUser((prev) => ({ ...prev, notes })))
        .catch(({ message }) => {
          if (message === "token expired") {
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
        });
    }
  }, []);

  const values = useMemo(
    () => ({
      user,
      setUser,
      gridView,
      setGridView,
      navOpen,
      setNavOpen,
      showAccountState,
      setShowAccountState,
      showSignIn,
      setShowSignIn,
      showSignUp,
      setShowSignUp,
      message,
      setMessage,
    }),
    [user, gridView, navOpen, showAccountState, showSignIn, showSignUp, message]
  );

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

ContextProvider.propTypes = { children: PropTypes.node.isRequired };

export { Color, Context, ContextProvider };
