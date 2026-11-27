
import type { ReactNode } from "react";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server/auth";

async function AdminContent({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  // if (user.platformRole !== "ADMIN") {
  //   redirect("/unauthorized");
  // }

  return <>{children}</>;
}

function AdminFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-gray-500">
        Verifying your session...
      </p>
    </main>
  );
}

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<AdminFallback />}>
      <AdminContent>{children}</AdminContent>
    </Suspense>
  );
}
