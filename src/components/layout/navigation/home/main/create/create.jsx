import AddAlert from "@mui/icons-material/AddAlert";
import Archive from "@mui/icons-material/Archive";
import Brush from "@mui/icons-material/Brush";
import CheckBox from "@mui/icons-material/CheckBox";
import ColorLens from "@mui/icons-material/ColorLens";
import Image from "@mui/icons-material/Image";
import MoreVert from "@mui/icons-material/MoreVert";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
import PushPinOutlined from "@mui/icons-material/PushPinOutlined";
import Redo from "@mui/icons-material/Redo";
import Undo from "@mui/icons-material/Undo";
import classes from "./create.module.css";

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
  { icon: <Image />, clickFunc: () => null, tooltip: "Insert picture" },
  { icon: <Archive />, clickFunc: () => null, tooltip: "Stash" },
  { icon: <MoreVert />, clickFunc: () => null, tooltip: "Extra" },
  { icon: <Undo />, clickFunc: () => null, tooltip: "Undo" },
  { icon: <Redo />, clickFunc: () => null, tooltip: "Redo" },
];

export default function Create() {
  return (
    <section className={classes["create-wrapper"]}>
      <div className={classes["note-props"]}>
        <div className={classes["toggle-wrapper"]}>
          <button onClick={() => null}>
            <PushPinOutlined />
          </button>
        </div>
        <textarea
          className={classes["note-title"]}
          placeholder={"Title"}
          name={"note-title"}
          wrap={"soft"}
        ></textarea>
        <textarea
          className={classes["note-content"]}
          placeholder={"Take a note..."}
          name={"note-content"}
          wrap={"soft"}
        ></textarea>
      </div>
      <div className={classes["expanded-modes"]}>
        <div className={classes["toolbar-btns"]}>
          {toolbarBtns.map((item, i) => (
            <button
              key={`${i}-${item.tooltip}`}
              aria-label={item.tooltip}
              onClick={item.clickFunc}
            >
              {item.icon}
            </button>
          ))}
        </div>
        <button>Close</button>
      </div>
      {/* <div className={classes["modes"]}>
        <button>
          <CheckBox />
        </button>
        <button>
          <Brush />
        </button>
        <button>
          <Image />
        </button>
      </div> */}
    </section>
  );
}
