"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Smartphone, Monitor, ShieldCheck, Zap, Globe } from "lucide-react";

const services = [
  {
    title: "Custom Web Solutions",
    description: "High-performance, SEO-optimized web applications built with Next.js and React.",
    icon: Globe,
    color: "text-primary"
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile experiences that feel premium and responsive.",
    icon: Smartphone,
    color: "text-accent"
  },
  {
    title: "Cloud Infrastructure",
    description: "Scalable, secure cloud architectures on AWS, GCP, and Azure for growing businesses.",
    icon: Cloud,
    color: "text-primary"
  },
  {
    title: "UI/UX Architecture",
    description: "Minimalist, user-centric designs that convert visitors into loyal customers.",
    icon: Monitor,
    color: "text-accent"
  },
  {
    title: "Security Audits",
    description: "Comprehensive security reviews to protect your data and maintain user trust.",
    icon: ShieldCheck,
    color: "text-primary"
  },
  {
    title: "AI Integration",
    description: "Empowering your software with intelligent LLM features and automated workflows.",
    icon: Zap,
    color: "text-accent"
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Our Expertise.</h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            We don't just write code. We build foundations for your digital success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="glass border-none group hover:bg-white/[0.05] transition-all duration-300">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-white/[0.05] flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed pt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}