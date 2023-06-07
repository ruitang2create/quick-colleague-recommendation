import React, { useEffect } from "react";
import { CollapseProps } from "../types";
import IconButton from "../IconButton/IconButton";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Collapse({
  title,
  children,
  isOpen = false,
  className = "",
  style = {},
}: CollapseProps): JSX.Element {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setIsExpanded] = React.useState<boolean>(isOpen);
  const [expandLessIcon, expandMoreIcon] = [
    MdOutlineExpandLess,
    MdOutlineExpandMore,
  ];

  const handleToggle = () => {
    setIsExpanded(!expanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = expanded
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [expanded]);

  useEffect(() => {
    setIsExpanded(isOpen);
  }, [isOpen]);

  return (
    <div
      className={`border rounded-sm border-slate-500 text-slate-700 ${className}`}
      style={style}
    >
      <div
        className={`flex ${
          expanded ? "border-b border-b-slate-400" : ""
        } px-6 py-4`}
      >
        <div className="text-lg font-bold w-full">{title}</div>
        <IconButton
          icon={expanded ? expandLessIcon : expandMoreIcon}
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
