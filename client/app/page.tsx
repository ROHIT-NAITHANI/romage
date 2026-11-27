import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          Romage
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Manage your hotel properties in one place.
        </h1>
        <p className="mt-5 text-lg text-gray-600">
          Sign in to manage your Romage account and hotels.
        </p>
        <Link
          href="/auth/login"
          className="mt-8 inline-flex rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
