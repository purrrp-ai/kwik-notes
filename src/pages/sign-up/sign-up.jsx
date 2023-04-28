import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import makeStyles from "@mui/styles/makeStyles";
import signUp from "@services/sign-up";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./sign-up.module.css";

const useStyles = makeStyles({
  default: {
    "&": {
      "& .MuiFormControl-root": {
        "& .MuiFormLabel-root": {
          font: "inherit",
          pointerEvents: "none",
          userSelect: "none",
          color: "hsla(0, 0%, 0%, 0.5)",
          "&.Mui-focused, &.MuiInputLabel-shrink": {
            color: "var(--deep-blue)",
          },
        },
        "& .MuiInputBase-root": {
          font: "inherit",
          marginBottom: "1em",
          "&::before": {
            borderBottom: "1px solid hsla(0, 0%, 0%, 0.2)",
          },
          "&:hover::before": {
            borderBottom: "1px solid hsla(0, 0%, 0%, 0.6)",
          },
          "&::after": {
            borderBottom: "1px solid var(--deep-blue)",
          },
        },
        "& .MuiIconButton-root": {
          fontSize: "1.3em",
          "& .MuiSvgIcon-root": {
            fontSize: "1em",
            color: "hsla(0, 0%, 0%, 0.5)",
          },
          "&:hover .MuiSvgIcon-root, &:focus .MuiSvgIcon-root": {
            color: "var(--deep-blue)",
          },
        },
      },
      "& .MuiFormHelperText-root": {
        all: "unset",
        position: "absolute",
        width: "fit-content",
        right: 0,
        bottom: "-0.2em",
        margin: "0 auto",
        fontSize: "0.75em",
        lineHeight: "1.5em",
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
  signUpBtn: {
    "&": {
      margin: "20px 0",
      backgroundColor: "hsla(205, 20%, 19%, 0.3) !important",
      "& .MuiLinearProgress-bar": {
        backgroundColor: "var(--deep-blue)",
      },
    },
  },
});

export default function SignUp() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
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
  });

  const handleFieldChange = (target) => {
    const { name, value } = target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleShowPassword = (field) =>
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleSignUp = (event) => {
    setFormData((prev) => ({ ...prev, creatingAccount: true }));
    event.preventDefault();

    const userDeets = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    if (!userDeets.email) {
      setFormData((prev) => ({
        ...prev,
        emailHelperText: "email cannot be empty",
        creatingAccount: false,
      }));
      return setTimeout(
        () =>
          setFormData((prev) => ({
            ...prev,
            emailHelperText: "",
          })),
        4000
      );
    }
    if (
      !/^(?=[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,253}\.){1,5}[a-zA-Z]{2,63}$)[a-zA-Z0-9._%+-]{1,64}@([a-zA-Z0-9.-]{1,253}\.){1,5}[a-zA-Z]{2,63}$/.test(
        userDeets.email
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        emailHelperText: "email format is invalid",
        creatingAccount: false,
      }));
      return setTimeout(
        () =>
          setFormData((prev) => ({
            ...prev,
            emailHelperText: "",
          })),
        4000
      );
    }
    if (!userDeets.username) {
      setFormData((prev) => ({
        ...prev,
        usernameHelperText: "username cannot be empty",
        creatingAccount: false,
      }));
      return setTimeout(
        () =>
          setFormData((prev) => ({
            ...prev,
            usernameHelperText: "",
          })),
        4000
      );
    }
    if (userDeets.username.length < 3) {
      setFormData((prev) => ({
        ...prev,
        usernameHelperText: "username is too short",
        creatingAccount: false,
      }));
      return setTimeout(
        () =>
          setFormData((prev) => ({
            ...prev,
            usernameHelperText: "",
          })),
        4000
      );
    }
    if (userDeets.username.length > 20) {
      setFormData((prev) => ({
        ...prev,
        usernameHelperText: "username is too long",
        creatingAccount: false,
      }));
      return setTimeout(
        () =>
          setFormData((prev) => ({
            ...prev,
            usernameHelperText: "",
          })),
        4000
      );
    }
    if (!/^\w[\w.]{1,18}\w$/.test(userDeets.username)) {
      setFormData((prev) => ({
        ...prev,
        usernameHelperText: "invalid username format",
        creatingAccount: false,
      }));
      return setTimeout(
        () =>
          setFormData((prev) => ({
            ...prev,
            usernameHelperText: "",
          })),
        4000
      );
    }
    if (!userDeets.password) {
      setFormData((prev) => ({
        ...prev,
        passwordHelperText: "password cannot be empty",
        creatingAccount: false,
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
    if (userDeets.password < 6) {
      setFormData((prev) => ({
        ...prev,
        passwordHelperText: "password is too short",
        creatingAccount: false,
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
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(userDeets.password)
    ) {
      setFormData((prev) => ({
        ...prev,
        passwordHelperText: "password should be more complex",
        creatingAccount: false,
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

    signUp(userDeets)
      .then((data) => {
        const { username } = data;
        console.log("created account with username:", username);
        setFormData((prev) => ({
          ...prev,
          creatingAccount: false,
          email: "",
          emailHelperText: "",
          username: "",
          usernameHelperText: "",
          password: "",
          passwordHelperText: "",
          confirmPassword: "",
          confirmPasswordHelperText: "",
        }));
      })
      .catch((exception) => {
        const {
          response: {
            data: { error },
          },
        } = exception;
        if (error.includes("email")) {
          setFormData((prev) => ({
            ...prev,
            signingIn: false,
            emailHelperText: error,
          }));
          return setTimeout(() => {
            setFormData((prev) => ({
              ...prev,
              emailHelperText: "",
            }));
          }, 4000);
        }
        if (error.includes(userDeets.username)) {
          setFormData((prev) => ({
            ...prev,
            signingIn: false,
            usernameHelperText: error,
          }));
          return setTimeout(() => {
            setFormData((prev) => ({
              ...prev,
              usernameHelperText: "",
            }));
          }, 4000);
        }
      });
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSignUp}>
        <FormControl className={`${classes.default} ${classes.emailField}`}>
          <TextField
            variant={"standard"}
            id={"email"}
            type={"email"}
            name={"email"}
            onChange={({ target }) => handleFieldChange(target)}
            value={formData.email}
            label={"EMAIL"}
            error={Boolean(formData.emailHelperText)}
          />
          {formData.emailHelperText && (
            <FormHelperText error>{formData.emailHelperText}</FormHelperText>
          )}
        </FormControl>
        <FormControl className={`${classes.default}`}>
          <TextField
            variant={"standard"}
            id={"username"}
            type={"text"}
            name={"username"}
            onChange={({ target }) => handleFieldChange(target)}
            value={formData.username}
            label={"USERNAME"}
            error={Boolean(formData.usernameHelperText)}
          />
          {formData.usernameHelperText && (
            <FormHelperText error>{formData.usernameHelperText}</FormHelperText>
          )}
        </FormControl>
        <FormGroup className={`${classes.default}`}>
          <FormControl>
            <TextField
              variant={"standard"}
              id={"password"}
              type={formData.showPassword ? "text" : "password"}
              name={"password"}
              onChange={({ target }) => handleFieldChange(target)}
              value={formData.password}
              label={"PASSWORD"}
              error={Boolean(formData.passwordHelperText)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label={
                      formData.showPassword ? "Hide password" : "Show password"
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
            {formData.passwordHelperText && (
              <FormHelperText error>
                {formData.passwordHelperText}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <TextField
              variant={"standard"}
              id={"confirm-password"}
              type={formData.showConfirmPassword ? "text" : "password"}
              name={"confirmPassword"}
              onChange={({ target }) => handleFieldChange(target)}
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
            {formData.confirmPasswordHelperText && (
              <FormHelperText error>
                {formData.confirmPasswordHelperText}
              </FormHelperText>
            )}
          </FormControl>
        </FormGroup>
        {formData.creatingAccount ? (
          <LinearProgress className={classes.signUpBtn} />
        ) : (
          <button
            className={styles.signUpBtn}
            id={"sign-up__btn"}
            type={"submit"}
            disabled={formData.creatingAccount}
          >
            Sign Up
          </button>
        )}
      </form>
      <p>
        Already a <Link to={"/"}>Kwik Notes</Link> user?{" "}
        <Link to={"/sign-in"}>Sign In</Link>
      </p>
    </div>
  );
}
