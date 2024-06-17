"use client";
import { FormEvent, ReactNode, useState } from "react";
import Card from "../../buildingComponents/Card";
import Tabs from "../../buildingComponents/Tabs";
import styles from "../../components/form/formContainer.module.css";

export interface Props {
  heading: string;
  tabs: { label: string; content: ReactNode }[];
  submitAction: (data: any) => any;
  renderAll: boolean;
  children?: ReactNode;
}

const FormContainer: React.FC<Props> = ({
  heading,
  tabs,
  submitAction,
  children,
}) => {
  const tabsCaptions = tabs.map(
    (tab: { label: string; content: ReactNode }) => tab.label
  );
  const [activeTab, setActiveTab] = useState(tabsCaptions[0]);

  const tabHandler = (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    setActiveTab(target.textContent || "");
  };

  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    submitAction(data);
  };

  return (
    <form onSubmit={formHandler} className={styles["form"]}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className={styles["header"]}>{heading}</h2>
        {children}
      </div>
      <Tabs tabs={tabsCaptions} activeTab={activeTab} onClick={tabHandler} />
      <Card>
        {tabs.map((tab: { label: string; content: ReactNode }) => (
          <section
            key={tab.label}
            className={
              activeTab === tab.label
                ? styles["content-container"]
                : styles["inactiveTab"]
            }
          >
            {tab.content}
          </section>
        ))}
      </Card>
      <div className={styles["button-container"]}>
        <button type="submit" className={styles["save-btn"]}>
          Save
        </button>
      </div>
    </form>
  );
};

export default FormContainer;
