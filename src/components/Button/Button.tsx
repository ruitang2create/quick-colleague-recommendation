import React from "react";
import { ButtonProps } from "../types";

export default function Button({
  className = "",
  style = {},
  children,
  appearance = "Primary",
  disabled = false,
  loading = false,
  onClick,
}: ButtonProps): JSX.Element {
  return (
    <div
      className={`button button${appearance} ${className}`}
      style={style}
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
      onClick={disabled ? undefined : onClick}
    >
      {loading ? "Loading..." : children}
    </div>
  );
}
