"use client";

import { type JSX, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Loader, SideNav } from "@/components";
import { isValidToken } from "@/utils";

const ProtectedLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>();

  useEffect(() => {
    if (isValidToken()) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      router.push("/login");
    }
  }, [router]);

  if (isAuth === null)
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader width={60} height={60} />
      </div>
    );

  if (!isAuth) return <></>;

  return (
    <div className="flex h-screen w-screen">
      <SideNav username="User Name" email="user@email.com" />
      <div className="flex-1 overflow-y-auto bg-gray-100">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
