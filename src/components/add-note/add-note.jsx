import {
  AddAlert,
  Archive,
  Brush,
  CheckBox,
  ColorLens,
  Image,
  MoreVert,
  PersonAddAlt1,
  PushPin,
  PushPinOutlined,
  Redo,
  Undo,
} from "@mui/icons-material";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useContext, useRef, useState } from "react";
import { create_note } from "../../services/auth";
import { Color, Context } from "../context-provider";
import styles from "./add-note.module.css";

const toolbarBtns = [
  {
    icon: <AddAlert />,
    clickFunc: () => null,
    tooltip: "Prompt me",
  },
  {
    icon: <PersonAddAlt1 />,
    clickFunc: () => null,
    tooltip: "Partner",
  },
  {
    icon: <ColorLens />,
    clickFunc: () => null,
    tooltip: "Environment alternatives",
  },
  {
    icon: <Image />,
    clickFunc: () => null,
    tooltip: "Insert picture",
  },
  { icon: <Archive />, clickFunc: () => null, tooltip: "Stash" },
  { icon: <MoreVert />, clickFunc: () => null, tooltip: "Extra" },
  { icon: <Undo />, clickFunc: () => null, tooltip: "Undo" },
  { icon: <Redo />, clickFunc: () => null, tooltip: "Redo" },
];

const useStyles = makeStyles({
  titleField: {
    "& .MuiOutlinedInput-root": {
      minHeight: 48,
      padding: "0.75em 1em",
      borderRadius: 8,
      fontFamily: "inherit",
      color: "inherit",
      lineHeight: "1.5em",
      fontWeight: "bolder",
      "& .MuiOutlinedInput-notchedOutline": {
        display: "none",
      },
    },
  },
  contentField: {
    "& .MuiOutlinedInput-root": {
      minHeight: 48,
      fontFamily: '"Gloria Hallelujah", cursive',
      fontSize: "0.9em",
      letterSpacing: "0.01428571em",
      lineHeight: "1.25em",
      padding: "0.86em 1.111em",
      borderRadius: 8,
      color: "inherit",
      "& .MuiOutlinedInput-notchedOutline": {
        display: "none",
      },
    },
  },
});

const AddNote = () => {
  const classes = useStyles(),
    { user, setUser, setMessage, setShowSignIn } = useContext(Context),
    [states, setStates] = useState({
      expandForm: false,
      title: "",
      content: "",
      pinned: false,
      addingNote: false,
    }),
    contentFieldRef = useRef(null);

  function handleNoteSubmition(event) {
    event.preventDefault();

    if (user) {
      setStates((prev) => ({ ...prev, addingNote: true }));
      if (!states.title && !states.content)
        return setStates((prev) => ({
          ...prev,
          expandForm: false,
          addingNote: false,
        }));

      create_note({
        title: states.title,
        content: states.content,
        pinned: states.pinned,
      })
        .then(({ note }) => {
          setUser((prev) => ({
            ...prev,
            notes: prev.notes.concat(note),
          }));
          setMessage({ color: Color.success, info: "Note added." });
          setStates((prev) => ({
            ...prev,
            expandForm: false,
            title: "",
            content: "",
            pinned: false,
          }));
        })
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
          } else setMessage({ color: Color.error, info: message });
        })
        .finally(() => setStates((prev) => ({ ...prev, addingNote: false })));
    } else {
      setStates((prev) => ({
        ...prev,
        expandForm: !states.title && !states.content ? false : prev.expandForm,
      }));
      setShowSignIn(true);
      setMessage({ color: Color.warn, info: "Sign in to add notes." });
    }
  }

  function handleBackdropClick(event) {
    event.preventDefault();
    if (states.title || states.content) handleNoteSubmition(event);
    else setStates((prev) => ({ ...prev, expandForm: false }));
  }

  return (
    <>
      <Backdrop
        open={states.expandForm}
        onClick={(event) => handleBackdropClick(event)}
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      />
      <form
        method={"post"}
        className={styles.createWrapper}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            setStates((prev) => ({ ...prev, expandForm: true }));
            contentFieldRef.current.focus();
          }
        }}
        onSubmit={handleNoteSubmition}
      >
        <div className={styles.noteProps}>
          {states.expandForm && (
            <>
              <div className={styles.pinCheckbox}>
                <input
                  type={"checkbox"}
                  checked={states.pinned}
                  onChange={({ target }) =>
                    setStates((prev) => ({ ...prev, pinned: target.checked }))
                  }
                  value={states.pinned ? "unpinned" : "pinned"}
                  aria-label={states.pinned ? "Unpin note" : "Pin note"}
                  aria-pressed={states.pinned}
                />
                {states.pinned ? (
                  <PushPin fontSize={"1em"} />
                ) : (
                  <PushPinOutlined fontSize={"1em"} />
                )}
              </div>
              <TextField
                multiline
                maxRows={16}
                className={classes.titleField}
                placeholder={"Title"}
                onChange={({ target }) =>
                  setStates((prev) => ({ ...prev, title: target.value }))
                }
                fullWidth
                value={states.title}
                sx={{ display: "block" }}
              />
            </>
          )}
          <TextField
            multiline
            maxRows={24}
            className={classes.contentField}
            placeholder={"Take a note..."}
            onChange={({ target }) =>
              setStates((prev) => ({ ...prev, content: target.value }))
            }
            fullWidth
            value={states.content}
            sx={{ display: "block" }}
            inputProps={{
              onFocus: () =>
                setStates((prev) => ({ ...prev, expandForm: true })),
            }}
            ref={contentFieldRef}
          />
        </div>
        {!states.expandForm && (
          <div className={`${styles.preModes}`}>
            {[
              { icon: <CheckBox />, label: "New list" },
              { icon: <Brush />, label: "New note with drawing" },
              { icon: <Image />, label: "New note with image" },
            ].map((item, i) => (
              <button
                aria-label={item.label}
                type={"button"}
                key={item.label + i}
                color={"inherit"}
              >
                {item.icon}
              </button>
            ))}
          </div>
        )}
        {states.expandForm && (
          <div className={styles.moreOptions}>
            <div className={styles.toolbarBtns}>
              {toolbarBtns.map((item, i) => (
                <button
                  type={"button"}
                  key={`${i}${item.tooltip}`}
                  aria-label={item.tooltip}
                  onClick={item.clickFunc}
                >
                  {item.icon}
                </button>
              ))}
            </div>
            {states.addingNote ? (
              <CircularProgress
                sx={{
                  width: "20px !important",
                  height: "20px !important",
                  margin: "8px 24px",
                }}
                color={"inherit"}
              />
            ) : (
              <button type={"submit"} disabled={states.addingNote}>
                Close
              </button>
            )}
          </div>
        )}
      </form>
    </>
  );
};

export default AddNote;
