"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import Loader from "@/components/shared/loader/loader";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return children;
  } else {
    router.push("/api/auth/login");
    return <Loader />;
  }
}
