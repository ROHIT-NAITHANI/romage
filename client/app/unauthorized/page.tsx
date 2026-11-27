export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-900">
          Unauthorized
        </h1>
        <p className="mt-2 text-gray-500">
          You do not have permission to view this page.
        </p>
      </div>
    </main>
  );
}
