import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { CornerDownRightIcon } from "../icon";

interface ReplyLineProps extends ComponentProps<"span"> {}

export const ReplyLine = ({
  className,
  children,
  ...props
}: ReplyLineProps) => (
  <span
    className={twMerge(
      "mt-2 flex gap-0.5 align-top text-sm text-text-secondary",
      className
    )}
    {...props}
  >
    <span className="center p-0.5">
      <CornerDownRightIcon size={14} />
    </span>
    <span className="flex-1 text-left">{children}</span>
  </span>
);
