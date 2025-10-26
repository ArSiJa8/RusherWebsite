import { Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  totalPlugins: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Header({ totalPlugins, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3" data-testid="header-brand">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-primary to-accent">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-lg font-bold tracking-tight text-foreground">
                Rusherhack Plugins
              </h1>
            </div>
          </div>

          {/* Center Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search plugins, creators, features..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 h-10 bg-card/50 border-border/50 focus:border-primary/50 transition-colors"
                data-testid="input-search-header"
              />
            </div>
          </div>

          {/* Stats Counter */}
          <div className="flex items-center gap-2 text-sm">
            <span className="hidden sm:inline text-muted-foreground">Plugins:</span>
            <span className="font-mono font-semibold text-accent" data-testid="text-plugin-count">
              {totalPlugins}+
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
