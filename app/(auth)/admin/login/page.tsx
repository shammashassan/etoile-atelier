"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail, KeyRound, ShieldAlert } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";

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
          <p className="text-xs tracking-widest uppercase text-muted-foreground">
            Director &amp; Management Portal
          </p>
        </div>

        <Card className="bg-secondary p-8 sm:p-10 space-y-6 border border-border">
          <CardHeader className="p-0 gap-1">
            <CardTitle className="font-heading text-xl font-normal text-foreground">
              Director Authorization
            </CardTitle>
            <CardDescription className="text-xs leading-relaxed text-muted-foreground">
              Authenticated session required to manage live catalog, valuation pricing, and client dossiers.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              {errorMessage && (
                <Alert variant="destructive">
                  <ShieldAlert className="size-4" />
                  <AlertTitle>Authorization Failed</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <FieldGroup className="gap-4">
                <Field>
                  <FieldLabel htmlFor="admin-email" className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Atelier Email
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="admin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-9 text-xs bg-background"
                    />
                  </div>
                </Field>

                <Field>
                  <FieldLabel htmlFor="admin-pass" className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Master Password
                  </FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="admin-pass"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-9 text-xs bg-background"
                    />
                  </div>
                </Field>
              </FieldGroup>

              <Button type="submit" className="w-full text-xs uppercase tracking-wider font-semibold" disabled={isLoading}>
                {isLoading ? "Authenticating Session..." : "Authorize Director Access"}
                <ArrowRight className="size-3.5 ml-2" />
              </Button>
            </form>

            <div className="bg-background/80 p-4 text-xs text-muted-foreground space-y-2 border border-border/40 mt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground flex items-center gap-1.5 uppercase tracking-wider">
                  <KeyRound className="size-3.5" />
                  Authorized Demo Key
                </span>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={handleFillCredentials}
                  className="h-auto p-0 text-foreground hover:underline font-semibold text-xs uppercase tracking-wider"
                >
                  Autofill
                </Button>
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                Email: director@etoile-atelier.com
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                Password: AtelierDirector2026!
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            variant="link"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            Return to Public Salon
          </Button>
        </div>
      </div>
    </div>
  );
}
