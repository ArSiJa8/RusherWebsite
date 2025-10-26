# Rusherhack Plugins Marketplace

## Overview

A modern web application for browsing and discovering Rusherhack plugins for Minecraft. The platform provides a gaming-focused marketplace interface inspired by platforms like Modrinth and CurseForge, featuring plugin discovery, filtering, search, and detailed plugin information with screenshots and metadata.

The application fetches plugin data from the official Rusherhack API and presents it through a sleek, dark-themed interface optimized for the gaming community.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing with a simple home page and 404 fallback.

**UI Component Library**: Shadcn/ui (New York variant) built on top of Radix UI primitives, providing a comprehensive set of accessible, composable components. The design system emphasizes dark gaming aesthetics with custom theming.

**State Management**: 
- TanStack React Query for server state management, data fetching, and caching
- Local React state (useState) for UI interactions and filters
- No global state management library needed due to simple data flow

**Styling Approach**:
- Tailwind CSS with custom configuration for gaming-focused design
- CSS variables for theming with dark mode support
- Custom color system with HSL values for consistent theming
- Typography using Google Fonts: Inter (body), Space Grotesk (headings), JetBrains Mono (code)
- Hover and active elevation states for interactive elements

**Key Features**:
- Real-time search across plugin names, descriptions, creators, and Minecraft versions
- Advanced filtering by core status, Minecraft version, creator, and sorting options
- Plugin cards with screenshot previews, creator information, and metadata
- Detailed modal view with image carousel and comprehensive plugin information
- Responsive design with mobile-first approach
- Empty states and loading skeletons for better UX

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js.

**API Design**: RESTful API with a proxy pattern - the backend acts as a caching layer between the frontend and the external Rusherhack API.

**Caching Strategy**: 
- In-memory caching of plugin data with 5-minute TTL to reduce external API calls
- Stale-while-revalidate pattern - returns cached data even if stale when external API fails
- Cache invalidation based on timestamp comparison

**Middleware Stack**:
- JSON body parsing with raw body preservation for webhook verification
- URL-encoded form data support
- Request logging middleware that captures method, path, status, duration, and response preview
- Vite development middleware for HMR in development mode

**Development vs Production**:
- Development: Vite middleware with HMR, SSR-based HTML serving
- Production: Static file serving from dist/public directory
- Conditional loading of Replit-specific development tools (cartographer, dev banner)

### Data Storage Solutions

**Current State**: In-memory storage implementation for user data (MemStorage class) - prepared for future database integration but not currently used by the plugin marketplace features.

**Schema Design**: Drizzle ORM with PostgreSQL dialect configured but schema not yet implemented. The configuration points to Neon serverless database via DATABASE_URL environment variable.

**Data Models**: 
- Plugin data structures defined via Zod schemas matching the Rusherhack API format
- Type-safe models for plugins, creators, screenshots, and API responses
- No persistent database currently used - all plugin data is fetched from external API

### External Dependencies

**Third-Party APIs**:
- **Rusherhack Plugins API**: `https://rusherdevelopment.github.io/rusherhack-plugins/api/v1/`
  - Provides complete plugin catalog with metadata, screenshots, and download links
  - Consumed via backend proxy with caching to reduce load and improve performance
  - Response format validated using Zod schemas

**Database Services**:
- **Neon Serverless PostgreSQL**: Configured via `@neondatabase/serverless` package
  - Connection string expected in DATABASE_URL environment variable
  - Drizzle ORM configured for PostgreSQL dialect
  - Migration files stored in `/migrations` directory
  - Not actively used in current implementation - prepared for future features

**UI Component Libraries**:
- **Radix UI**: Headless accessible component primitives (dialogs, popovers, dropdowns, etc.)
- **Embla Carousel**: Lightweight carousel for plugin screenshot galleries
- **cmdk**: Command menu component for potential future search enhancements
- **Lucide React**: Icon library for consistent iconography

**Styling & Utilities**:
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **class-variance-authority**: For creating type-safe component variants
- **clsx & tailwind-merge**: For conditional and merged class name handling
- **date-fns**: Date formatting and manipulation

**Development Tools**:
- **Replit Plugins**: Runtime error overlay, cartographer (code mapping), dev banner
- **Vite**: Fast build tool with HMR and plugin ecosystem
- **TypeScript**: Type safety across the entire stack
- **Drizzle Kit**: Database migration and schema management tool

**Session Management**:
- **express-session**: Session middleware (configured but not actively used)
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used)