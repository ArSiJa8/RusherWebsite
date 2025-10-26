import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Download, ExternalLink, Sparkles, Github } from "lucide-react";
import type { Plugin } from "@shared/schema";
import { useState } from "react";

interface PluginCardProps {
  plugin: Plugin;
  onClick: () => void;
}

export function PluginCard({ plugin, onClick }: PluginCardProps) {
  const [imageError, setImageError] = useState(false);
  const firstScreenshot = plugin.screenshots?.[0];

  return (
    <Card
      className="group overflow-hidden border-card-border hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
      onClick={onClick}
      data-testid={`card-plugin-${plugin.name.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Screenshot Preview */}
      {firstScreenshot && !imageError && (
        <div className="relative aspect-video w-full bg-muted overflow-hidden">
          <img
            src={firstScreenshot.url}
            alt={firstScreenshot.alt || plugin.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Header: Name + Core Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground mb-1 truncate">
              {plugin.name}
            </h3>
            {plugin.is_core && (
              <Badge variant="default" className="gap-1 bg-primary/20 text-primary border-primary/30">
                <Sparkles className="w-3 h-3" />
                Core
              </Badge>
            )}
          </div>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8 border border-border/50">
            <AvatarImage src={plugin.creator.avatar.replace('?size=20', '?size=40')} alt={plugin.creator.name} />
            <AvatarFallback className="text-xs bg-muted">
              {plugin.creator.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{plugin.creator.name}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {plugin.description}
        </p>

        {/* Footer: Version + Download */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/50">
          <div className="flex items-center gap-2 flex-wrap">
            {plugin.mc_versions && plugin.mc_versions !== "N/A" && (
              <Badge variant="secondary" className="font-mono text-xs px-2 py-0.5">
                {plugin.mc_versions}
              </Badge>
            )}
            {plugin.latest_release_tag && (
              <Badge variant="outline" className="font-mono text-xs px-2 py-0.5">
                v{plugin.latest_release_tag}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {plugin.jar_url && (
              <Button
                size="sm"
                className="gap-1.5"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(plugin.jar_url, '_blank');
                }}
                data-testid={`button-download-card-${plugin.name.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`https://github.com/${plugin.repo}`, '_blank');
              }}
              data-testid={`button-repo-card-${plugin.name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
