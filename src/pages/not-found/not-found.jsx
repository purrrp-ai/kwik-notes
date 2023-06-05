import { QuestionMarkSharp } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import styles from "./not-found.module.css";

const NotFound = () => {
  const { pathname } = useLocation();
  return (
    <section>
      <div className={styles.notFound}>
        <QuestionMarkSharp sx={{ fontSize: 48 }} color={"inherit"} />
        <p>
          Location: <i>{pathname}</i> not found. <a href={"/"}>Go back home?</a>
        </p>
      </div>
    </section>
  );
};

export default NotFound;
