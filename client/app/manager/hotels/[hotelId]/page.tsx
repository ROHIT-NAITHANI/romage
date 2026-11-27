import { Suspense } from "react";

type Props = {
  params: Promise<{ hotelId: string }>;
};

async function HotelDetails({ params }: Props) {
  const { hotelId } = await params;

  return <p className="mt-2 text-gray-600">Hotel ID: {hotelId}</p>;
}

export default function HotelPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold text-gray-900">Hotel</h1>
      <Suspense fallback={<p>Loading hotel...</p>}>
        <HotelDetails params={params} />
      </Suspense>
    </main>
  );
}
