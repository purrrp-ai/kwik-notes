import Brush from "@mui/icons-material/Brush";
import CheckBox from "@mui/icons-material/CheckBox";
import Image from "@mui/icons-material/Image";
import IconButton from "@mui/material/IconButton/IconButton";
import classes from "./create.module.css";

export default function Create() {
  return (
    <section className={classes["create-wrapper"]}>
      <input
        className={classes["placeholder"]}
        placeholder={"Take a note..."}
      />
      <div className={classes["modes"]}>
        <IconButton color={"inherit"}>
          <CheckBox />
        </IconButton>
        <IconButton color={"inherit"}>
          <Brush />
        </IconButton>
        <IconButton color={"inherit"}>
          <Image />
        </IconButton>
      </div>
    </section>
  );
}
