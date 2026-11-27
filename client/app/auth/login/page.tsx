export default function LoginPage() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL must be configured.");
  }

  const loginUrl = new URL(
    "/oauth2/authorization/google",
    backendUrl,
  ).toString();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-center">
          Welcome to Romage
        </h1>

        <p className="mt-2 text-sm text-gray-500 text-center">
          Sign in to continue
        </p>

        <a
          href={loginUrl}
          className="mt-8 flex w-full items-center justify-center rounded-lg border px-4 py-3 text-sm font-medium hover:bg-gray-50 transition"
        >
          Continue with Google
        </a>
      </div>
    </main>
  );
}

