import styles from "./styles/homeElements.module.css";
import CourseElement from "./HomeElement";

const DisplayHomeElements = (props) => {
  return (
    <ul className={`${styles["cards-container"]} mflex`}>
      {props.AllCourses.map((course) => (
        <CourseElement
          key={"course.id"}
          id={"course.id"}
          _id={course._id}
          name={course.name}
          image={course.image}
        />
      ))}
    </ul>
  );
};

export default DisplayHomeElements;
