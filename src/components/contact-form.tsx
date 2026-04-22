"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, MessageSquare, User, Send } from "lucide-react";
import { useLanguage } from "@/context/language-context";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Tell us a bit more about your project"),
});

export function ContactForm() {
  const { t } = useLanguage();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: t.contact.form.success,
      description: t.contact.form.successDesc,
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">{t.contact.title} <br/><span className="text-primary">{t.contact.titleAccent}</span></h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              {t.contact.subtitle}
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">{t.contact.emailUs}</p>
                  <p className="text-muted-foreground">hello@buildeiforge.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold">{t.contact.liveChat}</p>
                  <p className="text-muted-foreground">{t.contact.liveChatSub}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-dark p-8 md:p-10 rounded-3xl border border-white/5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.contact.form.name}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="John Doe" className="pl-10 glass border-none focus-visible:ring-primary" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.contact.form.email}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="john@example.com" className="pl-10 glass border-none focus-visible:ring-primary" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.contact.form.company}</FormLabel>
                      <FormControl>
                        <Input placeholder="ACME Inc." className="glass border-none focus-visible:ring-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.contact.form.details}</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t.contact.form.placeholderDetails} 
                          className="min-h-[120px] glass border-none focus-visible:ring-primary" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full h-14 text-base font-bold glow-primary">
                  {t.contact.form.submit} <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
