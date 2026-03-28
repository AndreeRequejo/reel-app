"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  const hasStartedCheck = useRef(false);

  useEffect(() => {
    if (hasStartedCheck.current) {
      return;
    }

    hasStartedCheck.current = true;
    void initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!hasStartedCheck.current || isLoading) {
      return;
    }

    if (!user) {
      const next = encodeURIComponent(pathname || "/");
      router.replace(`/auth/login?next=${next}`);
    }
  }, [isLoading, pathname, router, user]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
        Verificando sesión...
      </div>
    );
  }

  return <>{children}</>;
}
