"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowRight, Lock, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("director@etoile-atelier.com");
  const [password, setPassword] = useState("AtelierDirector2026!");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setServerError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError(null);

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res.error) {
        // If account doesn't exist yet, attempt signup or direct entry for showcase
        const signUpRes = await authClient.signUp.email({
          email,
          password,
          name: "Atelier Director",
        });

        if (signUpRes.error) {
          // Direct demo session
          router.push("/admin");
        } else {
          router.push("/admin");
        }
      } else {
        router.push("/admin");
      }
    } catch {
      // In showcase/demo mode, proceed to dashboard
      router.push("/admin");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoAccess = () => {
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <span className="font-heading text-3xl font-normal tracking-widest uppercase text-foreground">
            Étoile
          </span>
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            Atelier Management Portal
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="size-4 text-primary" />
              <CardTitle>Director Access</CardTitle>
            </div>
            <CardDescription>
              Sign in to manage catalog pieces, appointments, and valuations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              {errorMessage && (
                <div className="border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Atelier Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-9 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1.5">
                  Secret Key
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-9 text-xs"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Enter Atelier Portal"}
                <ArrowRight data-icon="inline-end" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-2">
            <div className="relative w-full text-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <span className="relative bg-card px-2 text-xs uppercase tracking-widest text-muted-foreground">
                Client Demonstration
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleQuickDemoAccess}
              className="w-full text-xs uppercase tracking-wider"
            >
              <Sparkles data-icon="inline-start" />
              One-Click Showcase Access
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Return to Public Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
