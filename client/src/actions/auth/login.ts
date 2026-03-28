import type { AuthTokenResponse, LoginPayload } from "@/interfaces/auth";
import { getBackendUrl, parseJsonError } from "@/utils/auth.utils";

export async function login(payload: LoginPayload): Promise<AuthTokenResponse> {
  const backendUrl = getBackendUrl();

  const response = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseJsonError(response, "No fue posible iniciar sesión");
  }

  return response.json() as Promise<AuthTokenResponse>;
}
