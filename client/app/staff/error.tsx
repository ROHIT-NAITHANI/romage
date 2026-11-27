"use client";

export default function StaffError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-xl rounded-xl border bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Could not load the staff page
        </h2>
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error.message}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
