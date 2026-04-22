"use client"

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/language-context";

const projects = [
  {
    title: "Nexus Dashboard",
    category: "SaaS / Fintech",
    image: PlaceHolderImages.find(i => i.id === "project-1")?.imageUrl || "https://picsum.photos/seed/p1/800/600",
    tags: ["Next.js", "Tailwind", "D3.js"]
  },
  {
    title: "Velocity Mobile",
    category: "E-commerce",
    image: PlaceHolderImages.find(i => i.id === "project-2")?.imageUrl || "https://picsum.photos/seed/p2/800/600",
    tags: ["React Native", "Firebase", "Stripe"]
  },
  {
    title: "CloudGuard",
    category: "Infrastructure",
    image: PlaceHolderImages.find(i => i.id === "project-3")?.imageUrl || "https://picsum.photos/seed/p3/800/600",
    tags: ["AWS", "Terraform", "Go"]
  }
];

export function Portfolio() {
  const { t } = useLanguage();
  
  return (
    <section id="portfolio" className="py-24 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">{t.portfolio.title}</h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              {t.portfolio.subtitle}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="h-px w-20 bg-primary hidden md:block self-center mr-4" />
            <span className="font-headline font-medium tracking-tighter text-2xl">03 / 100+ {t.portfolio.projects}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 glass">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  data-ai-hint="software dashboard"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-white/10 backdrop-blur-md text-white border-none">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-headline text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground">{project.category}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                  <ArrowUpRight className="w-5 h-5 group-hover:text-primary-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
