import type { AuthUser } from "@/interfaces/auth";
import { getBackendUrl, parseJsonError } from "@/utils/auth.utils";

export async function getMe(accessToken: string): Promise<AuthUser> {
  const backendUrl = getBackendUrl();

  const response = await fetch(`${backendUrl}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw await parseJsonError(response, "No fue posible obtener el usuario actual");
  }

  return response.json() as Promise<AuthUser>;
}
