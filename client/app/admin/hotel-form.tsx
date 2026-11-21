"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, type FormEvent } from "react";
import { createHotel } from "./actions";

export default function HotelForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const createHotelMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await createHotel(formData);
      if (result.status === "error") {
        throw new Error(result.message);
      }

      return result;
    },
    onSuccess: async () => {
      formRef.current?.reset();
      await queryClient.invalidateQueries({ queryKey: ["admin", "hotels"] });
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (createHotelMutation.isPending) return;

    createHotelMutation.mutate(new FormData(event.currentTarget));
  }

  const feedback = createHotelMutation.isError
    ? { message: createHotelMutation.error.message, isError: true }
    : createHotelMutation.isSuccess
      ? { message: createHotelMutation.data.message, isError: false }
      : null;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      aria-busy={createHotelMutation.isPending}
      className="mt-6 grid gap-4 md:grid-cols-3"
    >
      <label className="text-sm font-medium text-gray-700">
        Name
        <input
          name="name"
          required
          maxLength={150}
          className="mt-2 w-full rounded-lg border px-3 py-2"
        />
      </label>

      <label className="text-sm font-medium text-gray-700">
        Address
        <input
          name="address"
          required
          maxLength={255}
          autoComplete="street-address"
          className="mt-2 w-full rounded-lg border px-3 py-2"
        />
      </label>

      <label className="text-sm font-medium text-gray-700">
        Email
        <input
          name="email"
          type="email"
          required
          maxLength={50}
          autoComplete="email"
          className="mt-2 w-full rounded-lg border px-3 py-2"
        />
      </label>

      <label className="text-sm font-medium text-gray-700">
        City
        <input
          name="city"
          required
          maxLength={100}
          autoComplete="address-level2"
          className="mt-2 w-full rounded-lg border px-3 py-2"
        />
      </label>

      <label className="text-sm font-medium text-gray-700">
        Country
        <input
          name="country"
          required
          maxLength={100}
          autoComplete="country-name"
          className="mt-2 w-full rounded-lg border px-3 py-2"
        />
      </label>

      <label className="text-sm font-medium text-gray-700">
        Contact number
        <input
          name="contactNumber"
          type="tel"
          required
          maxLength={20}
          autoComplete="tel"
          className="mt-2 w-full rounded-lg border px-3 py-2"
        />
      </label>

      
      <label className="text-sm font-medium text-gray-700">
        Owner Email
        <input
          name="ownerEmail"
          type="tel"
          required
          maxLength={40}
          autoComplete="owner-Email"
          className="mt-2 w-full rounded-lg border px-3 py-2"
        />
      </label>

      <div className="md:col-span-3">
        {feedback && (
          <p
            role={feedback.isError ? "alert" : "status"}
            className={
              feedback.isError
                ? "mb-4 text-sm text-red-700"
                : "mb-4 text-sm text-green-700"
            }
          >
            {feedback.message}
          </p>
        )}

        <button
          type="submit"
          disabled={createHotelMutation.isPending}
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {createHotelMutation.isPending ? "Adding hotel..." : "Add Hotel"}
        </button>
      </div>
    </form>
  );
}
