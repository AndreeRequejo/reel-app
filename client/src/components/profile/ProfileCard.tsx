'use client';
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export const ProfileCard = () => {
  const router = useRouter();
  return (
    <div className="bg-card rounded-xl p-6 border border-border mb-8">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <FaUser className="w-8 h-8 text-primary" />
        </div>
        <div className="flex-1">
          <h1 className="font-display text-3xl">Andree Requejo</h1>
          <p className="text-muted-foreground text-sm">
            andree.requejo@example.com
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            //logout();
            router.push("/");
          }}
        >
          <FiLogOut className="w-4 h-4 mr-2" />
          Salir
        </Button>
      </div>
    </div>
  );
};
