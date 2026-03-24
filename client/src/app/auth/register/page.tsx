"use client";
import { motion } from "motion/react";
import { GoArrowLeft } from "react-icons/go";
import { LuFilm } from "react-icons/lu";
import { CiMail, CiLock, CiUser } from "react-icons/ci";
import Link from "next/link";
import { Button } from "@/components";

export default function RegisterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
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
        <h1 className="font-display text-3xl mb-2">Crear cuenta</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Regístrate para empezar a comprar entradas
        </p>
        {/* Formulario de registro */}
        <form
          onSubmit={(e) => {
            console.log(e);
          }}
          className="space-y-4"
        >
          <div className="relative w-full">
            <CiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Nombre completo"
              onChange={(e) => console.log(e.target.value)}
              required
              className="w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-secondary"
            />
          </div>
          <div className="relative w-full">
            <CiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => console.log(e.target.value)}
              required
              className="w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-secondary"
            />
          </div>
          <div className="relative w-full">
            <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => console.log(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-secondary"
            />
          </div>
          <Button type="submit" className="w-full">
            Registrarse
          </Button>
        </form>

        {/* Enlace para registrarse */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link
            href={"/auth/login"}
            className="text-primary hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
