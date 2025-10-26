# Rusherhack Plugins - Design Guidelines

## Design Approach

**Selected Approach**: Reference-Based (Gaming Marketplace)

Drawing inspiration from modern gaming mod platforms like Modrinth, CurseForge, and Thunderstore, with a focus on **dark gaming aesthetics** meeting **functional utility**. The design balances visual appeal with information density, creating an immersive yet highly usable plugin discovery experience.

**Core Principle**: Create a slick, performance-focused interface that feels native to the gaming ecosystem while maintaining excellent usability for browsing and filtering hundreds of plugins.

---

## Typography

**Font Stack**: 
- **Primary**: Inter (Google Fonts) - Clean, modern sans-serif for body text and UI elements
- **Display**: Space Grotesk (Google Fonts) - Bold, technical feel for headings and plugin names
- **Monospace**: JetBrains Mono (Google Fonts) - For version numbers, technical details

**Hierarchy**:
- **Hero/Page Title**: Space Grotesk, 48px (3xl), font-weight 700, tracking-tight
- **Section Headers**: Space Grotesk, 32px (2xl), font-weight 600
- **Plugin Names**: Space Grotesk, 20px (xl), font-weight 600
- **Body Text**: Inter, 16px (base), font-weight 400, line-height relaxed
- **Metadata/Labels**: Inter, 14px (sm), font-weight 500
- **Captions**: Inter, 12px (xs), font-weight 400

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm

**Container Strategy**:
- Max-width: `max-w-7xl` for main content
- Padding: `px-4 md:px-8 lg:px-12` for responsive edge spacing
- Section spacing: `py-12 md:py-16 lg:py-20` between major sections

**Grid Layouts**:
- Plugin Cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Responsive breakpoints: Mobile-first, stacking to multi-column
- Card aspect ratio: Natural height based on content, min-height 320px

---

## Component Library

### Navigation Bar
- Fixed top position with backdrop blur effect
- Height: 64px (h-16)
- Logo left-aligned with site name "Rusherhack Plugins"
- Search bar center-prominent (max-w-md)
- Stats counter right-aligned (e.g., "247+ Plugins")
- Glassmorphic background with subtle border bottom

### Hero Section
- Height: 60vh minimum
- Large heading "Discover Rusherhack Plugins"
- Subtitle explaining the plugin ecosystem
- Prominent search bar with real-time filtering
- Quick filter chips (Core Plugins, Latest, Popular)
- Abstract geometric pattern background (CSS gradients, no image needed)

### Plugin Cards
**Structure**:
- Rounded corners (rounded-lg)
- Border with subtle glow on hover
- Padding: p-6
- Elevation: Subtle shadow that intensifies on hover

**Content Layout**:
- **Header**: Plugin icon/thumbnail (if available) + Name + Core badge (if is_core)
- **Meta Row**: Creator avatar (rounded-full, w-8 h-8) + Creator name + Version tag
- **Description**: 2-line clamp with expand option
- **Footer**: MC Version badge + Download button (primary action)
- **Screenshot Preview**: If screenshots exist, show first thumbnail (aspect-video, max-h-48)

### Filter Sidebar
- Width: w-64 on desktop, full-width drawer on mobile
- Sticky position (top-20)
- Filter categories:
  - Search input (persistent)
  - Minecraft Version dropdown/checkboxes
  - Creator filter (autocomplete)
  - Core Plugins toggle
  - Sort options (Name, Latest Release, Popular)

### Plugin Detail Modal/Expanded View
- Full-screen overlay with close button
- Two-column layout: Left (Screenshots gallery), Right (Details)
- **Screenshot Gallery**: Lightbox-style carousel with thumbnails
- **Details Panel**:
  - Large plugin name
  - Creator info with GitHub link
  - Full description
  - Version compatibility list
  - Download button (prominent, with file size if available)
  - GitHub repository link
  - Release tag badge

### Badges & Tags
- **Minecraft Version**: Pill shape, monospace font, subtle background
- **Core Plugin**: Bright accent badge with icon
- **Release Tag**: Outlined badge with version number
- **Status Indicators**: Small colored dots for update status

### Buttons
**Primary (Download/CTA)**:
- Padding: px-6 py-3
- Rounded: rounded-md
- Font: font-semibold, text-sm
- Hover state: Slight scale (scale-105) + brightness increase
- Active state: Scale down slightly (scale-95)

**Secondary (Links/Actions)**:
- Outlined variant
- Padding: px-4 py-2
- Subtle hover background

### Loading States
- Skeleton screens for plugin cards (animated pulse)
- Shimmer effect on loading placeholders
- Spinner for API requests (centered, with "Loading plugins..." text)

### Empty States
- Centered icon (puzzle piece or plugin symbol)
- Message: "No plugins found matching your filters"
- Action: "Clear filters" button

---

## Search & Filter Experience

**Search Input**:
- Large, prominent (h-12)
- Placeholder: "Search plugins, creators, features..."
- Icon: Magnifying glass left-aligned
- Clear button when text entered
- Real-time filtering (debounced 300ms)

**Active Filters Display**:
- Chip row below search showing active filters
- Each chip dismissible with X button
- "Clear all" option when multiple filters active

---

## Interaction Patterns

**Card Interactions**:
- Hover: Subtle lift (translateY -2px) + shadow increase + border glow
- Click: Expand to detail view OR navigate to detail page
- Download button: Immediate feedback (downloading... state)

**Gallery Interactions**:
- Screenshot click: Opens lightbox
- Lightbox: Previous/Next arrows, close on backdrop click
- Thumbnail navigation for multiple screenshots

**Filtering**:
- Instant visual feedback on filter changes
- Smooth transitions when plugins reorder/filter
- Count indicator showing "Showing X of Y plugins"

---

## Responsive Behavior

**Mobile (< 768px)**:
- Single column plugin grid
- Filter sidebar becomes drawer (hamburger menu)
- Search bar full-width below header
- Simplified card layout (stacked elements)

**Tablet (768px - 1024px)**:
- Two-column plugin grid
- Collapsible filter sidebar
- Maintained visual hierarchy

**Desktop (> 1024px)**:
- Three-column plugin grid
- Persistent filter sidebar
- Full feature set visible

---

## Accessibility

- Focus indicators on all interactive elements (ring-2 ring-offset-2)
- Keyboard navigation support (Tab, Enter, Escape)
- ARIA labels for icon buttons
- Contrast ratios meeting WCAG AA standards
- Screen reader announcements for filter changes and loading states
- Skip to content link for keyboard users

---

## Performance Considerations

- Lazy load plugin screenshots
- Virtual scrolling for large plugin lists (if 100+ plugins)
- Debounced search input
- Cached API responses with periodic refresh
- Progressive image loading for screenshots

---

## Images

**No hero image required** - Use CSS gradient background with abstract geometric patterns.

**Plugin Screenshots**: Display actual plugin screenshots from API where available (lightbox-enabled, lazy-loaded).

**Creator Avatars**: Small circular avatars from GitHub (already in API at 20px, upscale to 32px for cards).

**Placeholder Images**: For plugins without screenshots, use a distinctive icon or abstract pattern representing "plugin" or "mod" concept.