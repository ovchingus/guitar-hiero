import classnames from "classnames";

export function Paper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={classnames("bg-white p-3 rounded-lg shadow-sm", className)}>{children}</div>;
}