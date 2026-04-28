"use client"

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/context/language-context";

const projects = [
  {
    title: "Além da Adoção",
    category: "Landing Page",
    image: '/alemdaadocao.png',
    url: "https://alemdaadocao.com.br",
    tags: ["Next.js", "Tailwind"]
  },
  {
    title: "Liinks",
    category: "SaaS",
    url: "https://www.liinks.co/",
    image: "/liinks.png",
    tags: ["React", "Typescript"]
  },
  {
    title: "LaunchClub",
    category: "Marketing",
    url: "https://launchclub.ai/",
    image: "/launchclub.png",
    tags: ["Node.js", "Cloudflare"]
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
                  className="object-cover object-top transition-all duration-3000 grayscale-100 group-hover:grayscale-0 group-hover:object-bottom"
                  data-ai-hint={project.title + ' software'}
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
              <a href={project.url} target="_blank" className="flex items-start justify-between">
                <div>
                  <h3 className="font-headline text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground">{project.category}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                  <ArrowUpRight className="w-5 h-5 group-hover:text-primary-foreground" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
