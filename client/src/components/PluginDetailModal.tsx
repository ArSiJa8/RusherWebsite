import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Download, ExternalLink, Github, Sparkles, ChevronLeft, ChevronRight, X, Package } from "lucide-react";
import type { Plugin } from "@shared/schema";
import { useState } from "react";

interface PluginDetailModalProps {
  plugin: Plugin | null;
  open: boolean;
  onClose: () => void;
}

export function PluginDetailModal({ plugin, open, onClose }: PluginDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!plugin) return null;

  const hasScreenshots = plugin.screenshots && plugin.screenshots.length > 0;

  const nextImage = () => {
    if (hasScreenshots) {
      setCurrentImageIndex((prev) => (prev + 1) % plugin.screenshots.length);
    }
  };

  const prevImage = () => {
    if (hasScreenshots) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? plugin.screenshots.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0" data-testid="modal-plugin-detail">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Column: Screenshots */}
            <div className="bg-muted/30 p-6 md:p-8">
              {hasScreenshots ? (
                <div className="space-y-4">
                  {/* Main Screenshot */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted group">
                    <img
                      src={plugin.screenshots[currentImageIndex].url}
                      alt={plugin.screenshots[currentImageIndex].alt || `${plugin.name} screenshot ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain cursor-pointer transition-transform hover:scale-105"
                      onClick={() => setLightboxOpen(true)}
                    />
                    {plugin.screenshots.length > 1 && (
                      <>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={prevImage}
                          data-testid="button-prev-screenshot"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={nextImage}
                          data-testid="button-next-screenshot"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Navigation */}
                  {plugin.screenshots.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {plugin.screenshots.map((screenshot, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                            index === currentImageIndex
                              ? 'border-primary scale-105'
                              : 'border-border/50 hover:border-border'
                          }`}
                          data-testid={`button-thumbnail-${index}`}
                        >
                          <img
                            src={screenshot.url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Package className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No screenshots available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Details */}
            <div className="p-6 md:p-8 space-y-6">
              <DialogHeader>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <DialogTitle className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {plugin.name}
                  </DialogTitle>
                  {plugin.is_core && (
                    <Badge variant="default" className="gap-1.5 bg-primary/20 text-primary border-primary/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      Core
                    </Badge>
                  )}
                </div>
              </DialogHeader>

              {/* Creator Info */}
              <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                <Avatar className="w-12 h-12 border-2 border-border/50">
                  <AvatarImage
                    src={plugin.creator.avatar.replace('?size=20', '?size=60')}
                    alt={plugin.creator.name}
                  />
                  <AvatarFallback className="bg-muted">
                    {plugin.creator.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{plugin.creator.name}</p>
                  <a
                    href={plugin.creator.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-3 h-3" />
                    View Profile
                  </a>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed">{plugin.description}</p>
              </div>

              {/* Version Info */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Version Compatibility</h4>
                  <div className="flex flex-wrap gap-2">
                    {plugin.mc_versions && plugin.mc_versions !== "N/A" ? (
                      <Badge variant="secondary" className="font-mono">
                        Minecraft {plugin.mc_versions}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">Version info not available</span>
                    )}
                  </div>
                </div>

                {plugin.latest_release_tag && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Latest Release</h4>
                    <Badge variant="outline" className="font-mono">
                      v{plugin.latest_release_tag}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {plugin.jar_url && (
                  <Button
                    className="flex-1 gap-2"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(plugin.jar_url, '_blank');
                    }}
                    data-testid="button-download-modal"
                  >
                    <Download className="w-4 h-4" />
                    Download Plugin
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://github.com/${plugin.repo}`, '_blank');
                  }}
                  data-testid="button-github"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox for fullscreen screenshot viewing */}
      {lightboxOpen && hasScreenshots && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
          data-testid="lightbox-screenshot"
        >
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={() => setLightboxOpen(false)}
            data-testid="button-close-lightbox"
          >
            <X className="w-5 h-5" />
          </Button>
          <img
            src={plugin.screenshots[currentImageIndex].url}
            alt={plugin.screenshots[currentImageIndex].alt || `${plugin.name} screenshot`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {plugin.screenshots.length > 1 && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                data-testid="button-lightbox-prev"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                data-testid="button-lightbox-next"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
}

