import "server-only";

import { BackendRequestError, backendJson } from "./api";
import type { User } from "@/lib/types/user";

export async function getCurrentUser(): Promise<User | null> {
  try {
    return await backendJson<User>("/user");
  } catch (error) {
    if (error instanceof BackendRequestError) {
      return null;
    }

    throw error;
  }
}
