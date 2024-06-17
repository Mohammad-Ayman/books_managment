import React, { CSSProperties, ReactNode } from "react";
import styles from "./styles/card.module.css";
import { DynamicAttributes } from "@/types/dynamicAttributes";

interface Props {
  className?: string;
  style?: CSSProperties;
  inputProps?: DynamicAttributes;
  onClick?: () => any;
  children: ReactNode;
}

const Card: React.FC<Props> = ({ className = "", children, ...inputProps }) => {
  const classes = `${styles["card"]} ${className}`;
  return (
    <div className={classes} {...inputProps}>
      {children}
    </div>
  );
};

export default Card;
