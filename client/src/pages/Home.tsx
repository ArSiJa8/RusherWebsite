import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FilterSidebar } from "@/components/FilterSidebar";
import { PluginCard } from "@/components/PluginCard";
import { PluginDetailModal } from "@/components/PluginDetailModal";
import { LoadingState } from "@/components/LoadingState";
import { EmptyState } from "@/components/EmptyState";
import type { Plugin, PluginsResponse } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCoreOnly, setShowCoreOnly] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("all");
  const [selectedCreator, setSelectedCreator] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [selectedPlugin, setSelectedPlugin] = useState<Plugin | null>(null);

  // Fetch plugins from API
  const { data, isLoading, error } = useQuery<PluginsResponse>({
    queryKey: ["/api/plugins"],
  });

  // Filter, search, and sort plugins
  const filteredPlugins = useMemo(() => {
    if (!data?.plugins) return [];

    let plugins = [...data.plugins];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      plugins = plugins.filter(
        (plugin) =>
          plugin.name.toLowerCase().includes(query) ||
          plugin.description.toLowerCase().includes(query) ||
          plugin.creator.name.toLowerCase().includes(query) ||
          plugin.mc_versions.toLowerCase().includes(query)
      );
    }

    // Apply core filter
    if (showCoreOnly) {
      plugins = plugins.filter((plugin) => plugin.is_core);
    }

    // Apply version filter
    if (selectedVersion !== "all") {
      plugins = plugins.filter((plugin) =>
        plugin.mc_versions.includes(selectedVersion)
      );
    }

    // Apply creator filter
    if (selectedCreator !== "all") {
      plugins = plugins.filter((plugin) => plugin.creator.name === selectedCreator);
    }

    // Apply sorting
    plugins.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "creator":
          return a.creator.name.localeCompare(b.creator.name);
        case "latest":
          // Sort by latest release tag (try to parse version numbers)
          if (!a.latest_release_tag) return 1;
          if (!b.latest_release_tag) return -1;
          return b.latest_release_tag.localeCompare(a.latest_release_tag);
        default:
          return 0;
      }
    });

    return plugins;
  }, [data?.plugins, searchQuery, showCoreOnly, selectedVersion, selectedCreator, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setShowCoreOnly(false);
    setSelectedVersion("all");
    setSelectedCreator("all");
    setSortBy("name");
  };

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="font-display text-2xl font-bold text-destructive mb-2">
            Failed to load plugins
          </h2>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      </div>
    );
  }

  const totalPlugins = data?.plugins?.length || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <Header
        totalPlugins={totalPlugins}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showCoreOnly={showCoreOnly}
        onToggleCore={() => setShowCoreOnly(!showCoreOnly)}
      />

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            plugins={data?.plugins || []}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showCoreOnly={showCoreOnly}
            onToggleCore={setShowCoreOnly}
            selectedVersion={selectedVersion}
            onVersionChange={setSelectedVersion}
            selectedCreator={selectedCreator}
            onCreatorChange={setSelectedCreator}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground" data-testid="text-results-count">
                  {filteredPlugins.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {totalPlugins}
                </span>{" "}
                plugins
              </p>
            </div>

            {/* Plugin Grid */}
            {filteredPlugins.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPlugins.map((plugin) => (
                  <PluginCard
                    key={plugin.repo}
                    plugin={plugin}
                    onClick={() => setSelectedPlugin(plugin)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState onClearFilters={handleClearFilters} />
            )}
          </div>
        </div>
      </div>

      {/* Plugin Detail Modal */}
      <PluginDetailModal
        plugin={selectedPlugin}
        open={selectedPlugin !== null}
        onClose={() => setSelectedPlugin(null)}
      />
    </div>
  );
}
