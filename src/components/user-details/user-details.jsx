import {
  AccountCircle as SignedInIcon,
  Circle as Dot,
  Close as CloseIcon,
  Login as SignInIcon,
  Logout as SignOutIcon,
  NoAccounts as SignedOutIcon,
} from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import { useContext, useState } from "react";
import { set_token, sign_out } from "../../services/auth";
import { Color, Context } from "../context-provider";
import styles from "./user-details.module.css";

const useStyles = makeStyles({
  modal: {
    "&": { "& .MuiBackdrop-root": { backgroundColor: "rgba(0, 0, 0, 0)" } },
  },
});

const UserDetails = () => {
  const classes = useStyles(),
    {
      user,
      setUser,
      showAccountState,
      setShowAccountState,
      setShowSignIn,
      setMessage,
    } = useContext(Context),
    [show, setShow] = useState(false);

  if (showAccountState) setTimeout(() => setShow(true), 150);
  else setTimeout(() => setShow(false), 150);

  return (
    <Modal
      open={showAccountState}
      onClose={() => {
        setShow(false);
        setTimeout(() => setShowAccountState(false), 150);
      }}
      className={classes.modal}
    >
      <div
        className={`${styles.detailsWrapper} ${!show && styles.hideWrapper}`}
      >
        <section>
          <div className={styles.userDetails}>
            {user ? (
              <SignedInIcon fontSize={"large"} />
            ) : (
              <SignedOutIcon fontSize={"large"} />
            )}
            <div>
              {user ? (
                <>
                  <p className={styles.greetings}>
                    Hey there, <span>{user.username}</span>!
                  </p>
                  <button
                    type={"button"}
                    onClick={() => console.log("edit account details")}
                    className={styles.editDetails}
                  >
                    Edit account details
                  </button>
                </>
              ) : (
                <p>Sign in to use all Kwik Notes features</p>
              )}
            </div>
          </div>
        </section>
        <button
          type={"button"}
          onClick={
            user
              ? () => {
                  sign_out()
                    .then(({ message }) => {
                      setUser(null);
                      setMessage({
                        color: Color.info,
                        info: message,
                      });
                      window.localStorage.removeItem("token");
                      set_token(null);
                      setShowSignIn(true);
                    })
                    .catch(({ message }) => {
                      setMessage({ color: Color.error, info: message });
                    })
                    .finally(() => setShowAccountState(false));
                }
              : () => {
                  setShowAccountState(false);
                  setShowSignIn(true);
                }
          }
          className={styles.signBtn}
        >
          {user ? (
            <>
              Sign out
              <SignOutIcon />
            </>
          ) : (
            <>
              Sign in
              <SignInIcon />
            </>
          )}
        </button>
        <div className={styles.bottom}>
          <a href={"/privacy-policy"}>Privacy policy</a>
          <Dot />
          <a href={"/terms-of-service"}>Terms of service</a>
        </div>
        <button
          className={styles.hiddenExit}
          type={"button"}
          onClick={() => setShowAccountState(false)}
          aria-label={"Exit account details"}
        >
          <CloseIcon />
        </button>
      </div>
    </Modal>
  );
};

export default UserDetails;
