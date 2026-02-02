import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from '@/layouts/Layout';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

function RouteLanguageSync() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const setLanguage = useAppStore((state) => state.setLanguage);

  useEffect(() => {
    // Detect language from URL
    const isArabicRoute = location.pathname.startsWith('/ar');
    const targetLang = isArabicRoute ? 'ar' : 'en';
    
    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
    if (targetLang !== useAppStore.getState().language) {
      setLanguage(targetLang);
    }
  }, [location.pathname, i18n, setLanguage]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RouteLanguageSync />
      <Routes>
        {/* English routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Arabic routes */}
        <Route element={<Layout />}>
          <Route path="/ar" element={<Home />} />
          <Route path="/ar/login" element={<Login />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
