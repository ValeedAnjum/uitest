"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, Search, AlertTriangle } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <Card className="relative overflow-hidden border-0 shadow-2xl bg-card/80 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

          <CardContent className="relative p-12 text-center space-y-8">
            {/* Error Icon */}
            <div className="relative">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse" />
                <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>

            {/* Error Code */}
            <div className="space-y-2">
              <h1 className="text-8xl font-bold bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent tracking-tight">
                404
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-foreground">
                Safety Path Not Found
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                The safety assurance path you&apos;re looking for seems to have
                wandered off the structured safety case. Let&apos;s get you back
                to secure territory.
              </p>
            </div>

            {/* Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <Search className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Check your URL for typos
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <Home className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Return to dashboard
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <ArrowLeft className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Go back to previous page
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                onClick={() => router.back()}
                variant="outline"
                size="lg"
                className="group hover:scale-105 transition-all duration-200 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform " />
                Go Back
              </Button>

              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:scale-105 transition-all duration-200"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Back to Safety
                </Link>
              </Button>
            </div>

            {/* Footer Text */}
            <div className="pt-8 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                SafetyScope – Ensuring structured safety assurance, one GSN at a
                time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
