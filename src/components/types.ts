import { ICON_SIZE } from "@/constants";
import { StaticImageData } from "next/image";
import { IconType as ReactIconsIconType } from "react-icons";

export type CommonComponentProps = {
  className?: string;
  style?: React.CSSProperties;
};

export type IconType = string | ReactIconsIconType | StaticImageData;

export interface IconButtonProps extends CommonComponentProps {
  icon: IconType;
  alt?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: string;
}