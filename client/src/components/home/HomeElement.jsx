import styles from "./styles/homeElement.module.css";
import Link from "next/link";

const HomeElement = (props) => {
  return (
    <Link
      href={`/${props._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <li
        key={props.id}
        className={`${styles["course-card"]} mflex`}
        data-courseid={props.id}
      >
        <div className={`${styles["course-image__container"]}`}>
          {props.image}
        </div>
        <h3 className={styles["course-name"]}>{props.name}</h3>
        <div className={`${styles["course-info"]} mflex`}></div>
      </li>
    </Link>
  );
};

export default HomeElement;
