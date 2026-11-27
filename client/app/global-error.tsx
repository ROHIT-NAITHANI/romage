"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <main className="flex min-h-screen items-center justify-center p-8">
          <div className="w-full max-w-xl rounded-xl border bg-white p-6">
            <h1 className="text-xl font-semibold text-gray-900">
              Something went wrong
            </h1>
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
      </body>
    </html>
  );
}
