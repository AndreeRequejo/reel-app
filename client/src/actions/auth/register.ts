import type { AuthUser, RegisterPayload } from "@/interfaces/auth";
import { getBackendUrl, parseJsonError } from "@/utils/auth.utils";

export async function register(payload: RegisterPayload): Promise<AuthUser> {
  const backendUrl = getBackendUrl();

  const response = await fetch(`${backendUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseJsonError(response, "No fue posible registrar la cuenta");
  }

  return response.json() as Promise<AuthUser>;
}
