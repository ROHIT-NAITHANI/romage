
"use client";

import { useQuery } from "@tanstack/react-query";
import type { Hotel } from "@/lib/types/hotel";
import { getHotel } from "./actions";

export default function HotelList() {
  const hotelsQuery = useQuery<Hotel[]>({
    queryKey: ["admin", "hotels"],
    queryFn: async () => {
      const result = await getHotel();
      if (result.status === "error") {
        throw new Error(result.message);
      }

      return result.hotels;
    },
    retry: false,
  });

  if (hotelsQuery.isPending) {
    return <p className="mt-10 text-sm text-gray-500">Loading hotels...</p>;
  }

  if (hotelsQuery.isError && !hotelsQuery.data) {
    return (
      <p className="mt-10 text-sm text-red-700" role="alert">
        {hotelsQuery.error.message}
      </p>
    );
  }

  const hotels = hotelsQuery.data ?? [];

  return (
    <section
      aria-labelledby="hotel-list-heading"
      className="mt-10 rounded-xl border bg-white p-8"
    >
      <h2
        id="hotel-list-heading"
        className="text-lg font-semibold text-gray-900"
      >
        Your Hotels
      </h2>

      {hotelsQuery.isError && (
        <p className="mt-4 text-sm text-red-700" role="alert">
          Could not refresh the hotel list: {hotelsQuery.error.message}
        </p>
      )}

      {hotels.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">
          You haven&apos;t added any hotels yet.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-gray-200">
          {hotels.map((hotel) => (
            <li key={hotel.id} className="py-4 first:pt-0 last:pb-0">
              <h3 className="font-medium text-gray-900">{hotel.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{hotel.address}</p>
              <p className="mt-1 text-sm text-gray-600">{hotel.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
