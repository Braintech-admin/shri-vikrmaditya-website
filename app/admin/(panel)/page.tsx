import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

export default async function AdminPage() {
  const user = await requireAdmin();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa] p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-[#123b7a]">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#071d49]">
            स्वागत है, {user.name}
          </h1>

          <p className="mt-3 text-gray-600">
            आपका admin authentication सफलतापूर्वक काम कर रहा है।
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Username</p>
              <p className="mt-1 font-semibold text-[#071d49]">
                {user.username}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Role</p>
              <p className="mt-1 font-semibold text-[#071d49]">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}