"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { isValidToken } from "@/utils";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (isValidToken()) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);
};

export default HomePage;
