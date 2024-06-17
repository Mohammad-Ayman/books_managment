"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../UI/nav-link/navLink.module.css";

interface Props {
  href: string;
  children: ReactNode;
}

const NavLink: React.FC<Props> = ({ href, children }) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={
        // path === href
        path.startsWith(href)
          ? `${styles["active-tab"]} ${styles["item-container"]}`
          : styles["item-container"]
      }
    >
      {children}
    </Link>
  );
};

export default NavLink;
