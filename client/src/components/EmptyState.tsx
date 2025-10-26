import { Button } from "@/components/ui/button";
import { SearchX, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center">
          <SearchX className="w-12 h-12 text-muted-foreground" />
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl -z-10" />
      </div>
      
      <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
        No plugins found
      </h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        We couldn't find any plugins matching your current filters. Try adjusting your search or clearing filters.
      </p>
      
      <Button
        onClick={onClearFilters}
        variant="outline"
        className="gap-2"
        data-testid="button-clear-filters"
      >
        <RotateCcw className="w-4 h-4" />
        Clear All Filters
      </Button>
    </div>
  );
}
