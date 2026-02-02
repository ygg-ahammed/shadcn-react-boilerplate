import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { Moon, Sun } from '@mynaui/icons-react';

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useAppStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <Button onClick={toggleTheme} variant="outline" size="icon">
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">{t('theme')}</span>
    </Button>
  );
}
