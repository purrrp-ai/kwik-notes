import KwikNotesLogo from "@assets/svgs/logo";
import { KwikNotesContext } from "@context/kwik-notes_context-provider";
import Login from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import SignInService from "@services/sign-in";
import React, { useContext, useRef, useState } from "react";
import styles from "./sign-in.module.css";

const useStyles = makeStyles({
  base: {
    "&": {
      "& .MuiTextField-root": {
        "& .MuiFormLabel-root": {
          font: "inherit",
          color: "hsla(210, 20%, 20%, 0.75)",
          pointerEvents: "none",
          userSelect: "none",
        },
        "& .MuiInputBase-root": {
          font: "inherit",
          color: "inherit",
          marginBottom: "1em",
          "&::before": {
            borderBottomColor: "hsla(205, 19.6%, 19%, 0.3)",
          },
          "&:hover::before": {
            borderBottom: "1px solid hsla(205, 19.6%, 19%, 0.6)",
          },
          "&::after": {
            borderBottom: "1px solid var(--deep-blue)",
          },
        },
        "& .MuiButtonBase-root": {
          color: "hsla(205, 19.6%, 19%, 0.75)",
          "&:hover, &:focus": {
            color: "var(--deep-blue)",
          },
        },
      },
    },
    "& .MuiFormHelperText-root": {
      all: "unset",
      position: "absolute",
      width: "fit-content",
      right: 0,
      bottom: "1.75em",
      fontSize: "0.75em",
      lineHeight: "1.5em",
      pointerEvents: "none",
      userSelect: "none",
    },
  },
  passwordBase: { "&": { "& .MuiFormHelperText-root": { bottom: "1.25em" } } },
  signInBtn: {
    "&": {
      fontSize: "1em !important",
      fontFamily: "inherit !important",
      padding: "8px !important",
      color: "inherit !important",
      borderColor: "hsla(205, 19.6%, 19%, 0.4) !important",
      "&:hover": {
        backgroundColor: "hsla(205, 19.6%, 19%, 0.05) !important",
        borderColor: "hsla(205, 19.6%, 19%, 0.6) !important",
      },
    },
  },
  signingInSpinner: {
    "&": {
      color: "hsl(210, 20%, 20%) !important",
      margin: "3px auto",
    },
  },
});

