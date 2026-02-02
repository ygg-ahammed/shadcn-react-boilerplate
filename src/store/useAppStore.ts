import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppState {
  count: number;
  theme: 'light' | 'dark';
  language: string;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  toggleTheme: () => void;
  setLanguage: (lang: string) => void;
}

// Configure which state keys should sync across tabs
// Add keys here to enable cross-tab sync for specific states
const SYNC_WHITELIST: (keyof AppState)[] = ['theme', 'language', 'count'];

// Custom storage with cross-tab sync
const storage = createJSONStorage(() => localStorage);

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      count: 0,
      theme: 'light',
      language: 'en',
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setLanguage: (lang: string) => set({ language: lang }),
    }),
    {
      name: 'app-storage',
      storage,
    }
  )
);

// Cross-tab synchronization - only syncs whitelisted keys
if (typeof window !== 'undefined') {
  let isSyncing = false; // Prevent circular updates
  
  window.addEventListener('storage', (e) => {
    if (e.key === 'app-storage' && e.newValue && !isSyncing) {
      try {
        const newState = JSON.parse(e.newValue);
        const currentState = useAppStore.getState();
        
        // Only sync whitelisted keys to avoid performance issues with large data
        const syncedState: Partial<AppState> = {};
        SYNC_WHITELIST.forEach((key) => {
          if (key in newState.state && newState.state[key] !== currentState[key]) {
            syncedState[key] = newState.state[key];
          }
        });
        
        // Only update if there are changes to sync
        if (Object.keys(syncedState).length > 0) {
          isSyncing = true;
          useAppStore.setState(syncedState);
          // Reset flag after state update completes
          setTimeout(() => {
            isSyncing = false;
          }, 0);
        }
      } catch (error) {
        console.error('Failed to sync state across tabs:', error);
        isSyncing = false;
      }
    }
  });
}
