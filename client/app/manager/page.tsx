import { backendJson } from "@/lib/server/api";
import { User } from "@/lib/types/user";




async function UserProfile() {
  const user = await backendJson<User>("/user");

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Welcome, {user.name}</h1>
      <p className="text-2xl font-semibold text-gray-900">{user.email}</p>
      <p className="text-2xl font-semibold text-gray-900">{user.platformRole}</p>
      <p className="text-2xl font-semibold text-gray-900">{user.uuid}</p>
    </div>
  );
}



export default function  ManagerPage() {
  return (  
    <main className="min-h-screen bg-gray-50 p-8">
      <UserProfile/>
      <h1 className="text-3xl font-semibold text-gray-900">
         Manager Dashboard
      </h1>
    </main>
  );
}
