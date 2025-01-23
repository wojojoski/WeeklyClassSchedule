"use client";
import { useAuth } from "../lib/AuthContext";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

function Protected({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const returnUrl = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && isClient && !user) {
      router.push(`/public/user/signin?returnUrl=${returnUrl}`);
    }
  }, [user, loading, router, returnUrl, isClient]);

  if (loading || !isClient) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}

export default Protected;
