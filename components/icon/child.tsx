import { Children, cloneElement, isValidElement, type ReactNode } from "react";

interface ChildProps {
  [key: string]: unknown;
  children: ReactNode;
}

const Child = ({ children, ...props }: ChildProps) => {
  const child: ReactNode = Children.only(children);

  return isValidElement(child) ? cloneElement(child, props) : null;
};

export default Child;
