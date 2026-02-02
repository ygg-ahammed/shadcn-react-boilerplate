import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { LanguageSwitcher } from '@/features/common/language/LanguageSwitcher';
import { ThemeToggle } from '@/features/common/theme/ThemeToggle';
import { Lightning } from '@mynaui/icons-react';
import { useEffect } from 'react';

export function Layout() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Lightning className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">React Boilerplate</h1>
          </div>
          <div className="flex gap-4 items-center">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          {t('builtWith')}
        </div>
      </footer>
    </div>
  );
}
