"use client";

import { useEffect, useState, type JSX } from "react";
import { useRouter } from "next/navigation";

import { Loader } from "@/components";
import { isValidToken } from "@/utils";

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (isValidToken()) {
      router.replace("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader width={60} height={60} />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthLayout;
