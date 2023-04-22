import * as muiIcon from "@mui/icons-material";
import * as muiMaterial from "@mui/material";
import * as React from "react";
import * as RRD from "react-router-dom";

export default function SignUp() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) return;

    const userDeets = {
      name,
      username,
      password,
    };
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <muiMaterial.FormControl>
          <muiMaterial.InputLabel htmlFor={"name"}>NAME</muiMaterial.InputLabel>
          <muiMaterial.Input
            id={"name"}
            type={"text"}
            onChange={({ target }) => setName(target.value)}
            value={name}
          />
        </muiMaterial.FormControl>
        <muiMaterial.FormControl>
          <muiMaterial.InputLabel htmlFor={"username"}>
            USERNAME
          </muiMaterial.InputLabel>
          <muiMaterial.Input
            id={"username"}
            type={"text"}
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </muiMaterial.FormControl>
        <muiMaterial.FormGroup>
          <muiMaterial.FormControl>
            <muiMaterial.InputLabel htmlFor={"password"}>
              PASSWORD
            </muiMaterial.InputLabel>
            <muiMaterial.Input
              id={"password"}
              type={showPassword ? "text" : "password"}
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              inputProps={{
                endAdornment: (
                  <muiMaterial.InputAdornment position={"end"}>
                    <muiMaterial.IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <muiIcon.VisibilityOff />
                      ) : (
                        <muiIcon.Visibility />
                      )}
                    </muiMaterial.IconButton>
                  </muiMaterial.InputAdornment>
                ),
              }}
            />
          </muiMaterial.FormControl>
          <muiMaterial.FormControl>
            <muiMaterial.InputLabel htmlFor={"confirm-password"}>
              CONFIRM PASSWORD
            </muiMaterial.InputLabel>
            <muiMaterial.Input
              id={"confirm-password"}
              type={"password"}
              onChange={({ target }) => setConfirmPassword(target.value)}
              value={confirmPassword}
              inputProps={{
                endAdornment: (
                  <muiMaterial.InputAdornment position={"end"}>
                    <muiMaterial.IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <muiIcon.VisibilityOff />
                      ) : (
                        <muiIcon.Visibility />
                      )}
                    </muiMaterial.IconButton>
                  </muiMaterial.InputAdornment>
                ),
              }}
            />
          </muiMaterial.FormControl>
        </muiMaterial.FormGroup>
        <muiMaterial.Button id={"sign-up__btn"} type={"submit"}>
          Sign Up
        </muiMaterial.Button>
      </form>
      <muiMaterial.Typography>
        Already a{" "}
        <muiMaterial.Button variant={"text"} href={"/"}>
          Kwik Notes
        </muiMaterial.Button>{" "}
        user? <RRD.Link to={"/sign-in"}>Sign In</RRD.Link>
      </muiMaterial.Typography>
    </div>
  );
}
