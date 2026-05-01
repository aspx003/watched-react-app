import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

export function TabNav({ children }) {
  return <div className="flex flex-row gap-3 items-center">{children}</div>;
}

export function TabNavItem({ label, selected, href }) {
  return (
    <NavLink to={href}>
      <div
        className={cn("cursor-pointer", selected && "border-b-2 border-black")}
      >
        {label}
      </div>
    </NavLink>
  );
}
