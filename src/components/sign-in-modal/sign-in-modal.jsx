import {
  Login as Signin,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext, useState } from "react";
import LogoLink from "../../assets/logo/logo-link";
import { set_token, sign_in } from "../../services/auth";
import { Color, Context } from "../context-provider";
import styles from "./sign-in-modal.module.css";

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
      color: "#f44336",
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
  modal: {
    "&": {
      display: "grid",
      placeItems: "center",
      "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0)" },
    },
  },
});

export default function SignInModal() {
  const classes = useStyles(),
    { setUser, showSignIn, setShowSignIn, setMessage, setShowSignUp } =
      useContext(Context),
    [formData, setFormData] = useState({
      emailSignIn: false,
      username: "",
      email: "",
      HelperText: "",
      password: "",
      passwordHelperText: "",
      showPassword: false,
      signingIn: false,
    }),
    [show, setShow] = useState(false);

  if (showSignIn) setTimeout(() => setShow(true), 150);
  else setTimeout(() => setShow(false), 150);

  const signInMethodChange = () => {
    formData.emailSignIn
      ? setFormData((prev) => ({
          ...prev,
          username: "",
          HelperText: "",
        }))
      : setFormData((prev) => ({
          ...prev,
          email: "",
          HelperText: "",
        }));

    setFormData((prev) => ({ ...prev, emailSignIn: !prev.emailSignIn }));
  };

  const handleSignIn = (event) => {
    setFormData((prev) => ({ ...prev, signingIn: true }));
    event.preventDefault();

    sign_in({
      usernameOrEmail: formData.username || formData.email,
      password: formData.password,
    })
      .then(({ email, token, username }) => {
        setUser({ email, username });
        setFormData((prev) => ({
          ...prev,
          emailSignIn: false,
          username: "",
          email: "",
          HelperText: "",
          password: "",
          passwordHelperText: "",
        }));
        window.localStorage.setItem(
          "token",
          JSON.stringify({ accessToken: token })
        );
        const token_ = JSON.parse(window.localStorage.getItem("token"));
        set_token(token_.accessToken);
        setShowSignIn(false);
        setMessage({
          color: Color.success,
          info: `Signed in as ${username}`,
        });
      })
      .catch(({ message }) => {
        if (/Sorry/.test(message))
          setFormData((prev) => ({ ...prev, HelperText: message }));
        else if (/Wrong/.test(message))
          setFormData((prev) => ({
            ...prev,
            passwordHelperText: message,
          }));
        else setMessage({ color: Color.error, info: message });
      })
      .finally(() => {
        setFormData((prev) => ({
          ...prev,
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
    <Modal
      open={showSignIn}
      onClose={() => {
        setShow(false);
        setTimeout(() => setShowSignIn(false), 150);
      }}
      className={classes.modal}
    >
      <div className={`${styles.formWrapper} ${!show && styles.hideWrapper}`}>
        <div className={styles.topSection}>
          <LogoLink w={1.75} />
        </div>
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
                value={
                  formData.emailSignIn ? formData.email : formData.username
                }
                variant={"standard"}
                label={formData.emailSignIn ? "EMAIL" : "USERNAME"}
                onChange={({ target: { name, value } }) => {
                  if (name == "email") {
                    setFormData((prev) => ({ ...prev, email: value }));
                    if (!value) {
                      setFormData((prev) => ({ ...prev, HelperText: null }));
                    } else if (
                      !/^(?=[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,253}\.){1,5}[a-zA-Z]{2,63}$)[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,253}\.){1,5}[a-zA-Z]{2,63}$/.test(
                        value
                      )
                    )
                      setFormData((prev) => ({
                        ...prev,
                        HelperText: "invalid email format",
                      }));
                    else setFormData((prev) => ({ ...prev, HelperText: null }));
                  } else if (name == "username") {
                    setFormData((prev) => ({ ...prev, username: value }));
                    if (!value) {
                      setFormData((prev) => ({ ...prev, HelperText: null }));
                    } else
                      setFormData((prev) => ({ ...prev, HelperText: null }));
                  } else setFormData((prev) => ({ ...prev, HelperText: null }));
                }}
              />
              <FormHelperText>{formData.HelperText}</FormHelperText>
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
                onChange={({ target: { value } }) => {
                  setFormData((prev) => ({ ...prev, password: value }));
                  if (!value) {
                    setFormData((prev) => ({
                      ...prev,
                      passwordHelperText: null,
                    }));
                  } else
                    setFormData((prev) => ({
                      ...prev,
                      passwordHelperText: null,
                    }));
                }}
                value={formData.password}
                variant={"standard"}
                label={"PASSWORD"}
                onBlur={() => {
                  if (formData.showPassword)
                    setFormData((prev) => ({ ...prev, showPassword: false }));
                }}
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
                sx={{ mb: 2 }}
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
                startIcon={<Signin />}
              >
                Sign In
              </Button>
            )}
          </FormGroup>
        </form>
        <p className={styles.signUpText}>
          New to <a href={"/"}>Kwik Notes</a>?{" "}
          <button
            type={"button"}
            onClick={() => {
              setShow(false);
              setTimeout(() => {
                setShowSignIn(false);
                setShowSignUp(true);
              }, 150);
            }}
            className={styles.switchBtn}
          >
            Sign up
          </button>
        </p>
      </div>
    </Modal>
  );
}
