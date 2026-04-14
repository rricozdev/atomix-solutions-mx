import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Solutions from "@/components/sections/Solutions";
import ProductsFeatured from "@/components/sections/ProductsFeatured";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Trust />
      <Solutions />
      <ProductsFeatured />
      <Footer />
    </main>
  );
}
