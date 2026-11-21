import "server-only";

import { cookies } from "next/headers";

export class BackendRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BackendRequestError";
  }
}

function getBackendBaseUrl(): URL {
  const configuredUrl = process.env.BACKEND_URL;

  if (!configuredUrl) {
    throw new Error("BACKEND_URL must be configured for server-side API requests.");
  }

  const normalizedUrl = configuredUrl.endsWith("/")
    ? configuredUrl
    : `${configuredUrl}/`;

  try {
    return new URL(normalizedUrl);
  } catch {
    throw new Error("BACKEND_URL must be a valid absolute URL.");
  }
}

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();

  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
}

export async function backendFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  if (!path.startsWith("/") || path.startsWith("//")) {
    throw new Error("Backend paths must be origin-relative.");
  }

  const url = new URL(path.slice(1), getBackendBaseUrl());
  const headers = new Headers(init.headers);
  const cookieHeader = await getCookieHeader();

  headers.set("Accept", "application/json");
  if (cookieHeader) {
    headers.set("Cookie", cookieHeader);
  }

  try {
    return await fetch(url, {
      ...init,
      headers,
      cache: "no-store",
      redirect: "manual",
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new BackendRequestError(
        "Could not connect to the backend. Please try again.",
      );
    }

    throw error;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasJsonContentType(response: Response): boolean {
  return response.headers.get("content-type")?.includes("json") ?? false;
}

async function getErrorMessage(response: Response): Promise<string> {
  const fallbackMessage = `Backend request failed (HTTP ${response.status}).`;

  if (!hasJsonContentType(response)) {
    return fallbackMessage;
  }

  const responseBody = await response.text();
  if (!responseBody) {
    return fallbackMessage;
  }

  let payload: unknown;
  try {
    payload = JSON.parse(responseBody);
  } catch {
    return fallbackMessage;
  }

  if (isRecord(payload)) {
    if (typeof payload.message === "string") {
      return payload.message;
    }
    if (typeof payload.error === "string") {
      return payload.error;
    }
  }

  return fallbackMessage;
}

export async function backendJson<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await backendFetch(path, init);

  if (response.status >= 300 && response.status < 400) {
    throw new BackendRequestError(
      "Your session may have expired. Sign in again and retry.",
    );
  }

  if (!response.ok) {
    throw new BackendRequestError(await getErrorMessage(response));
  }

  if (!hasJsonContentType(response)) {
    throw new BackendRequestError(
      "The backend returned a non-JSON response.",
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new BackendRequestError("The backend returned invalid JSON.");
  }
}
