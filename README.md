# React Vite Boilerplate

A modern, production-ready React boilerplate with all the essential tools and libraries you need to build scalable applications.

## 🚀 Features

- ⚡️ **Vite** - Lightning fast build tool
- ⚛️ **React 19** - Latest React with TypeScript
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎯 **MynaUI Icons** - Beautiful icon library
- 🐻 **Zustand** - Lightweight state management (with persistence)
- 🌍 **react-i18next** - Internationalization support (EN, AR)
- 🔀 **React Router** - Language-aware routing with /ar prefix
- 📦 **Path Aliases** - Clean imports with `@/` prefix
- 🌗 **Dark Mode** - Built-in theme switching
- 🧩 **Component Library** - Pre-built UI components
- 🔄 **Cross-Tab Sync** - State synchronized across multiple tabs
- 🌐 **RTL Support** - Right-to-left layout for Arabic

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
├── components/         # Reusable components
│   ├── ui/            # Base UI components (Button, Card, etc.)
│   ├── Counter.tsx    # Example counter component
│   ├── LanguageSwitcher.tsx # Language switcher with routing
│   ├── Layout.tsx     # App layout
│   └── ThemeToggle.tsx
├── pages/             # Page components
│   ├── Home.tsx       # Home page
│   └── Login.tsx      # Login page
├── store/             # Zustand stores
│   └── useAppStore.ts
├── i18n/              # Internationalization
│   └── config.ts
├── lib/               # Utility functions
│   └── utils.ts
├── App.tsx            # Router setup
└── main.tsx           # App entry point
```

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

The boilerplate includes pre-built UI components:

- `Button` - Customizable button with variants
- `Card` - Card component with header, content, and footer
- `Counter` - Example component with Zustand integration
- `LanguageSwitcher` - Switch between languages
- `ThemeToggle` - Toggle between light and dark modes

## 🌍 Internationalization

Languages supported:
- English (en)
- Arabic (ar) with RTL support

The app automatically switches to RTL layout when Arabic is selected. State is synchronized across multiple browser tabs.

Add more languages in `src/i18n/config.ts`

## 🐻 State Management

Using Zustand with persistence and cross-tab synchronization:

```typescript
import { useAppStore } from '@/store/useAppStore';

function MyComponent() {
  const { count, increment } = useAppStore();
  
  return <button onClick={increment}>Count: {count}</button>;
}
```

State changes are automatically synced across all open tabs in real-time.

## 🎨 Styling

Using Tailwind CSS with custom design tokens:

```tsx
<div className="bg-background text-foreground">
  <Button variant="default" size="lg">Click me</Button>
</div>
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ using React, Vite, and modern web technologies
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
