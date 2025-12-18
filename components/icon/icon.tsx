import { cloneElement, type SVGAttributes } from "react";

import Child from "./child";

const DEFAULT_ICON_SIZE: number = 16;

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: number;
  width?: number | string;
  height?: number | string;
}

const Icon = ({
  children,
  width,
  height,
  size = DEFAULT_ICON_SIZE,
  ...props
}: IconProps) =>
  cloneElement(<Child>{children}</Child>, {
    width: width ?? size,
    height: height ?? size,
    ...props,
  });

export default Icon;
