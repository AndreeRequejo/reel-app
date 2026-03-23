import { generalFont, titlesFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t p-6">
      <div className=" py-10 md:py-14">
        <div className="flex gap-10 justify-between">
          <section className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className={`${titlesFont.className} text-4xl leading-none text-foreground`}>
                Reel
              </span>
              <span className={`${generalFont.className} rounded-full border border-primary/50 bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary`}>
                Personal Project
              </span>
            </Link>

            <p className={`${generalFont.className} max-w-md text-sm leading-relaxed text-muted-foreground`}>
              Tu punto de entrada para descubrir peliculas, explorar estrenos y
              comprar boletos en segundos.
            </p>
          </section>

          <section>
            <h3 className={`${titlesFont.className} text-2xl text-foreground`}>
              Créditos
            </h3>
            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              className={`${generalFont.className} mt-4 inline-flex rounded-md border border-accent/60 bg-accent/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent transition hover:bg-accent/30`}
            >
              Powered by TMDB
            </Link>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-border/70 pt-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className={generalFont.className}>
            © {currentYear} - Reel. Hecho para amantes del cine.
          </p>
          <p className={generalFont.className}>
            Proyecto personal enfocado en descubrimiento y compra de boletos.
          </p>
        </div>
      </div>
    </footer>
  );
};
