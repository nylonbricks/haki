import Icon, { type IconProps } from "../../icon";

export const NotebookIcon = (props: IconProps) => (
  <Icon {...props}>
    <svg
      aria-hidden="true"
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 6h4" />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <rect height="20" rx="2" width="16" x="4" y="2" />
      <path d="M16 2v20" />
    </svg>
  </Icon>
);

NotebookIcon.displayName = "NotebookIcon";
