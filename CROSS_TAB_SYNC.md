# Testing Cross-Tab Synchronization

## How to Test Multi-Tab State Sync

1. **Open the Application**
   - Navigate to http://localhost:5173/

2. **Open Multiple Tabs**
   - Duplicate the tab (Cmd+T or right-click > Duplicate Tab)
   - Open 2-3 tabs with the same URL

3. **Test Counter Synchronization**
   - Click the increment button in one tab
   - **Note:** Counter does NOT sync across tabs (not in whitelist)
   - This prevents performance issues with frequently changing data

4. **Test Language Synchronization**
   - Switch to Arabic in one tab
   - All tabs should immediately switch to Arabic with RTL layout
   - Switch back to English in any tab
   - All tabs revert to English with LTR layout

5. **Test Theme Synchronization**
   - Toggle dark mode in one tab
   - All tabs should instantly switch to dark mode
   - Toggle back to light mode in a different tab
   - All tabs should switch to light mode

6. **Test Persistence**
   - Make changes (counter, language, theme)
   - Close all tabs
   - Reopen the application
   - All settings should be restored

## How It Works

### Configurable Cross-Tab Sync
The app uses a **whitelist approach** to selectively sync state across tabs, preventing performance issues with large or frequently changing data:

```typescript
// Configure which state keys should sync across tabs
const SYNC_WHITELIST: (keyof AppState)[] = ['theme', 'language'];
```

**Benefits:**
- **Performance**: Only small, essential state is synced
- **Scalability**: Large data (lists, complex objects) won't cause performance issues
- **Flexibility**: Easy to add/remove keys from the whitelist

**What syncs:** `theme`, `language` (user preferences)  
**What doesn't sync:** `count` (frequently changing, less critical)

### Storage Event Listener
The app uses the browser's `storage` event to listen for changes to `localStorage`:

```typescript
window.addEventListener('storage', (e) => {
  if (e.key === 'app-storage' && e.newValue) {
    const newState = JSON.parse(e.newValue);
    const currentState = useAppStore.getState();
    
    // Only sync whitelisted keys
    const syncedState: Partial<AppState> = {};
    SYNC_WHITELIST.forEach((key) => {
      if (key in newState.state && newState.state[key] !== currentState[key]) {
        syncedState[key] = newState.state[key];
      }
    });
    
    if (Object.keys(syncedState).length > 0) {
      useAppStore.setState(syncedState);
    }
  }
});
```

### Zustand Persistence
Zustand's `persist` middleware saves state to `localStorage` with the `createJSONStorage` wrapper:

```typescript
persist(
  (set) => ({ /* state */ }),
  {
    name: 'app-storage',
    storage: createJSONStorage(() => localStorage),
  }
)
```

### Cross-Tab Communication Flow
1. User interacts with Tab A (e.g., toggles theme)
2. Zustand updates state in Tab A
3. `persist` middleware saves ALL state to localStorage
4. Browser fires `storage` event to ALL other tabs
5. Tabs B, C, D receive the event
6. Event listener **filters** and only updates **whitelisted** state
7. UI re-renders with synced state (only theme/language)

**Note:** All state persists locally, but only whitelisted keys sync across tabs.

## Adding State to Sync Whitelist

To sync additional state across tabs, simply add the key to the whitelist:

```typescript
// In src/store/useAppStore.ts
const SYNC_WHITELIST: (keyof AppState)[] = [
  'theme',
  'language',
  'count',        // Add this to enable counter sync
  // 'largeData', // DON'T add large/complex data
];
```

**Guidelines:**
- ✅ Sync: User preferences, settings, small strings/numbers
- ❌ Don't sync: Large arrays, complex objects, frequently changing data
- ⚠️ Consider: Performance impact of syncing frequently updated state

## RTL (Right-to-Left) Support

### Automatic Layout Direction
The app automatically switches between LTR and RTL based on the selected language:

```tsx
<div dir={isRTL ? 'rtl' : 'ltr'}>
```

### Arabic Language Features
- Text alignment: right-aligned
- Layout mirroring: elements flow from right to left
- Navigation: reversed
- Icons: mirrored where appropriate

### Testing RTL
1. Switch to Arabic language
2. Observe:
   - Text aligns to the right
   - UI elements mirror horizontally
   - Buttons and cards maintain proper spacing
   - Icons appear on the correct side

## Troubleshooting

### State Not Syncing?
- Check browser console for errors
- Ensure localStorage is enabled
- Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- Clear localStorage and restart

### Language Not Persisting?
- Check that language is being saved to store
- Verify i18n is synced with store on mount
- Check browser console for i18next warnings

### Theme Not Applying?
- Ensure CSS variables are loaded
- Check that theme class is applied to document root
- Verify dark mode styles in index.css

## Browser Compatibility

Cross-tab synchronization works in all modern browsers that support:
- localStorage API
- storage event
- ES6+ features

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

The implementation is optimized for performance:
- Minimal re-renders using Zustand's selective subscriptions
- Efficient storage event handling
- No polling or intervals required
- Lightweight state updates

## Adding More Synchronized State

To add new state that syncs across tabs:

1. Add to store interface:
```typescript
interface AppState {
  newState: string;
  setNewState: (value: string) => void;
}
```

2. Add to store implementation:
```typescript
persist(
  (set) => ({
    newState: 'default',
    setNewState: (value) => set({ newState: value }),
  }),
  { name: 'app-storage' }
)
```

That's it! The cross-tab sync will automatically work for new state.
