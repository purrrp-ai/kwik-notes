import { KwikNotesContext } from "@context/kwik-notes_context-provider";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import ArchiveIcon from "@mui/icons-material/Archive";
import BrushIcon from "@mui/icons-material/Brush";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ImageIcon from "@mui/icons-material/Image";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import { createNote } from "@services/note";
import React, { useContext, useRef, useState } from "react";
import styles from "./add-note.module.css";

const toolbarBtns = [
  {
    icon: <AddAlertIcon />,
    clickFunc: () => null,
    tooltip: "Prompt me",
  },
  {
    icon: <PersonAddAlt1Icon />,
    clickFunc: () => null,
    tooltip: "Partner",
  },
  {
    icon: <ColorLensIcon />,
    clickFunc: () => null,
    tooltip: "Environment alternatives",
  },
  {
    icon: <ImageIcon />,
    clickFunc: () => null,
    tooltip: "Insert picture",
  },
  { icon: <ArchiveIcon />, clickFunc: () => null, tooltip: "Stash" },
  { icon: <MoreVertIcon />, clickFunc: () => null, tooltip: "Extra" },
  { icon: <UndoIcon />, clickFunc: () => null, tooltip: "Undo" },
  { icon: <RedoIcon />, clickFunc: () => null, tooltip: "Redo" },
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

export default function AddNote() {
  const classes = useStyles();
  const { setNotes } = useContext(KwikNotesContext);

  const [showFormProps, setShowFormProps] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [notePinned, setNotePinned] = useState(false);

  const contentFieldRef = useRef(null);

  function handleNoteSubmition(event) {
    event.preventDefault();

    if (!noteTitle && !noteContent) {
      return setShowFormProps(false);
    }

    const newNoteProps = {
      title: noteTitle,
      content: noteContent,
      pinned: notePinned,
    };

    createNote(newNoteProps)
      .then((data) => {
        setNotes((prev) => [...prev, data]);
      })
      .catch((error) => console.error(error.message))
      .finally(() => {
        setNoteTitle("");
        setNoteContent("");
        setNotePinned(false);
        setShowFormProps(false);
      });
  }

  function handleBackdropClick(event) {
    event.preventDefault();
    if (noteTitle || noteContent) {
      handleNoteSubmition(event);
    } else {
      setShowFormProps(false);
    }
  }

  return (
    <>
      <Backdrop
        open={showFormProps}
        onClick={(event) => handleBackdropClick(event)}
        sx={{ backgroundColor: "hsla(0, 0%, 0%, 0.05)" }}
      />
      <form
        method={"post"}
        className={styles.createWrapper}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            setShowFormProps(true);
            contentFieldRef.current.focus();
          }
        }}
        onSubmit={handleNoteSubmition}
      >
        <div className={styles.noteProps}>
          {showFormProps && (
            <>
              <div className={styles.pinCheckbox}>
                <input
                  type={"checkbox"}
                  checked={notePinned}
                  onChange={(event) => setNotePinned(event.target.checked)}
                  value={notePinned ? "unpinned" : "pinned"}
                  aria-label={notePinned ? "Unpin note" : "Pin note"}
                  aria-pressed={notePinned}
                />
                {notePinned ? (
                  <PushPinIcon fontSize={"1em"} />
                ) : (
                  <PushPinOutlinedIcon fontSize={"1em"} />
                )}
              </div>
              <TextField
                multiline
                maxRows={16}
                className={classes.titleField}
                placeholder={"Title"}
                onChange={({ target }) => setNoteTitle(target.value)}
                fullWidth
                sx={{ display: "block" }}
              />
            </>
          )}
          <TextField
            multiline
            maxRows={24}
            className={classes.contentField}
            placeholder={"Take a note..."}
            onChange={({ target }) => setNoteContent(target.value)}
            fullWidth
            sx={{ display: "block" }}
            inputProps={{ onFocus: () => setShowFormProps(true) }}
            ref={contentFieldRef}
          />
        </div>
        {!showFormProps && (
          <div className={`${styles.preModes}`}>
            {[
              { icon: <CheckBoxIcon />, label: "New list" },
              { icon: <BrushIcon />, label: "New note with drawing" },
              { icon: <ImageIcon />, label: "New note with image" },
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
        {showFormProps && (
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
            <button type={"submit"}>Close</button>
          </div>
        )}
      </form>
    </>
  );
}
