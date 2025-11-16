# Lifely - Life Simulator

A modern life simulation game built with Next.js, React, TypeScript, and TailwindCSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **State Management**: Jotai
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts

## Project Structure

```
components/
  ├── game/              # Game-specific components
  │   ├── GameLayout.tsx # Main game layout
  │   ├── TopBar.tsx     # Header with user info
  │   ├── StatsCards.tsx # Attributes and overview
  │   ├── ActivityFeed.tsx # Life events log
  │   ├── QuickActions.tsx # Action cards
  │   ├── AgeButton.tsx  # Age progression button
  │   └── dialogs/       # Various game dialogs
  └── ui/                # shadcn/ui components
lib/
  ├── atoms/             # Jotai state atoms
  ├── data/              # Game data (names, countries, etc.)
  ├── types/             # TypeScript type definitions
  └── utils/             # Utility functions
```

## Development Notes

### Mobile Responsiveness

**Mobile responsiveness is NOT a priority** - this game is designed for desktop/laptop use only. The UI assumes a larger screen and does not need to be optimized for mobile devices.

### Color Scheme

The application uses a **zinc color palette** for a modern, dark theme:
- Background: `zinc-950`
- Cards: `zinc-900`
- Borders: `zinc-800`
- Text: `zinc-100` (primary), `zinc-300` (secondary), `zinc-500` (tertiary)

Avoid using:
- AI-looking gradients (purple/blue gradients)
- Bright, flashy colors
- Excessive animations

### Design Principles

1. **Semi-minimalist** - Clean, focused UI without clutter
2. **Compact** - Efficient use of space, no unnecessary padding
3. **Consistent** - Unified color scheme and component style
4. **Desktop-first** - Optimized for larger screens only

### ScrollArea Usage - CRITICAL UX Pattern

**Always use ScrollArea for content that may overflow** - This is a major UX requirement to prevent dialogs and panels from overflowing the screen height.

#### When to Use ScrollArea

Use the shadcn/ui `ScrollArea` component in these scenarios:

1. **All Dialog Components** - Wrap dialog content in ScrollArea with fixed max-height
2. **Side Panels** - Any panel with lists or multiple sections (e.g., PerksPanel)
3. **Content Lists** - Any component displaying dynamic lists that could grow
4. **Tab Content** - Content within tabs that may have variable length

#### ScrollArea Pattern

```tsx
import { ScrollArea } from '@/components/ui/scroll-area';

// In a Dialog
<DialogHeader>
  <DialogTitle>Title</DialogTitle>
  <DialogDescription>Description</DialogDescription>
</DialogHeader>

<ScrollArea className="max-h-[60vh] pr-4">
  <div className="space-y-4 py-4">
    {/* Your scrollable content here */}
  </div>
</ScrollArea>

// In a Card/Panel
<CardContent className="p-0">
  <ScrollArea className="h-[400px] px-6 py-4">
    <div className="space-y-4">
      {/* Your scrollable content here */}
    </div>
  </ScrollArea>
</CardContent>
```

#### Important Notes

- **Always set a fixed height** - Use `max-h-[60vh]` for dialogs, `h-[400px]` for panels
- **Add padding-right** - Use `pr-4` on ScrollArea to account for scrollbar
- **Keep headers outside** - DialogHeader, CardHeader should NOT be inside ScrollArea
- **Content padding** - Apply padding to the inner div, not the ScrollArea itself

This ensures users can always access all content without it overflowing the viewport.

## Game Features

- **Attributes System**: Health, Morale, Intellect, Looks
- **Career Management**: Jobs, education, salary
- **Financial System**: Bank, money management
- **Activities**: Gym, library, social events
- **Life Events**: Random events each month
- **Progression**: Age up by months with consequences

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## State Management

The game uses Jotai with localStorage persistence:
- `userAtom` - User profile data
- `statsAtom` - Character attributes
- `moneyAtom` - Financial state
- `consoleMessagesAtom` - Activity log messages

All state is automatically saved to localStorage.
