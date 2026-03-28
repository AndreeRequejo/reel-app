const getBackendUrl = (): string => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    throw new Error(
      "Define NEXT_PUBLIC_BACKEND_URL en tus variables de entorno",
    );
  }

  return backendUrl;
};

const formatApiError = (
  fallbackMessage: string,
  errorPayload: unknown,
): string => {
  if (!errorPayload || typeof errorPayload !== "object") {
    return fallbackMessage;
  }

  const payload = errorPayload as { message?: string | string[] };

  if (Array.isArray(payload.message)) {
    return payload.message.join(", ");
  }

  if (typeof payload.message === "string") {
    return payload.message;
  }

  return fallbackMessage;
};

export async function parseJsonError(
  response: Response,
  fallbackMessage: string,
): Promise<Error> {
  try {
    const errorPayload = await response.json();
    return new Error(formatApiError(fallbackMessage, errorPayload));
  } catch {
    return new Error(fallbackMessage);
  }
}

export { getBackendUrl };
