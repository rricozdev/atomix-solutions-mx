import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Solutions from "@/components/sections/Solutions";
import ProductsFeatured from "@/components/sections/ProductsFeatured";
import Process from "@/components/sections/Process";
import ContactCTA from "@/components/sections/ContactCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Trust />
      <Solutions />
      <ProductsFeatured />
      <Process />
      <ContactCTA />
      <Footer />
    </main>
  );
}
