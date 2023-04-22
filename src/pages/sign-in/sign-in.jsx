import { KwikNotesContext } from "@context/kwik-notes_context-provider";
import * as muiMaterials from "@mui/material";
import signIn from "@services/sign-in";
import * as React from "react";
import * as RRD from "react-router-dom";

export default function SignIn() {
  const { user, setUser } = React.useContext(KwikNotesContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSignIn(event) {
    event.preventDefault();

    const credentials = { username, password };

    signIn(credentials)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setUsername("");
        setPassword("");
      });
  }

  return (
    <div>
      <form method={"post"} onSubmit={handleSignIn}>
        <muiMaterials.FormControl>
          <muiMaterials.InputLabel
            htmlFor={"username-field"}
            sx={{ pointerEvents: "none", userSelect: "none" }}
          >
            USERNAME
          </muiMaterials.InputLabel>
          <muiMaterials.Input
            type={"text"}
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </muiMaterials.FormControl>
        <muiMaterials.FormControl>
          <muiMaterials.InputLabel
            htmlFor={"password-field"}
            sx={{ pointerEvents: "none", userSelect: "none" }}
          >
            PASSWORD
          </muiMaterials.InputLabel>
          <muiMaterials.Input
            type={"password"}
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
        </muiMaterials.FormControl>
        <button type="submit">Sign In</button>
      </form>
      <p>
        New to <a href={"/"}>Kwik Notes</a>?{" "}
        <RRD.Link to={"/sign-up"}>Sign up</RRD.Link>
      </p>
    </div>
  );
}
