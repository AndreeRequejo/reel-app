'use client';
import { Footer, Navbar } from "@/components";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background p-6">
      <Navbar onMovieSelect={() => {}} />
      <div>{children}</div>
      <Footer />
    </main>
  );
}
