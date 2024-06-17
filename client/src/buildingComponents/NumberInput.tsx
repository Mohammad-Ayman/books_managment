import React, { CSSProperties, InputHTMLAttributes } from "react";
import styles from "./styles/numberInput.module.css";
import globalStyles from "./global.module.css";
import { DynamicAttributes } from "@/types/dynamicAttributes";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  style?: CSSProperties;
  divStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  inputProps?: DynamicAttributes;
  readonly?: boolean;
}

const NumberInput: React.FC<Props> = ({
  className = "",
  children,
  label,
  divStyle,
  labelStyle,
  readOnly,
  ...inputProps
}) => {
  const containerClasses = `${styles["container"]} ${globalStyles["global-container"]} ${className}`;

  return (
    <div className={containerClasses} style={divStyle}>
      {label && (
        <label
          htmlFor={label}
          style={labelStyle}
          className={` ${
            inputProps.required === true ? globalStyles["required"] : ""
          }`}
        >
          {label}
        </label>
      )}
      <div style={{ display: "flex", flex: "2", marginBottom: "auto" }}>
        <input
          type="number"
          id={label}
          title={label}
          name={label}
          className={`${globalStyles["input-element"]} ${
            readOnly === true ? globalStyles["readOnly"] : ""
          }`}
          {...inputProps}
        />
        {inputProps.required && <h1>*</h1>}
      </div>
    </div>
  );
};

export default NumberInput;
