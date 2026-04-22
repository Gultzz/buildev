"use client"

import { Code2, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Code2 className="text-primary-foreground h-5 w-5" />
              </div>
              <span className="font-headline font-bold text-xl tracking-tight">
                BUILDEI <span className="text-primary">FORGE</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              Elite software engineering house specializing in minimalist digital products and high-performance applications.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6 text-sm uppercase tracking-widest text-primary">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="#portfolio" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6 text-sm uppercase tracking-widest text-accent">Tech stack</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>Next.js & React</li>
              <li>TypeScript</li>
              <li>Node.js / Go</li>
              <li>AWS / GCP</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Buildei Forge. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}