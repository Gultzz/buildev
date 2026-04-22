"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Smartphone, Monitor, ShieldCheck, Zap, Globe } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function Services() {
  const { t } = useLanguage();
  
  const icons = [Globe, Smartphone, Cloud, Monitor, ShieldCheck, Zap];
  const colors = ["text-primary", "text-accent", "text-primary", "text-accent", "text-primary", "text-accent"];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">{t.services.title}</h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((service, index) => {
            const Icon = icons[index];
            const color = colors[index];
            return (
              <Card key={index} className="glass border-none group hover:bg-white/[0.05] transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-white/[0.05] flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed pt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
