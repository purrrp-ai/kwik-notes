import { KwikNotesContext } from "@context/kwik-notes_context-provider";
import Modal from "@mui/material/Modal/Modal";
import SignIn from "@pages/sign-in/sign-in";
import React, { useContext } from "react";

export default function SignInModal() {
  const { contexts, setContexts } = useContext(KwikNotesContext),
    style = {
      outline: "1px solid transparent",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      backgroundColor: "var(--notepad)",
      borderRadius: 8,
      boxShadow: `hsl(42, 85%, 67%) 0px 2px 4px,
      hsl(42, 85%, 64%) 0px 7px 13px -3px,
      hsl(42, 85%, 61%) 0px -3px 0px inset`,
      padding: 12,
      "&:focus": {
        outlineColor: "hsla(206, 19.6%, 19%, 0.5)",
      },
    };

  return (
    <Modal
      open={contexts.showSignInModal}
      onClose={() =>
        setContexts((prev) => ({ ...prev, showSignInModal: false }))
      }
    >
      <div style={style}>
        <SignIn />
      </div>
    </Modal>
  );
}
