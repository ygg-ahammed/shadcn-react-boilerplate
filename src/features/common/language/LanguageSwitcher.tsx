import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { Globe } from '@mynaui/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const setLanguage = useAppStore((state) => state.setLanguage);
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
  ];

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);

    // Navigate to the correct language route
    const currentPath = location.pathname;
    
    if (lang === 'ar') {
      // Switch to Arabic route
      if (currentPath.startsWith('/ar')) {
        // Already on Arabic route
        return;
      } else {
        // Add /ar prefix
        navigate(`/ar${currentPath === '/' ? '' : currentPath}`);
      }
    } else {
      // Switch to English route
      if (currentPath.startsWith('/ar')) {
        // Remove /ar prefix
        const newPath = currentPath.replace(/^\/ar/, '') || '/';
        navigate(newPath);
      }
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Globe className="h-5 w-5 text-muted-foreground" />
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          variant={i18n.language === lang.code ? 'default' : 'outline'}
          size="sm"
        >
          {lang.name}
        </Button>
      ))}
    </div>
  );
}
