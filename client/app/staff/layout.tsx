import type { ReactNode } from "react";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server/auth";

async function StaffContent({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}

function StaffFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-gray-500" role="status">
        Verifying your session...
      </p>
    </main>
  );
}

export default function StaffLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<StaffFallback />}>
      <StaffContent>{children}</StaffContent>
    </Suspense>
  );
}
