import LogoLink from "../../assets/logo/logo-link";
import { Color, Context } from "../context-provider";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import {
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
  LinearProgress,
  Modal,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { sign_up } from "../../services/sign-up";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./sign-up-modal.module.css";

const useStyles = makeStyles({
  default: {
    "&": {
      "& .MuiFormControl-root": {
        "& .MuiFormLabel-root": {
          font: "inherit",
          pointerEvents: "none",
          userSelect: "none",
          color: "inherit",
        },
        "& .MuiInputBase-root": {
          font: "inherit",
          color: "inherit",
          marginBottom: "1em",
          "&::before": {
            borderBottom: "1px solid hsla(0, 0%, 0%, 0.3)",
          },
          "&:hover::before": {
            borderBottom: "1px solid hsla(0, 0%, 0%, 0.6)",
          },
          "&::after": {
            borderBottom: "1px solid hsla(0, 0%, 0%, 0.9)",
          },
        },
        "& .MuiIconButton-root": {
          fontSize: "1.3em",
          "& .MuiSvgIcon-root": {
            fontSize: "1em",
            color: "hsla(0, 0%, 0%, 0.6)",
          },
          "&:hover .MuiSvgIcon-root, &:focus .MuiSvgIcon-root": {
            color: "hsla(0, 0%, 0%, 0.9)",
          },
        },
      },
      "& .MuiFormHelperText-root": {
        all: "unset",
        position: "absolute",
        width: "max-content",
        color: "#f44335",
        right: 0,
        bottom: "0.1em",
        margin: "0 auto",
        fontSize: "0.75em",
        fontWeight: "bolder",
        lineHeight: "1em",
        pointerEvents: "none",
        userSelect: "none",
      },
    },
  },
  emailField: {
    "&": {
      "& .MuiFormControl-root": {
        "& .MuiInputBase-root": { minWidth: "24ch" },
      },
    },
  },
  confirmPassword: { "&": { marginBottom: "1em" } },
  modal: {
    "&": {
      display: "grid",
      placeItems: "center",
      "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0)" },
    },
  },
});

