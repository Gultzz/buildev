"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { clarifyProjectScope, ClarifyProjectScopeOutput } from "@/ai/flows/clarify-project-scope";
import { Sparkles, Loader2, CheckCircle2, ChevronRight, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

export function AIClarifier() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClarifyProjectScopeOutput | null>(null);

  const handleClarify = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const output = await clarifyProjectScope({ initialProjectIdea: input });
      setResult(output);
    } catch (error) {
      console.error("AI Clarification failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-clarifier" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-primary/5 blur-[120px] -z-10" />
      
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            Powered by GenAI
          </Badge>
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Project Concept Clarifier</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Got an idea but don't know where to start? Describe it in a few sentences, and our AI will help refine your vision into a structured scope.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <Card className="lg:col-span-5 glass-dark border-primary/20 shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                Describe your Vision
              </CardTitle>
              <CardDescription>
                Briefly explain what you want to build. Our AI consultant will do the rest.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="e.g., I want to build a mobile app for sustainable farming that uses satellite imagery to track soil moisture..."
                className="min-h-[200px] glass bg-transparent border-white/10 focus:border-primary/50 transition-all text-base"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button 
                onClick={handleClarify} 
                disabled={isLoading || !input.trim()}
                className="w-full h-12 glow-primary text-base font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                    Analyzing...
                  </>
                ) : (
                  <>
                    Clarify Concept <Sparkles className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="lg:col-span-7">
            {result ? (
              <div className="animate-fade-in space-y-6">
                <Card className="glass border-primary/30">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Scope Defined</span>
                    </div>
                    <CardTitle className="font-headline text-3xl text-accent">{result.projectName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-muted-foreground leading-relaxed">{result.projectSummary}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-headline font-bold text-sm uppercase tracking-tighter text-white/50 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {result.keyFeatures.slice(0, 4).map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-sm uppercase tracking-tighter text-white/50 mb-3">Technical Stack</h4>
                        <ul className="space-y-2">
                          {result.technicalConsiderations.slice(0, 4).map((tech, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Ready to start the forge?</p>
                      <Button variant="link" className="text-primary p-0 h-auto font-bold" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
                        Talk to an Expert →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl p-12 text-center text-muted-foreground/40 min-h-[400px]">
                <Sparkles className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg font-headline font-medium">Results will appear here...</p>
                <p className="text-sm">Submit your idea to get AI-generated insights.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border inline-block", className)}>
      {children}
    </span>
  );
}