import {KwikNotesContext} from "@context/kwik-notes_context-provider";
import * as muiIcons from "@mui/icons-material";
import { createNote } from "@services/note";
import DOMPurify from "dompurify";
import * as React from "react";
import classes from "./add-note.module.css";

const toolbarBtns = [
  {
    icon: <muiIcons.AddAlert />,
    clickFunc: () => null,
    tooltip: "Prompt me",
  },
  {
    icon: <muiIcons.PersonAddAlt1 />,
    clickFunc: () => null,
    tooltip: "Partner",
  },
  {
    icon: <muiIcons.ColorLens />,
    clickFunc: () => null,
    tooltip: "Environment alternatives",
  },
  {
    icon: <muiIcons.Image />,
    clickFunc: () => null,
    tooltip: "Insert picture",
  },
  { icon: <muiIcons.Archive />, clickFunc: () => null, tooltip: "Stash" },
  { icon: <muiIcons.MoreVert />, clickFunc: () => null, tooltip: "Extra" },
  { icon: <muiIcons.Undo />, clickFunc: () => null, tooltip: "Undo" },
  { icon: <muiIcons.Redo />, clickFunc: () => null, tooltip: "Redo" },
];

export default function AddNote() {
  const { setNotes } = React.useContext(KwikNotesContext);

  const [showFormProps, setShowFormProps] = React.useState(false);
  const [noteTitle, setNoteTitle] = React.useState("");
  const [noteContent, setNoteContent] = React.useState("");
  const [notePinned, setNotePinned] = React.useState(false);

  const formRef = React.useRef(null);
  const titleFieldRef = React.useRef(null);
  const contentFieldRef = React.useRef(null);

  React.useEffect(() => {
    function handleClickOut(event) {
      if (formRef.current && !formRef.current.contains(event.target))
        setShowFormProps(false);
    }

    window.addEventListener("click", handleClickOut);

    return () => {
      window.removeEventListener("click", handleClickOut);
    };
  }, [formRef]);

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
      .catch((error) => console.error(error))
      .finally(() => {
        setNoteTitle("");
        titleFieldRef.current.innerHTML = "";
        setNoteContent("");
        contentFieldRef.current.innerHTML = "";
        setNotePinned(false);
        setShowFormProps(false);
      });
  }

  return (
    <form
      method={"post"}
      className={classes["create-wrapper"]}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          setShowFormProps(true);
          contentFieldRef.current.focus();
        }
      }}
      ref={formRef}
      onSubmit={handleNoteSubmition}
    >
      <div className={classes["note-props"]}>
        {showFormProps && (
          <>
            <div className={classes["pin-checkbox"]}>
              <input
                type={"checkbox"}
                checked={notePinned}
                onChange={(event) => setNotePinned(event.target.checked)}
                value={notePinned ? "unpin" : "pin"}
              />
              {notePinned ? (
                <muiIcons.PushPin fontSize={"1em"} />
              ) : (
                <muiIcons.PushPinOutlined fontSize={"1em"} />
              )}
            </div>
            <div className={classes["title-field-wrapper"]}>
              {!noteTitle && (
                <span
                  aria-label={"Note title field placeholder"}
                  className={classes["title-field-placeholder"]}
                >
                  Title
                </span>
              )}
              <div
                contentEditable
                className={classes["title-field"]}
                id={"form-title-field"}
                onInput={(event) =>
                  setNoteTitle(DOMPurify.sanitize(event.target.innerText))
                }
                dangerouslySetInnerHTML={{ __html: noteTitle.current }}
                aria-multiline={"true"}
                tabIndex={0}
                aria-label={"Title"}
                role={"textbox"}
                ref={titleFieldRef}
              ></div>
            </div>
          </>
        )}
        <div className={classes["content-field-wrapper"]}>
          {!noteContent && (
            <span className={classes["content-field-placeholder"]}>
              Take a note...
            </span>
          )}
          <div
            contentEditable
            className={classes["content-field"]}
            id={"form-content-field"}
            onInput={(event) =>
              setNoteContent(DOMPurify.sanitize(event.target.innerText))
            }
            dangerouslySetInnerHTML={{ __html: noteContent.current }}
            aria-multiline={"true"}
            tabIndex={0}
            aria-label={"Take a note..."}
            role={"textbox"}
            onFocus={() => setShowFormProps(true)}
            ref={contentFieldRef}
          ></div>
        </div>
      </div>
      {!showFormProps && (
        <div className={`${classes["pre-modes"]}`}>
          {[
            { icon: <muiIcons.CheckBox />, label: "New list" },
            { icon: <muiIcons.Brush />, label: "New note with drawing" },
            { icon: <muiIcons.Image />, label: "New note with image" },
          ].map((item, i) => (
            <button type={"button"} key={item.label + i}>
              {item.icon}
            </button>
          ))}
        </div>
      )}
      {showFormProps && (
        <div className={classes["more-options"]}>
          <div className={classes["toolbar-btns"]}>
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
  );
}
