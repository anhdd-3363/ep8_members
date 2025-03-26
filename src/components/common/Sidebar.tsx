import * as React from "react";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import Link from "next/link";

const drawerWidth = 240;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar disableGutters sx={{ m: 1 }}>
        <Image src="/logo.svg" width={120} height={120} alt="logo" priority />
      </Toolbar>
      <Typography sx={{ color: "#707070", ml: 2, fontSize: "small" }}>
        ユーザー管理
      </Typography>
      <List>
        <ListItem key="ユーザー一覧" sx={{ py: 0 }}>
          <Link href="/" passHref legacyBehavior>
            <ListItemButton selected={pathname === "/"}>
              <ListItemText primary="ユーザー一覧" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="ポイント" sx={{ py: 0 }}>
          <Link href="/points" passHref legacyBehavior>
            <ListItemButton selected={pathname === "/points"}>
              <ListItemText primary="ポイント" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Typography sx={{ color: "#707070", ml: 2, fontSize: "small" }}>
        特定機能
      </Typography>
      <List>
        <ListItem key="情報技術" sx={{ py: 0 }}>
          <Link href="/tech-skills" passHref legacyBehavior>
            <ListItemButton selected={pathname === "/tech-skills"}>
              <ListItemText primary="情報技術" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Drawer>
  );
}
