import { GoArrowLeft } from "react-icons/go";
import { LuFilm } from "react-icons/lu";
import Link from "next/link";
import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md animate-fade-up">
      {/* Sección de retorno a Home */}
      <Link
        href="/"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <GoArrowLeft className="w-4 h-4" />
        Volver
      </Link>

      {/* Logo y título */}
      <div className="flex items-center gap-3 mb-8">
        <LuFilm className="w-8 h-8 text-primary" />
        <span className="font-display text-3xl tracking-widest">REEL</span>
      </div>

      <div className="bg-card rounded-xl p-8 border w-full">
        {/* Título y descripción */}
        <h1 className="font-display text-3xl mb-2">Iniciar Sesión</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Accede a tu cuenta para comprar entradas
        </p>
        <LoginForm />

        {/* Enlace para registrarse */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            href={"/auth/register"}
            className="text-primary hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
