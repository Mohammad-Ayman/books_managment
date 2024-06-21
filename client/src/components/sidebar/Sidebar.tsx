"use client";
import { usePathname } from "next/navigation";
import NavLink from "../../ui/nav-link/NavLink";
import styles from "./styles/sidebar.module.css";
import { useState } from "react";

const pages: string[] = ["Books"];

const Sidebar: React.FC = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const pathname = usePathname();
  if (pathname === "/" || pathname === "") {
    return null;
  }

  const containerStyles = {
    display: sidebarVisible ? "flex" : "none",
    transition: "opacity 0.3s ease-in-out",
  };

  return (
    <div className={styles["parent-container"]}>
      <svg
        onClick={() => setSidebarVisible(!sidebarVisible)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className={styles["icon"]}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </svg>
      <nav className={styles["items-container"]} style={containerStyles}>
        {pages.map((page: any) => {
          return (
            <NavLink key={page} href={`/${page.toLocaleLowerCase()}`}>
              {page}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
