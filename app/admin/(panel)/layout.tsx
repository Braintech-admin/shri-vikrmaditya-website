import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminShell from "@/components/admin/AdminShell";
import { getCurrentSession } from "@/lib/auth";

export default async function AdminLayout() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <AdminHeader
        user={session.user}
        expiresAt={session.expiresAt}
      />

      <AdminShell role={session.user.role} />
    </div>
  );
}