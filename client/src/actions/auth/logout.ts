import type { LogoutResponse } from "@/interfaces/auth";
import { getBackendUrl, parseJsonError } from "@/utils/auth.utils";

export async function logout(accessToken: string): Promise<LogoutResponse> {
  const backendUrl = getBackendUrl();

  const response = await fetch(`${backendUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw await parseJsonError(response, "No fue posible cerrar sesión");
  }

  return response.json() as Promise<LogoutResponse>;
}
