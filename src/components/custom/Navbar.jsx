import { SettingsIcon } from "lucide-react";
import { Button } from "../ui/button";
import { TabNav, TabNavItem } from "./TabNav";
import { useLocation } from "react-router";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tighter">
        Watched <sup className="text-xs font-normal">v1</sup>
      </h1>

      <div>
        <TabNav>
          <TabNavItem label="Home" href="/" selected={pathname === "/"} />
          <TabNavItem
            label="Search"
            href="/search"
            selected={pathname === "/search"}
          />
          <TabNavItem
            label="Collections"
            href="/collections"
            selected={pathname === "/collections"}
          />
        </TabNav>
      </div>

      <Button variant="outline" size="icon">
        <SettingsIcon />
      </Button>
    </nav>
  );
}
