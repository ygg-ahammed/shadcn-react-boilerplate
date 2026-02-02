import { useTranslation } from 'react-i18next';
import { Counter } from '@/features/home/Counter';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const prefix = i18n.language === 'ar' ? '/ar' : '';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{t('welcome')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('techStack')}</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>React 19 with TypeScript</li>
                <li>Vite for build tooling</li>
                <li>Tailwind CSS for styling</li>
                <li>MynaUI Icons for beautiful icons</li>
                <li>Zustand for state management</li>
                <li>react-i18next for internationalization</li>
                <li>React Router for navigation</li>
              </ul>
            </div>
            <div>
              <Button onClick={() => navigate(`${prefix}/login`)}>
                {t('goToLogin')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Counter />

      <Card>
        <CardHeader>
          <CardTitle>{t('gettingStarted')}</CardTitle>
          <CardDescription>
            {t('startBuilding')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">{t('projectStructure')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><code className="bg-muted px-1 py-0.5 rounded">/src/components</code> - Reusable components</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">/src/pages</code> - Page components</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">/src/store</code> - Zustand stores</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">/src/i18n</code> - Internationalization config</li>
                <li><code className="bg-muted px-1 py-0.5 rounded">/src/lib</code> - Utility functions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
