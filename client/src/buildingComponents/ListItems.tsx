import Image from "next/image";
import styles from "./styles/listItems.module.css";
import Link from "next/link";
import { useState } from "react";
import moment from "moment";

interface DataItem {
  [key: string]:
    | string
    | number
    | boolean
    | Date
    | JSX.Element
    | (() => void | ImageData);
}

interface ImageData {
  type: "image";
  src: string;
  alt: string;
}

interface DynamicListProps {
  data: DataItem[] | any;
  heading?: string;
  id: string | number;
  showCounter?: boolean;
  colStyles?: { [key: string]: React.CSSProperties };
  headerStyles?: { [key: string]: React.CSSProperties };
}
const handleRowDoubleClick = (item: DataItem) => {
  const previewAction = item?.PREVIEW_ME;
  if (typeof previewAction === "function") {
    previewAction();
  }
};
const renderValue = (
  key: string,
  value:
    | string
    | number
    | boolean
    | Date
    | JSX.Element
    | (() => void)
    | ImageData,
  onChange: (checked: boolean) => void
) => {
  if (typeof value === "boolean") {
    return (
      <input
        type="checkbox"
        checked={value}
        onChange={() => onChange(!value)}
      />
    );
  }

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  if (typeof value === "function") {
    if (key === "PREVIEW_ME") {
      return (
        <span role="button" onClick={value} className={styles["preview-icon"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className={styles["preview_icon"]}
          >
            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
            <path
              fillRule="evenodd"
              d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      );
    } else if (key === "DELETE_ME") {
      return (
        <span role="button" onClick={value} className={styles["preview-icon"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className={styles["delete_icon"]}
          >
            <path
              fillRule="evenodd"
              d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      );
    } else {
      return <button onClick={value}>{key}</button>;
    }
  }

  // Check if value is an ImageData object
  if (isImageData(value)) {
    const { src, alt } = value;
    return <Image fill src={src} alt={alt} className={styles["image"]} />;
  }

  if (typeof value === "string" && isLink(value)) {
    return (
      <Link href={value} rel="noopener noreferrer">
        {key}
      </Link>
    );
  }

  return value;
};

const isLink = (value: string): boolean => {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/")
  );
};

const isImageData = (value: any): value is ImageData => {
  return value && typeof value === "object" && "src" in value && "alt" in value;
};

const ListItems: React.FC<DynamicListProps> = ({
  heading = " ",
  data,
  id,
  showCounter = true,
  colStyles = {},
  headerStyles = {},
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleHeaderClick = (key: string) => {
    try {
      if (sortKey === key) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      } else {
        setSortKey(key);
        setSortOrder("asc");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const sortedData = sortKey
    ? data?.slice()?.sort((a: any, b: any) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        //skip if the value is a function
        if (typeof aValue === "function" || typeof bValue === "function") {
          return 0;
        }

        // Function to check if the value is a number
        const isNumeric = (value: any) => !isNaN(parseFloat(value));
        if (isNumeric(aValue) && isNumeric(bValue)) {
          return sortOrder === "asc"
            ? parseFloat(aValue) - parseFloat(bValue)
            : parseFloat(bValue) - parseFloat(aValue);
        }

        // Function to check if the value is a valid date using Moment.js
        const isDate = (value: any) => {
          const dateMoment = moment(value, "DD/MM/YYYY", true);
          return dateMoment.isValid();
        };

        // Function to check if the value is a number ending with '$'
        const isMoney = (value: any) => {
          return typeof value === "string" && value.trim().endsWith("$");
        };

        // Numeric sorting
        if (isMoney(aValue) && isMoney(bValue)) {
          // Remove '$' and parse as numbers
          const numA = parseFloat(
            aValue?.replace(/\s/g, "")?.replace(",", ".")?.slice(0, -1).trim()
          );
          const numB = parseFloat(
            bValue?.replace(/\s/g, "")?.replace(",", ".")?.slice(0, -1).trim()
          );
          return sortOrder === "asc" ? numA - numB : numB - numA;
        }

        // Date sorting
        if (isDate(aValue) && isDate(bValue)) {
          const dateA = moment(aValue, "DD/MM/YYYY").valueOf();
          const dateB = moment(bValue, "DD/MM/YYYY").valueOf();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        }

        // String sorting
        return sortOrder === "asc"
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      })
    : data;

  if (!data || !Array.isArray(data) || data.length === 0) {
    const headers = Object.keys((data && data[0]) || {});
    return (
      <div>
        <div className={styles["container"]}>
          <h1 className={styles["list-header"]}>{heading}</h1>
          <table className={styles["list-items__table"]}>
            <thead>
              <tr></tr>
            </thead>
            <tbody className={styles["list-items__body"]}>
              <tr></tr>
            </tbody>
          </table>
        </div>
        {showCounter && (
          <p className={styles["rows-count"]}>Number Of Entries 0</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className={styles["container"]}>
        <h1 className={styles["list-header"]}>{heading}</h1>
        <div className={styles["list-items__container"]}>
          <table className={styles["list-items__table"]}>
            <thead>
              <tr>
                {Object.keys(data[0])?.map((key, index) => (
                  <th
                    key={index}
                    style={headerStyles[key] || {}}
                    onClick={() => handleHeaderClick(key)} // Handle click event
                    className={key === sortKey ? styles["sorted"] : ""}
                  >
                    {key === "PREVIEW_ME"
                      ? "Preview"
                      : key === "DELETE_ME"
                      ? "Delete"
                      : key}{" "}
                    {key === sortKey && (
                      // Display sorting indicator based on current sort order
                      <span style={{ float: "right" }}>
                        {sortOrder === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles["list-items__body"]}>
              {sortedData.map((item: any, rowIndex: any) => (
                <tr
                  key={rowIndex}
                  data-id={item[`${id}`]}
                  onDoubleClick={() => handleRowDoubleClick(item)}
                >
                  {Object.keys(item)?.map((key, colIndex) => (
                    <td
                      key={colIndex}
                      title={item[key] === "function" ? "" : item[key]}
                      className={
                        typeof item[key] === "function" ||
                        typeof item[key] === "boolean"
                          ? styles["center-content"]
                          : ""
                      }
                      style={colStyles[key] || {}}
                    >
                      {renderValue(key, item[key], () => key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showCounter && (
        <p className={styles["rows-count"]}>Number Of Entries: {data.length}</p>
      )}
    </div>
  );
};

export default ListItems;