export default function SignIn() {
  const classes = useStyles(),
    { setContexts } = useContext(KwikNotesContext),
    [formData, setFormData] = useState({
      emailSignIn: false,
      username: "",
      email: "",
      HelperText: "",
      password: "",
      passwordHelperText: "",
      showPassword: false,
      signingIn: false,
    });

  const handleFieldChange = (target) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const signInMethodChange = () => {
    if (formData.emailSignIn) {
      setFormData((prev) => ({
        ...prev,
        username: "",
        usernameHelperText: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        email: "",
        emailHelperText: "",
      }));
    }
    setFormData((prev) => ({ ...prev, emailSignIn: !prev.emailSignIn }));
  };

  const handleSignIn = (event) => {
    setFormData((prev) => ({ ...prev, signingIn: true }));
    event.preventDefault();

    const credentials = formData.username
      ? {
          username: formData.username,
          password: formData.password,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    if (credentials.hasOwnProperty("email")) {
      if (credentials.email == "") {
        setFormData((prev) => ({
          ...prev,
          HelperText: "email field cannot be empty",
          signingIn: false,
        }));

        return setTimeout(
          () =>
            setFormData((prev) => ({
              ...prev,
              HelperText: "",
            })),
          4000
        );
      }
      if (
        !/^(?=[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,253}\.){1,5}[a-zA-Z]{2,63}$)[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,253}\.){1,5}[a-zA-Z]{2,63}$/.test(
          credentials.email
        )
      ) {
        setFormData((prev) => ({
          ...prev,
          HelperText: "email format is invalid",
          signingIn: false,
        }));

        return setTimeout(
          () =>
            setFormData((prev) => ({
              ...prev,
              HelperText: "",
            })),
          4000
        );
      }
    }

    if (credentials.hasOwnProperty("username") && !credentials.username) {
      setFormData((prev) => ({
        ...prev,
        HelperText: "username field cannot be empty",
        signingIn: false,
      }));

      return setTimeout(
        () =>
          setFormData((prev) => ({
            ...prev,
            HelperText: "",
          })),
        4000
      );
    }

    if (!credentials.password) {
      setFormData((prev) => ({
        ...prev,
        passwordHelperText: "password field cannot be empty",
        signingIn: false,
      }));

      return setTimeout(
        () =>
          setFormData((prev) => ({
            ...prev,
            passwordHelperText: "",
          })),
        4000
      );
    }

    SignInService.SignIn(credentials)
      .then((data) => setContexts((prev) => ({ ...prev, user: data })))
      .catch((exception) => {
        const {
          response: {
            data: { error },
          },
        } = exception;
        if (error.includes("account"))
          setFormData((prev) => ({ ...prev, HelperText: error }));
        else if (error.includes("password"))
          setFormData((prev) => ({ ...prev, passwordHelperText: error }));
        else {
          console.log(exception);
        }
      })
      .finally(() => {
        setFormData((prev) => ({
          ...prev,
          // username: "",
          // email: "",
          // password: "",
          signingIn: false,
        }));

        setTimeout(() => {
          setFormData((prev) => ({
            ...prev,
            HelperText: "",
            passwordHelperText: "",
          }));
        }, 4000);
      });
  };

  return (
    <div className={styles.signInFormContainer}>
      <a className={styles.logoLink} href={"/"}>
        <KwikNotesLogo w={1.75} />
        Kwik Notes
      </a>
      <form
        className={styles.signInForm}
        method={"post"}
        onSubmit={handleSignIn}
      >
        <FormGroup>
          <FormControl className={classes.base}>
            <TextField
              type={formData.emailSignIn ? "email" : "text"}
              name={formData.emailSignIn ? "email" : "username"}
              id={formData.emailSignIn ? "email" : "username"}
              onChange={({ target }) => handleFieldChange(target)}
              value={formData.emailSignIn ? formData.email : formData.username}
              variant={"standard"}
              label={formData.emailSignIn ? "EMAIL" : "USERNAME"}
            />
            {formData.HelperText && (
              <FormHelperText error>{formData.HelperText}</FormHelperText>
            )}
            <button
              className={styles.signInMethodToggle}
              type={"button"}
              onClick={() => signInMethodChange()}
            >
              Sign In with {formData.emailSignIn ? "username" : "email"}
            </button>
          </FormControl>
          <FormControl className={`${classes.base} ${classes.passwordBase}`}>
            <TextField
              id={"password"}
              name={"password"}
              type={formData.showPassword ? "text" : "password"}
              onChange={({ target }) => handleFieldChange(target)}
              value={formData.password}
              variant={"standard"}
              label={"PASSWORD"}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        showPassword: !prev.showPassword,
                      }))
                    }
                  >
                    {formData.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                ),
              }}
              sx={{ mb: 2, "&": { "& p": { top: "100%" } } }}
            />
            {formData.passwordHelperText && (
              <FormHelperText error>
                {formData.passwordHelperText}
              </FormHelperText>
            )}
          </FormControl>
          {formData.signingIn ? (
            <CircularProgress className={classes.signingInSpinner} />
          ) : (
            <Button
              variant={"outlined"}
              className={classes.signInBtn}
              id={"sign-in__btn"}
              type={"submit"}
              startIcon={<Login />}
            >
              Sign In
            </Button>
          )}
        </FormGroup>
      </form>
      <p className={styles.signUpText}>
        New to <a href={"/"}>Kwik Notes</a>? <a href={"/sign-up"}>Sign up</a>
      </p>
    </div>
  );
}
