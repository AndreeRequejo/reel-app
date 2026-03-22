import { Footer } from "@/components";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen p-6">
      <div>{children}</div>
      <Footer />
    </main>
  );
}
