import { Brush, CheckBox, Image } from "@mui/icons-material";
import { IconButton } from "@mui/material";
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
