import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { AIClarifier } from "@/components/ai-clarifier";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <AIClarifier />
      <ContactForm />
      <Footer />
      <Toaster />
    </main>
  );
}