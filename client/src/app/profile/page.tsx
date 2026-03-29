import Link from "next/link";
import { ProfileCard, PurchaseCard } from "@/components";
import { RequireAuth } from "@/providers/RequireAuth";
import { GoArrowLeft } from "react-icons/go";

export default function ProfilePage() {
  return (
    <RequireAuth>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Sección de retorno a Home */}
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <GoArrowLeft className="w-4 h-4" />
          Volver
        </Link>

        {/* Profile Card */}
        <ProfileCard />

        {/* Purchases */}
        <PurchaseCard />
      </div>
    </RequireAuth>
  );
}
