"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";

export function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[128px] -z-10" />
      
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-medium mb-8 animate-fade-in">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground uppercase tracking-widest">{t.hero.badge}</span>
        </div>
        
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 max-w-5xl mx-auto leading-[1.1] animate-fade-in [animation-delay:200ms]">
          {t.hero.title1} <span className="text-gradient">{t.hero.title2}</span> {t.hero.title3}
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in [animation-delay:400ms]">
          {t.hero.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:600ms]">
          <Link href="#contact" className="w-full sm:w-auto">
            <Button size="lg" className="h-14 px-8 text-base font-semibold glow-primary w-full">
              {t.hero.ctaQuote} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#ai-clarifier" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold glass hover:bg-white/[0.1] w-full">
              {t.hero.ctaAI} <Sparkles className="ml-2 h-5 w-5 text-accent" />
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700 animate-fade-in [animation-delay:800ms]">
          {['Web3', 'SaaS', 'FinTech', 'AI'].map((sector) => (
            <div key={sector} className="flex items-center justify-center">
              <span className="font-headline text-2xl font-bold tracking-tighter">{sector}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
