---
applyTo: 'ui/**/*.{ts,tsx},lib/**/*.{ts,tsx},app/**/*.{ts,tsx}'
---

# Architecture & Component Organization (Framework-Agnostic)

This document defines stack-agnostic architecture ownership for this repository and reusable web projects.
Use framework-specific instruction files (for example `next-app-router.instructions.md`) for runtime and router rules.

## Core Principles

### 1. **Component Layering**

Organize components into logical layers to prevent mixing concerns:

| Layer | Unit | Purpose | Constraints |
|-------|------|---------|-------------|
| **UI Layer** | `ui/components/` | Base styled components (buttons, cards, containers) | Zero business logic; pure presentation |
| **Prefab Layer** | `ui/prefabs/` | Page-section composites | Compose UI components; no raw className styling |
| **Layout Layer** | `ui/layout/` | Structure wrappers and orchestration boundaries | Pure composition; no feature-specific styling |

**Rule**: Prefabs compose UI components. Never define raw styling in prefabs.

### 2. **State Boundaries**

Clear separation of state ownership:

| State Type | Owner | Example |
|----------|-------|---------|
| **Server state** | Data fetching layer | Page content, metadata |
| **Engine state** | Client root component | Current section, menu open/closed |
| **Local state** | Feature component | Form input, dropdown toggled |

**Best Practice**: Centralize engine state in one client orchestrator and pass state downward.

### 3. **Styling Strategy**

- **Global Styles**: One entry point in `app/globals.css`
- **Component Styles**: Utility-first (Tailwind), no ad-hoc raw class definitions in prefab components
- **Dynamic Values**: CSS custom properties for runtime visuals instead of frequent React state updates
- **Responsive**: Mobile-first media query approach

### 4. **Naming & Refactoring**

- **Components**: PascalCase (`.tsx`)
- **Utilities**: camelCase (`.ts`)
- **Hooks**: `use*` prefix
- **Migration-first**: update consumers, then remove old paths; no suppression-first shortcuts
