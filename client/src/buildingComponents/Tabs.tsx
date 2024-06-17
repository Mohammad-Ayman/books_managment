import Link from "next/link";
import styles from "./styles/tabs.module.css";

interface tabsProps {
  tabs: string[];
  activeTab: string;
  onClick?: any;
}

const Tabs: React.FC<tabsProps> = ({ tabs, activeTab, onClick }) => {
  return (
    <nav className={styles["tabs-container"]}>
      {tabs?.map((tab: any) => (
        <button
          type="button"
          key={tab}
          className={`${styles["tab-container"]} ${
            activeTab === tab ? styles["active-tab"] : ""
          }`}
          onClick={onClick}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default Tabs;
