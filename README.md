# React Vite Boilerplate

A modern, production-ready React boilerplate with all the essential tools and libraries you need to build scalable applications.

## 🚀 Features

- ⚡️ **Vite** - Lightning fast build tool
- ⚛️ **React 19** - Latest React with TypeScript
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎯 **MynaUI Icons** - Beautiful icon library
- 🐻 **Zustand** - Lightweight state management with persistence
- 🌍 **react-i18next** - Internationalization support (EN, AR)
- 🔀 **React Router** - Language-aware routing with /ar prefix
- 📦 **Path Aliases** - Clean imports with `@/` prefix
- 🌗 **Dark Mode** - Built-in theme switching
- 🧩 **Component Library** - Pre-built UI components
- 🔄 **Configurable Cross-Tab Sync** - Selective state synchronization with whitelist
- 🌐 **RTL Support** - Right-to-left layout for Arabic
- 🏗️ **Feature-Based Architecture** - Scalable folder structure aligned with pages

## 🗺️ Routes

### English Routes
- `/` - Home page
- `/login` - Login page

### Arabic Routes (with RTL)
- `/ar` - Home page (Arabic)
- `/ar/login` - Login page (Arabic)

Language switcher automatically navigates to the correct route.

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/         # Shared UI components
│   └── ui/            # Base UI components (Button, Card, etc.)
├── features/          # Feature-based modules (aligned with pages)
│   ├── common/        # Shared features across pages
│   │   ├── language/  # Language switcher
│   │   └── theme/     # Theme toggle
│   ├── home/          # Home page features
│   │   └── Counter.tsx
│   └── login/         # Login page features (ready for expansion)
├── layouts/           # Layout components
│   └── Layout.tsx     # Main app layout with header/footer
├── pages/             # Route pages
│   ├── Home.tsx       # Home page
│   └── Login.tsx      # Login page
├── store/             # Zustand stores
│   └── useAppStore.ts # Global state with configurable sync
├── i18n/              # Internationalization
│   ├── config.ts      # i18next configuration
│   └── locales/       # Translation files (in public/locales)
├── lib/               # Utility functions
│   └── utils.ts       # cn() and other utilities
├── App.tsx            # Router setup with language sync
└── main.tsx           # App entry point
```

### Feature-Based Architecture

The project follows a scalable feature-based structure:
- **features/common/** - Shared features like theme and language
- **features/[page]/** - Page-specific features aligned with pages/
- This structure scales well as the app grows

## 🎨 Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS** for styling
- **MynaUI Icons** for icons
- **Zustand** for state management (with persistence)
- **react-i18next** for i18n
- **React Router DOM** for routing
- **clsx** & **tailwind-merge** for className utilities

## 🧩 Components

The boilerplate includes pre-built components organized by type:

### UI Components (`components/ui/`)
- `Button` - Customizable button with variants (default, outline, ghost)
- `Card` - Card component with header, content, and footer sections

### Feature Components
- **Common Features** (`features/common/`)
  - `LanguageSwitcher` - Switch between languages with route navigation
  - `ThemeToggle` - Toggle between light and dark modes
- **Home Features** (`features/home/`)
  - `Counter` - Example component with Zustand integration

### Layouts (`layouts/`)
- `Layout` - Main app layout with header, footer, and RTL support

All components are fully typed with TypeScript and styled with Tailwind CSS.

## 🌍 Internationalization

Languages supported:
- **English (en)** - Default language
- **Arabic (ar)** - With RTL support

Translation files are located in `public/locales/{lang}/translation.json`.

The app automatically:
- Switches to RTL layout when Arabic is selected
- Updates routes with `/ar` prefix for Arabic
- Syncs language preference across browser tabs
- Persists language selection

Add more languages by:
1. Creating a new folder in `public/locales/`
2. Adding translations to `translation.json`
3. Updating language options in `LanguageSwitcher.tsx`

## 🐻 State Management

Using Zustand with localStorage persistence and configurable cross-tab synchronization:

```typescript
import { useAppStore } from '@/store/useAppStore';

function MyComponent() {
  const { count, increment } = useAppStore();
  
  return <button onClick={increment}>Count: {count}</button>;
}
```

### Cross-Tab Sync Configuration

Only whitelisted state keys sync across tabs to prevent performance issues:

```typescript
// In src/store/useAppStore.ts
const SYNC_WHITELIST: (keyof AppState)[] = ['theme', 'language'];
```

**What syncs:** User preferences (theme, language)  
**What doesn't sync:** Frequently changing data (count, large objects)

Benefits:
- ✅ Performance-optimized with selective sync
- ✅ Prevents circular update loops
- ✅ Easy to configure via whitelist
- ✅ All state persists in localStorage

See [CROSS_TAB_SYNC.md](CROSS_TAB_SYNC.md) for detailed documentation.

## 🎨 Styling

Using Tailwind CSS with custom design tokens:

```tsx
<div className="bg-background text-foreground">
  <Button variant="default" size="lg">Click me</Button>
</div>
```

Dark mode is implemented using CSS variables that automatically switch based on the `theme` state.

## 📚 Documentation

- [GETTING_STARTED.md](GETTING_STARTED.md) - Detailed setup and usage guide
- [CONFIGURATION.md](CONFIGURATION.md) - Configuration options
- [EXAMPLES.md](EXAMPLES.md) - Code examples and patterns
- [CROSS_TAB_SYNC.md](CROSS_TAB_SYNC.md) - Cross-tab synchronization guide

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 🔗 Repository

[https://github.com/ygg-ahammed/shadcn-react-boilerplate](https://github.com/ygg-ahammed/shadcn-react-boilerplate)

---

Built with ❤️ using React, Vite, and modern web technologies
