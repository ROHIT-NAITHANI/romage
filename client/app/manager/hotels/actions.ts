"use server";

import type { Hotel } from "@/lib/types/hotel";
import type { User } from "@/lib/types/user";
import { revalidatePath } from "next/cache";
import { backendJson, BackendRequestError } from "@/lib/server/api";

type CsrfToken = {
  headerName: string;
  token: string;
};

type HotelActionResult = {
  status: "success" | "error";
  message: string;
};

type HotelQueryResult =
  | { status: "success"; hotels: Hotel[] }
  | { status: "error"; message: string };

export async function getHotel(): Promise<HotelQueryResult> {
  try {
    const user = await backendJson<User>("/user");
    const hotels = await backendJson<Hotel[]>(`/hotels/${user.uuid}`);
    return { status: "success", hotels };
  } catch (error) {
    if (error instanceof BackendRequestError) {
      return { status: "error", message: error.message };
    }

    throw error;
  }
}




