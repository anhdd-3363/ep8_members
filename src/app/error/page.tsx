"use client";
import React from "react";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const styles = {
  container: "flex flex-col items-center justify-center h-screen space-y-12",
  button: "w-80",
};

const ErrorPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Image src="/logo.svg" width={300} height={100} alt="logo" priority />
      <Typography variant="h5" align="center">
        サインインする権限がありません
      </Typography>
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={() => router.push("/login")}
      >
        再度サインイン
      </Button>
    </div>
  );
};

export default ErrorPage;
