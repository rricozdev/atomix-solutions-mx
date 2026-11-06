import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCategory } from "../../data/catalog";
import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import AddToQuoteButton from "./add-to-quote-button";

export default function ProductCard({ product }) {
  const category = getCategory(product.category);

  return (
    <Card
      className="product-card"
      role="article"
      aria-label={product.name}
    >
      <Link
        className="product-image"
        href={`/producto/${product.slug}`}
        aria-label={`Ver ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 30vw"
        />
        <Badge className="product-size" variant="outline">
          {product.size}
        </Badge>
      </Link>
      <div className="product-copy">
        <div>
          <p>{category?.short || "Atomix Solutions"}</p>
          <h3><Link href={`/producto/${product.slug}`}>{product.name}</Link></h3>
        </div>
        <div className="product-card-actions">
          <Link
            className="product-link"
            href={`/producto/${product.slug}`}
            aria-label={`Ver especificaciones de ${product.name}`}
          >
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          <AddToQuoteButton product={product} />
        </div>
      </div>
    </Card>
  );
}
