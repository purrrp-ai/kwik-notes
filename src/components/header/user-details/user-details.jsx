import { KwikNotesContext } from "@context/kwik-notes_context-provider";
import {
  AccountCircle as User,
  Circle as Dot,
  Login,
  Logout,
  NoAccounts as NoUser,
} from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import React, { useContext } from "react";
import SignInModal from "./sign-in-modal/sign-in-modal";
import styles from "./user-details.module.css";

const UserDetails = () => {
  const { contexts, setContexts } = useContext(KwikNotesContext);

  return (
    <>
      <Modal
        open={contexts.showUserDetails}
        onClose={() =>
          setContexts((prev) => ({ ...prev, showUserDetails: false }))
        }
      >
        <div className={styles.detailsWrapper}>
          <section>
            <div className={styles.userDetails}>
              {contexts.user ? (
                <User fontSize={"large"} />
              ) : (
                <NoUser fontSize={"large"} />
              )}
              <div>
                {contexts.user ? (
                  <>
                    <p>{contexts.user.username}</p>
                    <p>{contexts.user.email}</p>
                    <button
                      type={"button"}
                      onClick={() => console.log("edit account details")}
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
            autoFocus
            type={"button"}
            onClick={
              contexts.user
                ? () => setContexts((prev) => ({ ...prev, user: null }))
                : () =>
                    setContexts((prev) => ({
                      ...prev,
                      showUserDetails: false,
                      showSignInModal: true,
                    }))
            }
            className={styles.signBtn}
          >
            {contexts.user ? (
              <>
                Sign out
                <Logout />
              </>
            ) : (
              <>
                Sign in
                <Login />
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
            onClick={() =>
              setContexts((prev) => ({ ...prev, showUserDetails: false }))
            }
          >
            Exit account details
          </button>
        </div>
      </Modal>
      <SignInModal />
    </>
  );
};

export default UserDetails;
