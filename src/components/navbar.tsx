"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300",
        isScrolled ? "glass shadow-xl" : "bg-transparent"
      )}>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary transition-transform group-hover:scale-110">
            <Code2 className="text-primary-foreground h-6 w-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight hidden sm:block">
            BUILDEI <span className="text-primary">FORGE</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#services" className="hover:text-primary transition-colors">Services</Link>
          <Link href="#portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
          <Link href="#ai-clarifier" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            AI Tool
          </Link>
          <Link href="#contact">
            <Button size="sm" className="glow-primary">Start Building</Button>
          </Link>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
}