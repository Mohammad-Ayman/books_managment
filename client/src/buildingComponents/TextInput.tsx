import React, { CSSProperties, InputHTMLAttributes } from "react";
import styles from "./styles/textInput.module.css";
import globalStyles from "./global.module.css";
import { DynamicAttributes } from "@/types/dynamicAttributes";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  style?: CSSProperties;
  divStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  inputProps?: DynamicAttributes;
  required?: boolean;
  readonly?: boolean;
}

const TextInput: React.FC<Props> = ({
  className = "",
  label,
  divStyle,
  labelStyle,
  required = false,
  readOnly = false,
  ...inputProps
}) => {
  const containerClasses = `${styles["container"]} ${globalStyles["global-container"]} ${className}`;

  return (
    <div className={containerClasses} style={divStyle}>
      {label && (
        <label
          htmlFor={label}
          style={labelStyle}
          className={` ${required === true ? globalStyles["required"] : ""}`}
        >
          {label}
        </label>
      )}
      <div style={{ display: "flex", flex: "2", marginBottom: "auto" }}>
        <input
          type="text"
          id={label}
          title={label}
          name={label}
          required={required}
          className={`${globalStyles["input-element"]} ${
            readOnly === true ? globalStyles["readOnly"] : ""
          }`}
          {...inputProps}
        />
        {required && <h1>*</h1>}
      </div>
    </div>
  );
};

export default TextInput;
