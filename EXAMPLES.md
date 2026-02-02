# Adding New Components

## Creating a New UI Component

1. Create a new file in `src/components/ui/` for base UI components
2. Use the `cn()` utility for className merging
3. Example:

```tsx
// src/components/ui/Input.tsx
import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
          'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed',
          'disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
```

## Creating a Feature Component

1. Create a new file in `src/components/`
2. Use Zustand for state management
3. Use i18next for translations
4. Example:

```tsx
// src/components/TodoList.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export function TodoList() {
  const { t } = useTranslation();
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a todo..."
          />
          <Button onClick={addTodo}>Add</Button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li key={index} className="p-2 bg-muted rounded-md">
              {todo}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
```

## Adding to Zustand Store

```tsx
// src/store/useAppStore.ts
interface AppState {
  // ... existing state
  todos: string[];
  addTodo: (todo: string) => void;
  removeTodo: (index: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // ... existing state
      todos: [],
      addTodo: (todo) =>
        set((state) => ({ todos: [...state.todos, todo] })),
      removeTodo: (index) =>
        set((state) => ({
          todos: state.todos.filter((_, i) => i !== index),
        })),
    }),
    { name: 'app-storage' }
  )
);
```

## Adding Translations

```tsx
// src/i18n/config.ts
const resources = {
  en: {
    translation: {
      // ... existing translations
      todo: {
        title: 'Todo List',
        add: 'Add Todo',
        placeholder: 'Enter a todo...',
      },
    },
  },
  // ... other languages
};
```

## Using MynaUI Icons

Browse icons at: https://mynaui.com/icons

```tsx
import { Heart, Star, Bookmark } from '@mynaui/icons-react';

<Heart className="h-6 w-6 text-red-500" />
<Star size={24} />
<Bookmark stroke={2} />
```

## Using React Router

```tsx
// src/main.tsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <App />
</BrowserRouter>

// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```
