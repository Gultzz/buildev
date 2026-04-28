"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { clarifyProjectScope, ClarifyProjectScopeOutput } from "@/ai/flows/clarify-project-scope";
import { Sparkles, Loader2, CheckCircle2, ChevronRight, Lightbulb, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AIClarifier() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClarifyProjectScopeOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();
  const { toast } = useToast();

  const handleClarify = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const output = await clarifyProjectScope({ 
        initialProjectIdea: input,
        language: language 
      });
      setResult(output);
    } catch (err: any) {
      console.error("AI Clarification failed", err);
      // @ts-ignore
      setError(t.aiClarifier.error || "AI Connection failed. Check if API Key is configured.");
      toast({
        variant: "destructive",
        // @ts-ignore
        title: t.aiClarifier.errorTitle || "AI Error",
        // @ts-ignore
        description: t.aiClarifier.errorDesc || "Could not process your idea right now.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-clarifier" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-primary/5 blur-[120px] -z-10" />
      
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold border bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 mb-4 transition-colors">
            {t.aiClarifier.badge}
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">{t.aiClarifier.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.aiClarifier.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <Card className="lg:col-span-5 glass-dark border-primary/20 shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" aria-hidden="true" />
                {t.aiClarifier.cardTitle}
              </CardTitle>
              <CardDescription>
                {t.aiClarifier.cardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder={t.aiClarifier.placeholder}
                className="min-h-[200px] glass bg-transparent border-white/10 focus:border-primary/50 transition-all text-base"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              
              {error && (
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription className="text-xs">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleClarify} 
                disabled={isLoading || !input.trim()}
                className="w-full h-12 glow-primary text-base font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                    {t.aiClarifier.buttonLoading}
                  </>
                ) : (
                  <>
                    {t.aiClarifier.button} <Sparkles className="ml-2 h-5 w-5" aria-hidden="true" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="lg:col-span-7" aria-live="polite" aria-atomic="true">
            {result ? (
              <div className="animate-fade-in space-y-6">
                <Card className="glass border-primary/30">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                      <span className="text-xs font-bold uppercase tracking-widest">{t.aiClarifier.scopeDefined}</span>
                    </div>
                    <CardTitle className="font-headline text-3xl text-accent">{result.projectName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <p className="text-muted-foreground leading-relaxed">{result.projectSummary}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-headline font-bold text-sm uppercase tracking-tighter text-white/50 mb-3">{t.aiClarifier.keyFeatures}</h4>
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
                        <h4 className="font-headline font-bold text-sm uppercase tracking-tighter text-white/50 mb-3">{t.aiClarifier.techStack}</h4>
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
                      <p className="text-sm text-muted-foreground">{t.aiClarifier.ready}</p>
                      <Button variant="link" className="text-primary p-0 h-auto font-bold" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
                        {t.aiClarifier.talkExpert}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl p-12 text-center text-muted-foreground min-h-[400px]">
                <Sparkles className="w-16 h-16 mb-4 opacity-50" aria-hidden="true" />
                <p className="text-lg font-headline font-medium text-foreground">{t.aiClarifier.resultsPlaceholder}</p>
                <p className="text-sm">{t.aiClarifier.resultsSub}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
