"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { register } from "@/actions";
import { Button } from "@/components";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({ name, email, password });
      router.push("/auth/login");
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "No fue posible registrar la cuenta";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative w-full">
        <CiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          placeholder="Nombre completo"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          maxLength={50}
          className="w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-secondary"
        />
      </div>
      <div className="relative w-full">
        <CiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-secondary"
        />
      </div>
      <div className="relative w-full">
        <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={8}
          maxLength={16}
          className="w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-secondary"
        />
      </div>
      <div className="relative w-full">
        <CiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          minLength={8}
          maxLength={16}
          className="w-full rounded-md border border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-secondary"
        />
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrarse"}
      </Button>
    </form>
  );
}