export default function SignUpModal() {
  const classes = useStyles(),
    { showSignUp, setShowSignUp, setShowSignIn, setMessage } =
      useContext(Context),
    [formData, setFormData] = useState({
      username: "",
      usernameHelperText: null,
      email: "",
      emailHelperText: null,
      password: "",
      passwordHelperText: null,
      confirmPassword: "",
      confirmPasswordHelperText: null,
      showPassword: false,
      showConfirmPassword: false,
      creatingAccount: false,
    }),
    [show, setShow] = useState(false);

  if (showSignUp) setTimeout(() => setShow(true), 150);
  else setTimeout(() => setShow(false), 150);

  const handleToggleShowPassword = (field) =>
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSignUp = (event) => {
    setFormData((prev) => ({ ...prev, creatingAccount: true }));
    event.preventDefault();

    const userDeets = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    };

    sign_up(userDeets)
      .then((data) => {
        const { username } = data;
        setShow(false);
        setTimeout(() => setShowSignUp(false), 150);
        setFormData((prev) => ({
          ...prev,
          creatingAccount: false,
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }));
        setMessage({
          color: Color.success,
          info: `Sign up successful. Account with username ${username} has been created.`,
        });
        // sign_up()
      })
      .catch((error) => {
        const { message } = error;
        if (/email/.test(message)) {
          setFormData((prev) => ({
            ...prev,
            signingIn: false,
            emailHelperText: message,
          }));
        } else if (new RegExp(userDeets.username).test(message)) {
          setFormData((prev) => ({
            ...prev,
            signingIn: false,
            usernameHelperText: message,
          }));
        } else setMessage({ color: Color.error, info: message });
      })
      .finally(() => {
        setFormData((prev) => ({ ...prev, creatingAccount: false }));
        setTimeout(() => {
          setFormData((prev) => ({
            ...prev,
            usernameHelperText: null,
            emailHelperText: null,
            passwordHelperText: null,
            confirmPasswordHelperText: null,
          }));
        }, 4000);
      });
  };

  return (
    <Modal
      open={showSignUp}
      onClose={() => {
        setShow(false);
        setTimeout(() => showSignUp(false), 150);
      }}
      className={classes.modal}
    >
      <div className={`${styles.formWrapper} ${!show && styles.hideWrapper}`}>
        <div className={styles.topSection}>
          <LogoLink w={1.75} />
        </div>
        <h1>Create an account</h1>
        <form onSubmit={handleSignUp}>
          <FormControl className={`${classes.default} ${classes.emailField}`}>
            <TextField
              variant={"standard"}
              id={"email"}
              type={"email"}
              name={"email"}
              onChange={({ target: { value } }) => {
                setFormData((prev) => ({ ...prev, email: value }));
                if (!value) {
                  setFormData((prev) => ({ ...prev, emailHelperText: null }));
                } else if (
                  !/^(?=[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,253}\.){1,5}[a-zA-Z]{2,63}$)[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,253}\.){1,5}[a-zA-Z]{2,63}$/.test(
                    value
                  )
                ) {
                  setFormData((prev) => ({
                    ...prev,
                    emailHelperText: "Invalid email format",
                  }));
                } else
                  setFormData((prev) => ({ ...prev, emailHelperText: null }));
              }}
              value={formData.email}
              label={"EMAIL"}
              error={Boolean(formData.emailHelperText)}
            />
            <FormHelperText>{formData.emailHelperText}</FormHelperText>
          </FormControl>
          <FormControl className={`${classes.default}`}>
            <TextField
              variant={"standard"}
              id={"username"}
              type={"text"}
              name={"username"}
              onChange={({ target: { value } }) => {
                setFormData((prev) => ({ ...prev, username: value }));
                if (!value) {
                  setFormData((prev) => ({
                    ...prev,
                    usernameHelperText: null,
                  }));
                } else if (value.length < 3) {
                  setFormData((prev) => ({
                    ...prev,
                    usernameHelperText: "username is too short",
                  }));
                } else if (value.length > 15) {
                  setFormData((prev) => ({
                    ...prev,
                    usernameHelperText:
                      "username cannot be more that 20 characters",
                  }));
                } else if (/[^\w\d.-]/.test(value)) {
                  setFormData((prev) => ({
                    ...prev,
                    usernameHelperText:
                      "Allowed username characters: [a-z, A-Z, 0-9, _, -, .]",
                  }));
                } else if (/^[.-]|[.-]$/.test(value)) {
                  setFormData((prev) => ({
                    ...prev,
                    usernameHelperText:
                      "username cannot start or end with a period/hyphen",
                  }));
                } else if (/[.-]{2,}/.test(value)) {
                  setFormData((prev) => ({
                    ...prev,
                    usernameHelperText:
                      "consecutive hyphens/periods aren't allowed",
                  }));
                } else
                  setFormData((prev) => ({
                    ...prev,
                    usernameHelperText: null,
                  }));
              }}
              value={formData.username}
              label={"USERNAME"}
              error={Boolean(formData.usernameHelperText)}
            />
            <FormHelperText>{formData.usernameHelperText}</FormHelperText>
          </FormControl>
          <FormGroup
            className={`${classes.default} ${classes.confirmPassword}`}
          >
            <FormControl>
              <TextField
                variant={"standard"}
                id={"password"}
                type={formData.showPassword ? "text" : "password"}
                name={"password"}
                onChange={({ target: { value } }) => {
                  setFormData((prev) => ({ ...prev, password: value }));
                  if (!value) {
                    setFormData((prev) => ({
                      ...prev,
                      passwordHelperText: null,
                    }));
                  } else if (value.length < 9) {
                    setFormData((prev) => ({
                      ...prev,
                      passwordHelperText: "Password is too short",
                    }));
                  } else if (!/(?=.*\d)/.test(value)) {
                    setFormData((prev) => ({
                      ...prev,
                      passwordHelperText: "password should have a number",
                    }));
                  } else if (!/(?=.*[a-z])/.test(value)) {
                    setFormData((prev) => ({
                      ...prev,
                      passwordHelperText:
                        "password should have a lowercase letter",
                    }));
                  } else if (!/(?=.*[A-Z])/.test(value)) {
                    setFormData((prev) => ({
                      ...prev,
                      passwordHelperText:
                        "password should have an uppercase letter",
                    }));
                  } else if (!/(?=.*[^a-zA-Z\d])/.test(value)) {
                    setFormData((prev) => ({
                      ...prev,
                      passwordHelperText:
                        "password should have a special character",
                    }));
                  } else if (/(?=.*[^\w.!@#$%^&*()])/.test(value)) {
                    setFormData((prev) => ({
                      ...prev,
                      passwordHelperText:
                        "allowed characters: [a-z, A-Z, _, ., !, @, #, $, %, ^, &, *, (, )]",
                    }));
                  } else
                    setFormData((prev) => ({
                      ...prev,
                      passwordHelperText: null,
                    }));
                }}
                value={formData.password}
                label={"PASSWORD"}
                error={Boolean(formData.passwordHelperText)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label={
                        formData.showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      aria-pressed={formData.showPassword}
                      onClick={() => handleToggleShowPassword("showPassword")}
                    >
                      {formData.showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <FormHelperText>{formData.passwordHelperText}</FormHelperText>
            </FormControl>
            <FormControl>
              <TextField
                variant={"standard"}
                id={"confirm-password"}
                type={formData.showConfirmPassword ? "text" : "password"}
                name={"confirmPassword"}
                onChange={({ target: { value } }) => {
                  setFormData((prev) => ({ ...prev, confirmPassword: value }));
                  if (!value) {
                    setFormData((prev) => ({
                      ...prev,
                      confirmPasswordHelperText: null,
                    }));
                  } else if (value != formData.password) {
                    // submitBtnRef.current.disabled = true;
                    setFormData((prev) => ({
                      ...prev,
                      confirmPasswordHelperText: "Password does not match",
                    }));
                  } else if (value == formData.password) {
                    // submitBtnRef.current.disabled = false;
                    setFormData((prev) => ({
                      ...prev,
                      confirmPasswordHelperText: null,
                    }));
                  }
                }}
                disabled={!formData.password}
                value={formData.confirmPassword}
                label={"CONFIRM PASSWORD"}
                error={Boolean(formData.confirmPasswordHelperText)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label={
                        formData.showConfirmPassword
                          ? "Show password confirmation value"
                          : "Hide password confirmation value"
                      }
                      aria-pressed={formData.showConfirmPassword}
                      onClick={() =>
                        handleToggleShowPassword("showConfirmPassword")
                      }
                    >
                      {formData.showConfirmPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <FormHelperText>
                {formData.confirmPasswordHelperText}
              </FormHelperText>
            </FormControl>
          </FormGroup>
          {formData.creatingAccount ? (
            <LinearProgress sx={{ marginBlock: 3.325 }} color={"inherit"} />
          ) : (
            <button
              className={styles.signUpBtn}
              id={"sign-up__btn"}
              type={"submit"}
            >
              Sign Up
            </button>
          )}
        </form>
        <p>
          Already a <Link to={"/"}>Kwik Notes</Link> user?{" "}
          <button
            type={"button"}
            onClick={() => {
              setShow(false);
              setFormData((prev) => ({
                ...prev,
                email: "",
                username: "",
                password: "",
                confirmPassword: "",
              }));
              setTimeout(() => {
                setShowSignUp(false);
                setShowSignIn(true);
              }, 150);
            }}
          >
            Sign In
          </button>
        </p>
      </div>
    </Modal>
  );
}
