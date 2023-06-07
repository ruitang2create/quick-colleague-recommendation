import React, { useEffect } from "react";
import { CollapseProps } from "../types";
import IconButton from "../IconButton/IconButton";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Collapse({
  title,
  children,
  isOpenByDefault = false,
  className = "",
  style = {},
}: CollapseProps): JSX.Element {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(isOpenByDefault);
  const [expandLessIcon, expandMoreIcon] = [
    MdOutlineExpandLess,
    MdOutlineExpandMore,
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  return (
    <div className={`border ${className}`} style={style}>
      <div className="flex border-b px-6 py-4">
        <div className="text-lg font-bold w-full">{title}</div>
        <IconButton
          icon={isOpen ? expandLessIcon : expandMoreIcon}
          alt="Expand"
          onClick={handleToggle}
        />
      </div>
      <div
        ref={contentRef}
        className="transition-all duration-300 overflow-hidden"
      >
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
