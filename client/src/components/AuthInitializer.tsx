"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";

export function AuthInitializer() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;
    void initializeAuth();
  }, [initializeAuth]);

  return null;
}
