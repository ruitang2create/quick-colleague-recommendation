import React from "react";
import { IconButtonProps } from "../types";
import { ICON_SIZE } from "@/constants";
import { IconType } from "react-icons";
import { render } from "react-dom";
import Image from "next/image";

export default function IconButton({
  icon,
  className = "",
  style = {},
  onClick,
  alt = "Icon Button",
  disabled = false,
  size = ICON_SIZE.MD,
}: IconButtonProps): JSX.Element {
  const isReactIcons = typeof icon === "function";

  const renderIcon = (): JSX.Element => {
    if (isReactIcons) {
      const Icon = icon as IconType;
      return <Icon size={size} />;
    }
    return <Image src={icon} alt={alt} fill />;
  };
  return (
    <div
      className={`${className}`}
      style={{
        position: "relative",
        width: size,
        height: size,
        ...style,
      }}
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
      onClick={disabled ? undefined : onClick}
    >
      {renderIcon()}
    </div>
  );
}
