"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Code2, Menu, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Sparkles } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
          <Image src="/logo.svg" alt="Logo" width={140}  height={140} priority />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#services" className="hover:text-primary transition-colors">{t.nav.services}</Link>
          <Link href="#portfolio" className="hover:text-primary transition-colors">{t.nav.portfolio}</Link>
          <Link href="#ai-clarifier" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t.nav.aiTool}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 px-2">
                <Globe className="h-4 w-4" />
                <span className="uppercase">{language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-white/10">
              <DropdownMenuItem onClick={() => setLanguage("pt")} className="cursor-pointer">
                Português (PT)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">
                English (EN)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("es")} className="cursor-pointer">
                Español (ES)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="#contact">
            <Button size="sm" className="glow-primary">{t.nav.startBuilding}</Button>
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              <DropdownMenuItem onClick={() => setLanguage("pt")}>PT</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>EN</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("es")}>ES</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-dark border-white/10">
              <div className="flex flex-col gap-8 mt-12">
                <SheetClose asChild>
                  <Link href="#services" className="text-xl font-medium hover:text-primary transition-colors">{t.nav.services}</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#portfolio" className="text-xl font-medium hover:text-primary transition-colors">{t.nav.portfolio}</Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#ai-clarifier" className="text-xl font-medium hover:text-primary transition-colors flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {t.nav.aiTool}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="#contact" className="mt-4">
                    <Button size="lg" className="w-full glow-primary text-base">{t.nav.startBuilding}</Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
