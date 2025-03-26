"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import Image from "next/image";
import Loading from "@/app/loading";
import Sidebar from "@/components/common/Sidebar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const drawerWidth = 240;

export default function TechSkills() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Loading />;

  if (!session) router.push("/login");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Sidebar />
      </AppBar>
      <Box className="m-5 ml-[260px] w-full">
        <Box className="flex justify-between">
          <Box>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Image
                src="/mini_logo.svg"
                width={40}
                height={40}
                alt="logo"
                priority
              />
              <Typography color="text.primary">情報技術</Typography>
            </Breadcrumbs>
          </Box>
          <Box className="flex items-center">
            <Box className="w-[45px]">
              <Image
                src={session?.user?.image || ""}
                alt="user_avatar"
                width={96}
                height={96}
                className="rounded-full"
              />
            </Box>
            <Box className="ml-2">
              <p className="ml-1">{session?.user?.name}</p>
              <Button color="primary" onClick={() => signOut()} size="small">
                ログアウト
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="mt-5">
          <Typography variant="h5" color="#6E4AF2" sx={{ fontWeight: "600" }}>
            情報技術
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
