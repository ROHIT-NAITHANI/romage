
import HotelForm from "./hotel-form";


export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Romage Admin
            </h1>
            <p className="mt-2 text-gray-500">
              Manage hotels onboarded to Romage.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-xl border bg-white p-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Add Hotel
          </h2>

          <HotelForm />
        </div>
      
      </div>
    </main>
  );
}
