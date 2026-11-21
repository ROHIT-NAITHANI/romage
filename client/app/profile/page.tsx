
import { Suspense } from "react";
import { backendJson } from "@/lib/server/api";
import { User } from "@/lib/types/user";
import HotelList from "./hotel-list";


async function UserProfile() {
  const user = await backendJson<User>("/user");

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>{user.email}</p>
      <p>{user.platformRole}</p>
      <p>{user.uuid}</p>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <main>
      <h1>Profile</h1>

      <Suspense fallback={<p>Loading profile...</p>}>
        <UserProfile />
        <HotelList/>
      </Suspense>
    </main>
  );
}
