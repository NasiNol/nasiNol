"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name?: string;
}

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Dummy fetch (buat API endpoint di langkah 5)
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold text-center mb-4 text-black">Dashboard</h2>
        <ul className="divide-y">
          {users.map((user) => (
            <li key={user.id} className="py-2 text-gray-700">
              {user.email}
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-900"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
