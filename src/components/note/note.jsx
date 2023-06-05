import {
  AddAlert,
  Archive,
  ColorLens,
  DeleteForeverTwoTone,
  ExpandMore,
  Image,
  MoreVert,
  PersonAddAlt1,
  PushPin,
  PushPinOutlined,
  RepeatRounded,
  RestoreFromTrashTwoTone,
  Unarchive,
} from "@mui/icons-material";
import { Backdrop, Button, CircularProgress, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { delete_note, update_prop } from "../../services/auth";
import { Color, Context } from "../context-provider";
import styles from "./note.module.css";

const useStyles = makeStyles({
  icnBtn: {
    "&": {
      fontSize: "1em !important",
      padding: "7px !important",
      "& .MuiSvgIcon-root": { fontSize: "1.13em" },
    },
  },
});

const Note = ({ n }) => {
  const classes = useStyles();
  const { setUser, setMessage, setShowSignIn } = useContext(Context);
  const [states, setStates] = useState({
    binning: false,
    deleting: false,
    pinning: false,
    restoring: false,
    settingPrompt: false,
    stashing: false,
    triggerExtra: false,
    triggerPrompt: false,
  });
  const rn = new Date(),
    dateString = rn.toISOString().split("T")[0],
    currentTime = rn.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    [date, setDate] = useState({
      date: dateString,
      time: currentTime,
      repeatOption: "One time",
    });

  const toolbarBtns = [
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
  ];

  const setNotePrompt = (id, newNote) => {
    setStates((prev) => ({ ...prev, settingPrompt: true }));
    update_prop(id, newNote)
      .then((note) => {
        setUser((prev) => {
          const updatedNotes = prev.notes.map((nt) =>
            nt._id === note._id ? note : nt
          );
          return { ...prev, notes: updatedNotes };
        });
        setMessage({
          color: Color.info,
          info: `Note ${note.binned ? "binned" : "restored"}.`,
        });
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
      .finally(() => setStates((prev) => ({ ...prev, settingPrompt: false })));
  };

  return (
    <div tabIndex={0} className={styles.actualNote}>
      {!n.binned && (
        <div className={styles.toggleContainer}>
          <IconButton
            className={classes.icnBtn}
            color={"inherit"}
            aria-label={n.pinned ? "Unpin note" : "Pin note"}
            onClick={() => {
              setStates((prev) => ({ ...prev, pinning: true }));
              update_prop(n._id, { ...n, pinned: !n.pinned })
                .then((note) => {
                  setUser((prev) => {
                    const updatedNotes = prev.notes.map((nt) =>
                      nt._id === note._id ? note : nt
                    );
                    return { ...prev, notes: updatedNotes };
                  });
                  setMessage({
                    color: Color.info,
                    info: `Note ${note.pinned ? "pinned" : "unpinned"}.`,
                  });
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
                .finally(() =>
                  setStates((prev) => ({ ...prev, pinning: false }))
                );
            }}
          >
            {states.pinning ? (
              <CircularProgress
                sx={{ width: "18px !important", height: "18px !important" }}
                color={"inherit"}
              />
            ) : n.pinned ? (
              <PushPin />
            ) : (
              <PushPinOutlined />
            )}
          </IconButton>
        </div>
      )}
      <section className={styles.noteAttributes}>
        {n.title && <p className={styles.noteTitle}>{n.title}</p>}
        {n.content && <p className={styles.noteContent}>{n.content}</p>}
        {n.prompt?.dueDate && (
          <Button
            sx={{
              padding: "4px 8px",
              borderRadius: 9,
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
              gap: 0.5,
              marginLeft: "auto",
            }}
            color={"inherit"}
            onClick={() =>
              setStates((prev) => ({ ...prev, triggerPrompt: true }))
            }
          >
            {new Date(n.prompt.dueDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {n.prompt.repeat !== "One time" && (
              <RepeatRounded color={"inherit"} />
            )}
          </Button>
        )}
      </section>
      <div
        className={`${styles.noteToolie} ${
          states.triggerExtra && styles.showToolies
        }`}
      >
        {n.binned ? (
          <>
            <IconButton
              color={"inherit"}
              aria-label={"Delete note"}
              onClick={() => {
                setStates((prev) => ({ ...prev, deleting: true }));
                delete_note(n._id)
                  .then(({ message }) => {
                    setUser((prev) => ({
                      ...prev,
                      notes: prev.notes.filter((nt) => nt._id !== n.id),
                    }));
                    setMessage({ color: Color.info, info: message });
                  })
                  .catch(({ message }) =>
                    setMessage({ color: Color.error, info: message })
                  )
                  .finally(() =>
                    setStates((prevStates) => ({
                      ...prevStates,
                      deleting: false,
                    }))
                  );
              }}
              disabled={states.deleting}
            >
              {states.deleting ? (
                <CircularProgress
                  color={"inherit"}
                  sx={{ width: "18px !important", height: "18px !important" }}
                />
              ) : (
                <DeleteForeverTwoTone />
              )}
            </IconButton>
            <IconButton
              color={"inherit"}
              aria-label={"Restore note"}
              onClick={() => {
                setStates((prev) => ({ ...prev, restoring: true }));
                update_prop(n._id, { ...n, binned: !n.binned })
                  .then((note) => {
                    setUser((prev) => {
                      const updatedNotes = prev.notes.map((nt) =>
                        nt._id === note._id ? note : nt
                      );

                      return {
                        ...prev,
                        notes: updatedNotes,
                      };
                    });
                    setMessage({
                      color: Color.info,
                      info: `Note ${note.binned ? "binned" : "restored"}.`,
                    });
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
                  .finally(() =>
                    setStates((prev) => ({ ...prev, restoring: false }))
                  );
              }}
              disabled={states.restoring}
            >
              <RestoreFromTrashTwoTone />
            </IconButton>
          </>
        ) : (
          <>
            {toolbarBtns.map((item, i) => (
              <IconButton
                className={classes.icnBtn}
                color={"inherit"}
                key={`${i}-${item.tooltip}`}
                aria-label={item.tooltip}
                onClick={item.clickFunc}
              >
                {item.icon}
              </IconButton>
            ))}
            <IconButton
              className={classes.icnBtn}
              color={"inherit"}
              onClick={() => {
                setStates((prev) => ({ ...prev, stashing: true }));
                update_prop(n._id, { ...n, stashed: !n.stashed })
                  .then((note) => {
                    setUser((prev) => {
                      const updatedNotes = prev.notes.map((nt) =>
                        nt._id === note._id ? note : nt
                      );
                      return {
                        ...prev,
                        notes: updatedNotes,
                      };
                    });
                    setMessage({
                      color: Color.info,
                      info: `Note ${note.stashed ? "stashed" : "unstashed"}.`,
                    });
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
                  .finally(() =>
                    setStates((prev) => ({ ...prev, stashing: false }))
                  );
              }}
              aria-label={
                states.stashing
                  ? "stashing note"
                  : n.stashed
                  ? "unstash note"
                  : "Stash note"
              }
              disabled={states.stashing}
            >
              {states.stashing ? (
                <CircularProgress
                  color={"inherit"}
                  sx={{ width: "18px !important", height: "18px !important" }}
                />
              ) : n.stashed ? (
                <Unarchive />
              ) : (
                <Archive />
              )}
            </IconButton>
            <div style={{ position: "relative" }}>
              <IconButton
                className={classes.icnBtn}
                color={"inherit"}
                aria-label={"Set/Edit note prompt"}
                aria-pressed={states.triggerPrompt}
                onClick={() =>
                  setStates((prev) => ({ ...prev, triggerPrompt: true }))
                }
                disabled={states.settingPrompt}
              >
                {states.settingPrompt ? (
                  <CircularProgress
                    color={"inherit"}
                    sx={{ width: "18px !important", height: "18px !important" }}
                  />
                ) : (
                  <AddAlert />
                )}
              </IconButton>
              {states.triggerPrompt && (
                <>
                  <Backdrop
                    sx={{ background: "transparent" }}
                    open={states.triggerPrompt}
                    onClick={() =>
                      setStates((prev) => ({ ...prev, triggerPrompt: false }))
                    }
                  />
                  <div className={styles.promptingWrapper}>
                    <p>Select date and time</p>
                    <form
                      onSubmit={() =>
                        setNotePrompt(n._id, {
                          ...n,
                          prompt: {
                            date: date.date,
                            time: date.time,
                            repeat: date.repeatOption,
                          },
                        })
                      }
                      method="post"
                    >
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          flexFlow: "row nowrap",
                          alignItems: "center",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.4)",
                          marginTop: 10,
                          padding: "4px 2px",
                        }}
                      >
                        <input
                          type="text"
                          readOnly
                          value={new Date(date.date).toLocaleDateString(
                            undefined,
                            { day: "2-digit", month: "short", year: "numeric" }
                          )}
                          style={{ margin: 0, padding: 0, border: 0 }}
                        />
                        <label htmlFor={"prompt-date"}>
                          <IconButton
                            sx={{ width: 24, height: 24 }}
                            color={"inherit"}
                            onClick={() => {
                              const datePicker =
                                document.getElementById("date-picker");
                              datePicker.click();
                            }}
                          >
                            <ExpandMore color={"inherit"} />
                          </IconButton>
                        </label>
                        <input
                          type={"date"}
                          name={"prompt-date"}
                          id={"prompt-date"}
                          min={dateString}
                          onChange={({ target: { value } }) =>
                            setDate((prev) => ({ ...prev, date: value }))
                          }
                          value={n.prompt?.date || date.date}
                          placeholder={date.date.replace(/-/gu, "/")}
                          style={{
                            position: "absolute",
                            top: 10,
                            left: 0,
                            // zIndex: 1,
                            opacity: 0,
                            border: 0,
                            margin: 0,
                            padding: 0,
                          }}
                        />
                      </div>
                      <input
                        type={"time"}
                        name={"prompt-date"}
                        id={"prompt"}
                        min={currentTime}
                        onChange={({ target: { value } }) =>
                          setDate((prev) => ({ ...prev, time: value }))
                        }
                        value={n.prompt?.time || date.time}
                        placeholder={date.time}
                      />
                      <select
                        value={n.prompt?.repeat || date.repeatOption}
                        onChange={({ target: { value } }) =>
                          setDate((prev) => ({ ...prev, repeatOption: value }))
                        }
                      >
                        {[
                          "One time",
                          "Daily",
                          "Weekly",
                          "Monthly",
                          "Yearly",
                        ].map((opt, i) => (
                          <option
                            key={`${opt.replace(/[^\w]/gu, "")}${i}`}
                            value={opt}
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      <Button
                        sx={{
                          m: "12px 0 0",
                          textTransform: "none",
                          fontFamily: "inherit",
                        }}
                        color={"inherit"}
                        type={"submit"}
                      >
                        Save
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </div>
            <div style={{ position: "relative" }}>
              <IconButton
                className={classes.icnBtn}
                color={"inherit"}
                aria-label={"Extra options"}
                aria-pressed={states.triggerExtra}
                onClick={() =>
                  setStates((prev) => ({
                    ...prev,
                    triggerExtra: !prev.triggerExtra,
                  }))
                }
                disabled={states.binning}
              >
                {states.binning ? (
                  <CircularProgress
                    sx={{ width: "18px !important", height: "18px !important" }}
                    color={"inherit"}
                  />
                ) : (
                  <MoreVert />
                )}
              </IconButton>
              {states.triggerExtra && (
                <>
                  <Backdrop
                    sx={{ backgroundColor: "transparent" }}
                    open={states.triggerExtra}
                    onClick={() =>
                      setStates((prev) => ({
                        ...prev,
                        triggerExtra: false,
                      }))
                    }
                  />
                  <div className={styles.extraBtnsWrapper}>
                    <Button
                      color={"inherit"}
                      onClick={() => {
                        setStates((prev) => ({ ...prev, binning: true }));
                        update_prop(n._id, { ...n, binned: !n.binned })
                          .then((note) => {
                            setUser((prev) => {
                              const updatedNotes = prev.notes.map((nt) =>
                                nt._id === note._id ? note : nt
                              );
                              return {
                                ...prev,
                                notes: updatedNotes,
                              };
                            });
                            setMessage({
                              color: Color.info,
                              info: `Note ${
                                note.binned ? "binned" : "restored"
                              }.`,
                            });
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
                            } else
                              setMessage({ color: Color.error, info: message });
                          })
                          .finally(() =>
                            setStates((prev) => ({ ...prev, binning: false }))
                          );
                      }}
                    >
                      Bin note
                    </Button>
                    <Button color={"inherit"}>Add tag</Button>
                    <Button color={"inherit"}>Add scribble</Button>
                    <Button color={"inherit"}>Duplicate</Button>
                    <Button color={"inherit"}>Show checkboxes</Button>
                    <Button color={"inherit"}>Copy to Cloud</Button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Note.propTypes = { n: PropTypes.object.isRequired };

export default Note;
