# Configuration Guide

## Tailwind CSS Customization

### Adding Custom Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      brand: {
        50: '#f0f9ff',
        500: '#0ea5e9',
        900: '#0c4a6e',
      },
    },
  },
}
```

### Adding Custom Fonts

1. Add font to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

2. Update `tailwind.config.js`:
```js
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
}
```

## Environment Variables

Create `.env` file in project root:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=My App
```

Access in code:

```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## VS Code Settings

Recommended `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## Path Aliases

Already configured with `@/` prefix:

```tsx
// Instead of: import { Button } from '../../components/ui/Button';
import { Button } from '@/components/ui/Button';
```

Add more aliases in `vite.config.ts` and `tsconfig.app.json`:

```ts
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@components': path.resolve(__dirname, './src/components'),
    '@utils': path.resolve(__dirname, './src/lib/utils'),
  },
}

// tsconfig.app.json
"paths": {
  "@/*": ["./src/*"],
  "@components/*": ["./src/components/*"],
  "@utils/*": ["./src/lib/utils/*"]
}
```

## Zustand Devtools

Install Redux DevTools Extension, then update store:

```tsx
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // ... your state
      }),
      { name: 'app-storage' }
    ),
    { name: 'AppStore' }
  )
);
```

## ESLint Configuration

The project uses ESLint v9 with flat config. Customize in `eslint.config.js`:

```js
export default defineConfig([
  // ... existing config
  {
    rules: {
      'no-console': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
```

## Adding More UI Components

### Option 1: shadcn/ui (CLI)
```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
```

### Option 2: Manual
Create components following the pattern in `src/components/ui/`

## API Integration

Create an API utility:

```tsx
// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) throw new Error('API Error');
  return response.json();
}

// Usage
import { fetchData } from '@/lib/api';

const data = await fetchData<User[]>('/users');
```

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Build output is in `dist/` directory
```

## Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
```

## Performance Optimization

### Code Splitting
```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>
```

### Bundle Analysis
```bash
npm install --save-dev rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),
  ],
});
```
