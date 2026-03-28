"use client";
import Link from "next/link";
import { titlesFont } from "@/config/fonts";
import { SearchBar } from "./SearchBar";
import { Button } from "./ui/Button";
import { LuFilm } from "react-icons/lu";
import { FiShield, FiUser, FiLogIn } from "react-icons/fi";
import { useAuthStore } from "@/store/auth-store";

interface NavbarProps {
  onMovieSelect: (movideId: number) => void;
}

export const Navbar = ({ onMovieSelect }: NavbarProps) => {
  const user = useAuthStore((state) => state.user);

  const normalizedRole =
    typeof user?.role === "string" ? user.role.trim().toLowerCase() : "";
  const isAdmin = normalizedRole === "administrador";

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-linear-to-b from-background via-background/80 to-transparent">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <LuFilm className="w-7 h-7 text-primary" />
          <span className={`${titlesFont.className} text-2xl tracking-widest`}>
            REEL
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <SearchBar onMovieSelect={onMovieSelect} />
          {isAdmin ? (
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-primary">
                <FiShield className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </Link>
          ) : null}

          {user ? (
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <FiUser className="w-4 h-4" />
                <span className="hidden sm:inline">{user.name ?? user.email}</span>
              </Button>
            </Link>
          ) : null}

          {!user ? (
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <FiLogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Entrar</span>
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
