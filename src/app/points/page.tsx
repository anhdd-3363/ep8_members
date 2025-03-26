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
import IconButton from "@mui/material/IconButton";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { jaJP } from "@mui/x-data-grid/locales";
import VisibilityIcon from "@mui/icons-material/Visibility";

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "id",
    headerName: "No",
    headerAlign: "center",
    align: "center",
    width: 50,
  },
  {
    field: "name",
    headerName: "名前",
    flex: 1,
  },
  {
    field: "position",
    headerName: "ポジション",
    flex: 1,
  },
  {
    field: "plusPoint",
    headerName: "プラスポイント",
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <p className="text-green-600 font-bold">{params.value}</p>
    ),
    flex: 1,
  },
  {
    field: "minusPoint",
    headerName: "マイナスポイント",
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <p className="text-red-500 font-bold">{params.value}</p>
    ),
    flex: 1,
  },
  {
    field: "action",
    headerName: "アクション",
    headerAlign: "center",
    renderCell: () => (
      <IconButton>
        <VisibilityIcon />
      </IconButton>
    ),
    align: "center",
    flex: 0.5,
  },
];

const fakeData = {
  id: 1,
  name: "Tran Ba Trong",
  position: "BrSE / Backend Engineer",
  plusPoint: "+50",
  minusPoint: "-100",
};

const rows = Array.from({ length: 10 }, (_, index) => ({
  ...fakeData,
  id: index + 1,
}));

const drawerWidth = 240;

export default function Points() {
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
              <Typography color="text.primary">ポイント</Typography>
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
              <Button color="primary" size="small" onClick={() => signOut()}>
                ログアウト
              </Button>
            </Box>
          </Box>
        </Box>
        <Box className="mt-5">
          <Typography variant="h5" color="#6E4AF2" sx={{ fontWeight: "600" }}>
            ポイント
          </Typography>
        </Box>
        <Box sx={{ height: 550, marginTop: 2 }}>
          <DataGrid
            localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
