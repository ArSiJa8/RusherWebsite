import { z } from "zod";

// Plugin data models matching the Rusherhack API structure
export const pluginCreatorSchema = z.object({
  name: z.string(),
  url: z.string(),
  avatar: z.string(),
});

export const pluginScreenshotSchema = z.object({
  url: z.string(),
  alt: z.string().optional(),
  width: z.number().optional(),
});

export const pluginSchema = z.object({
  name: z.string(),
  repo: z.string(),
  description: z.string(),
  creator: pluginCreatorSchema,
  latest_release_tag: z.string(),
  screenshots: z.array(pluginScreenshotSchema),
  is_core: z.boolean(),
  mc_versions: z.string(),
  jar_url: z.string().optional(),
});

export const pluginsResponseSchema = z.object({
  plugins: z.array(pluginSchema),
});

export type PluginCreator = z.infer<typeof pluginCreatorSchema>;
export type PluginScreenshot = z.infer<typeof pluginScreenshotSchema>;
export type Plugin = z.infer<typeof pluginSchema>;
export type PluginsResponse = z.infer<typeof pluginsResponseSchema>;
