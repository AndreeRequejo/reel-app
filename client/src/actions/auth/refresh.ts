import type { AuthTokenResponse } from "@/interfaces/auth";
import { getBackendUrl, parseJsonError } from "@/utils/auth.utils";

export async function refresh(): Promise<AuthTokenResponse> {
  const backendUrl = getBackendUrl();

  const response = await fetch(`${backendUrl}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw await parseJsonError(response, "No fue posible renovar la sesión");
  }

  return response.json() as Promise<AuthTokenResponse>;
}
