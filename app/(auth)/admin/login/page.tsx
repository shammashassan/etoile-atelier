"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail, KeyRound, ShieldAlert } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        setServerError(res.error.message || "Authentication failed. Invalid director credentials.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Authentication network error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillCredentials = () => {
    setEmail("director@etoile-atelier.com");
    setPassword("AtelierDirector2026!");
    setServerError(null);
  };

  return (
    <div data-ui="auth-portal" className="flex min-h-svh items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <span className="font-heading text-3xl font-normal tracking-widest uppercase text-foreground">
            Étoile Atelier
          </span>
          <p className="text-xs text-muted-foreground">
            Director &amp; Management Portal
          </p>
        </div>

        <div className="bg-secondary p-8 sm:p-10 space-y-6">
          <div className="space-y-1">
            <h2 className="font-heading text-xl font-normal text-foreground">
              Director Authorization
            </h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Authenticated session required to manage live catalog, valuation pricing, and client dossiers.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            {errorMessage && (
              <div className="flex items-center gap-2 bg-destructive/10 p-3 text-xs text-destructive">
                <ShieldAlert className="size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="text-xs text-muted-foreground block mb-1.5 font-medium">
                Atelier Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-9 text-xs bg-background"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground block mb-1.5 font-medium">
                Master Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-9 text-xs bg-background"
                />
              </div>
            </div>

            <Button type="submit" className="w-full text-xs font-medium" disabled={isLoading}>
              {isLoading ? "Authenticating Session..." : "Authorize Director Access"}
              <ArrowRight className="size-3.5 ml-2" />
            </Button>
          </form>

          <div className="bg-background/80 p-4 text-xs text-muted-foreground space-y-2 border border-border/40">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground flex items-center gap-1.5">
                <KeyRound className="size-3.5" />
                Authorized Demo Key
              </span>
              <button
                type="button"
                onClick={handleFillCredentials}
                className="text-foreground hover:underline font-medium text-xs"
              >
                Autofill
              </button>
            </div>
            <div className="text-xs text-muted-foreground">
              Email: director@etoile-atelier.com
            </div>
            <div className="text-xs text-muted-foreground">
              Password: AtelierDirector2026!
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Return to Public Salon
          </Link>
        </div>
      </div>
    </div>
  );
}