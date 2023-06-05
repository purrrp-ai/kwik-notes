import React from "react";
import KwikNotesLogo from "./logo";
import styles from "./logo-link.module.css";

const LogoLink = ({ w }) => (
  <a href={"/"} className={styles.logoLink}>
    <KwikNotesLogo w={w} />
    Kwik Notes
  </a>
);

export default LogoLink;
