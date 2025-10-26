import { Search, Sparkles, Download, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showCoreOnly: boolean;
  onToggleCore: () => void;
}

export function Hero({ searchQuery, onSearchChange, showCoreOnly, onToggleCore }: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 text-center">
        {/* Main Heading */}
        <div className="mb-6">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            Discover{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Rusherhack
            </span>{" "}
            Plugins
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Browse the ultimate collection of Minecraft mods, HUD elements, tweaks, and utilities crafted by the community.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search plugins, creators, features..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-14 pl-12 pr-4 text-base bg-card/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all shadow-lg"
              data-testid="input-search-hero"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:inline">Quick filters:</span>
          <Button
            variant={showCoreOnly ? "default" : "outline"}
            size="sm"
            onClick={onToggleCore}
            className="gap-2"
            data-testid="button-filter-core"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Core Plugins
          </Button>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 cursor-default" data-testid="badge-quick-filter-latest">
            <Download className="w-3 h-3" />
            Latest Releases
          </Badge>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1.5 cursor-default" data-testid="badge-quick-filter-popular">
            <Zap className="w-3 h-3" />
            Popular
          </Badge>
        </div>
      </div>
    </section>
  );
}
