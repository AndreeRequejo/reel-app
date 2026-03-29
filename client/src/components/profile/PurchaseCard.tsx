import Link from "next/link";
import Image from "next/image";
import { FaTicket } from "react-icons/fa6";
import { FaRegCalendar, FaRegClock, FaUser } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { Purchase } from "@/interfaces/purchase";

export const PurchaseCard = () => {
  const purchases: Purchase[] = [];
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FaTicket className="w-5 h-5 text-primary" />
        <h2 className="font-display text-2xl tracking-wider">Mis Entradas</h2>
        <span className="ml-auto text-sm text-muted-foreground">
          {purchases.length} compra(s)
        </span>
      </div>

      {purchases.length === 0 ? (
        <div className="bg-card rounded-xl p-12 border border-border text-center">
          <FaTicket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Aún no has comprado entradas</p>
          <Link
            href="/"
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 inline-flex"
          >
            Explorar películas
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {[...purchases].reverse().map((p) => (
            <PurchaseCardItem key={p.id} purchase={p} />
          ))}
        </div>
      )}
    </div>
  );
};

const PurchaseCardItem = ({ purchase }: { purchase: Purchase }) => {
  const poster = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="flex gap-4 bg-secondary rounded-lg p-4 border border-border">
      <div className="w-16 h-24 rounded overflow-hidden shrink-0 bg-muted">
        {poster ? (
          <Image
            src={poster}
            fill
            style={{
              objectFit: "cover",
            }}
            loading="eager"
            alt={purchase.movieName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            ?
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{purchase.movieName}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <FaRegCalendar className="w-3 h-3" />
            {purchase.date}
          </span>
          <span className="flex items-center gap-1">
            <FaRegClock className="w-3 h-3" />
            {purchase.time}
          </span>
          <span className="flex items-center gap-1">
            <FaUser className="w-3 h-3" />
            {purchase.people} persona(s)
          </span>
          <span className="flex items-center gap-1">
            <FiMapPin className="w-3 h-3" />
            Asientos: {purchase.seats.join(", ")}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-gold font-semibold text-sm">
            ${purchase.totalPrice.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(purchase.date).toLocaleDateString("es-ES")}
          </span>
        </div>
      </div>
    </div>
  );
};
