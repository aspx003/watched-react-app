import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SettingsIcon, SearchIcon, DatabaseIcon } from "lucide-react";
import { useNavigate } from "react-router";

const pages = [
  {
    name: "Search",
    icon: <SearchIcon />,
    path: "/search",
  },
  {
    name: "Collections",
    icon: <DatabaseIcon />,
    path: "/collections",
  },
  {
    name: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box
      my={5}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography variant="h3">Watched!</Typography>
      <Box>
        {pages.map((page) => {
          return (
            <Button
              onClick={() => navigate(page.path)}
              key={page.name}
              startIcon={page.icon}
            >
              {page.name}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
