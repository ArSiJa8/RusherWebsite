import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function PluginCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      <div className="aspect-video w-full bg-muted" />
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted" />
          <div className="h-4 bg-muted rounded w-24" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-muted rounded w-20" />
          <div className="h-9 bg-muted rounded w-24" />
        </div>
      </div>
    </Card>
  );
}

export function LoadingState() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-lg text-muted-foreground">Loading plugins...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <PluginCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
