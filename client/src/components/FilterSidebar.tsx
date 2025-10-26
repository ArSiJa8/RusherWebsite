import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";
import type { Plugin } from "@shared/schema";

interface FilterSidebarProps {
  plugins: Plugin[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showCoreOnly: boolean;
  onToggleCore: (value: boolean) => void;
  selectedVersion: string;
  onVersionChange: (value: string) => void;
  selectedCreator: string;
  onCreatorChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function FilterSidebar({
  plugins,
  searchQuery,
  onSearchChange,
  showCoreOnly,
  onToggleCore,
  selectedVersion,
  onVersionChange,
  selectedCreator,
  onCreatorChange,
  sortBy,
  onSortChange,
}: FilterSidebarProps) {
  // Extract unique Minecraft versions
  const uniqueVersions = useMemo(() => {
    const versions = new Set<string>();
    plugins.forEach((plugin) => {
      if (plugin.mc_versions && plugin.mc_versions !== "N/A") {
        // Split version ranges like "1.20.1-1.21.4" into individual versions
        const parts = plugin.mc_versions.split(/[-,]/);
        parts.forEach((part) => {
          const cleaned = part.trim();
          if (cleaned) versions.add(cleaned);
        });
      }
    });
    return Array.from(versions).sort().reverse();
  }, [plugins]);

  // Extract unique creators
  const uniqueCreators = useMemo(() => {
    const creators = new Set<string>();
    plugins.forEach((plugin) => {
      if (plugin.creator.name) {
        creators.add(plugin.creator.name);
      }
    });
    return Array.from(creators).sort();
  }, [plugins]);

  const hasActiveFilters = searchQuery || showCoreOnly || selectedVersion !== "all" || selectedCreator !== "all" || sortBy !== "name";

  const clearAllFilters = () => {
    onSearchChange("");
    onToggleCore(false);
    onVersionChange("all");
    onCreatorChange("all");
    onSortChange("name");
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0" data-testid="sidebar-filters">
      <div className="sticky top-20">
        <Card className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-display font-semibold text-foreground">Filters</h3>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                data-testid="button-clear-all-filters"
              >
                Clear all
              </Button>
            )}
          </div>

          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="sidebar-search" className="text-sm font-medium">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                id="sidebar-search"
                type="search"
                placeholder="Plugin name..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 pr-9 h-9"
                data-testid="input-search-sidebar"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-muted transition-colors"
                  data-testid="button-clear-search"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Core Plugins Toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="core-toggle" className="text-sm font-medium">
                Core Plugins Only
              </Label>
              <Switch
                id="core-toggle"
                checked={showCoreOnly}
                onCheckedChange={onToggleCore}
                data-testid="switch-core-only"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Show only essential plugins
            </p>
          </div>

          {/* Minecraft Version Filter */}
          <div className="space-y-2">
            <Label htmlFor="version-select" className="text-sm font-medium">
              Minecraft Version
            </Label>
            <Select value={selectedVersion} onValueChange={onVersionChange}>
              <SelectTrigger id="version-select" className="h-9" data-testid="select-version">
                <SelectValue placeholder="All versions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All versions</SelectItem>
                {uniqueVersions.map((version) => (
                  <SelectItem key={version} value={version}>
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Creator Filter */}
          <div className="space-y-2">
            <Label htmlFor="creator-select" className="text-sm font-medium">
              Creator
            </Label>
            <Select value={selectedCreator} onValueChange={onCreatorChange}>
              <SelectTrigger id="creator-select" className="h-9" data-testid="select-creator">
                <SelectValue placeholder="All creators" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All creators</SelectItem>
                {uniqueCreators.map((creator) => (
                  <SelectItem key={creator} value={creator}>
                    {creator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <Label htmlFor="sort-select" className="text-sm font-medium">
              Sort By
            </Label>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger id="sort-select" className="h-9" data-testid="select-sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="creator">Creator</SelectItem>
                <SelectItem value="latest">Latest Release</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-border/50 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {showCoreOnly && (
                  <Badge
                    variant="secondary"
                    className="gap-1 pr-1 cursor-pointer hover:bg-secondary/80"
                    onClick={() => onToggleCore(false)}
                    data-testid="badge-filter-core"
                  >
                    Core Only
                    <button className="p-0.5 rounded-sm hover:bg-muted">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </Badge>
                )}
                {selectedVersion !== "all" && (
                  <Badge
                    variant="secondary"
                    className="gap-1 pr-1 cursor-pointer hover:bg-secondary/80"
                    onClick={() => onVersionChange("all")}
                    data-testid="badge-filter-version"
                  >
                    {selectedVersion}
                    <button className="p-0.5 rounded-sm hover:bg-muted">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </Badge>
                )}
                {selectedCreator !== "all" && (
                  <Badge
                    variant="secondary"
                    className="gap-1 pr-1 cursor-pointer hover:bg-secondary/80"
                    onClick={() => onCreatorChange("all")}
                    data-testid="badge-filter-creator"
                  >
                    {selectedCreator}
                    <button className="p-0.5 rounded-sm hover:bg-muted">
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </aside>
  );
}
