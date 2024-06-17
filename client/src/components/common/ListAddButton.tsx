import ListItems from "../../buildingComponents/ListItems";
import styles from "../../components/common/styles/listAddButton.module.css";
import { CSSProperties, useId } from "react";

interface Props {
  actionCaption: string;
  listHeading: string;
  onClick?: (e?: any) => any;
  entries: any;
  btnStyles?: CSSProperties;
  listItemsId?: string;
  showCounter?: boolean;
  colStyles?: { [key: string]: React.CSSProperties };
  headerStyles?: { [key: string]: React.CSSProperties };
}

const ListAddButton: React.FC<Props> = ({
  actionCaption,
  listHeading,
  onClick,
  entries,
  btnStyles,
  listItemsId = "",
  showCounter = true,
  colStyles,
  headerStyles,
}) => {
  return (
    <article className={styles["pay-container"]}>
      <button onClick={onClick} style={btnStyles} type="button">
        {actionCaption}
      </button>
      <ListItems
        heading={listHeading}
        data={entries}
        id={listItemsId}
        colStyles={colStyles}
        showCounter={showCounter}
        headerStyles={headerStyles}
      />
    </article>
  );
};

export default ListAddButton;
