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

function getFormString(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

// export async function getHotel(): Promise<HotelQueryResult> {
//   try {
//     const user = await backendJson<User>("/user");
//     const hotels = await backendJson<Hotel[]>(`/admin/hotels/${user.uuid}`);
//     return { status: "success", hotels };
//   } catch (error) {
//     if (error instanceof BackendRequestError) {
//       return { status: "error", message: error.message };
//     }

//     throw error;
//   }
// }




export async function createHotel(
  formData: FormData,
): Promise<HotelActionResult> {
  const hotelInput = {
    name: getFormString(formData, "name"),
    address: getFormString(formData, "address"),
    email: getFormString(formData, "email"),
    city: getFormString(formData, "city"),
    country: getFormString(formData, "country"),
    contactNumber: getFormString(formData, "contactNumber"),
    ownerEmail: getFormString(formData,"ownerEmail")
  };

  if (Object.values(hotelInput).some((value) => !value)) {
    return {
      status: "error",
      message: "Please complete all hotel fields.",
    };
  }

  try {
    const csrfToken = await backendJson<CsrfToken>("/csrf");
    const hotel = await backendJson<Hotel>("/admin/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [csrfToken.headerName]: csrfToken.token,
      },
      body: JSON.stringify(hotelInput),
    });

    revalidatePath("/admin");
    return {
      status: "success",
      message: `${hotel.name} was added successfully.`,
    };
  } catch (error) {
    if (error instanceof BackendRequestError) {
      return { status: "error", message: error.message };
    }

    throw error;
  }
}