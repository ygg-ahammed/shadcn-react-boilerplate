import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  Minus,
  Plus,
  Refresh,
} from '@mynaui/icons-react';

export function Counter() {
  const { t } = useTranslation();
  const { count, increment, decrement, reset } = useAppStore();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t('counter')}</CardTitle>
        <CardDescription>
          {t('exampleZustand')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-6xl font-bold text-primary">{count}</p>
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={decrement} variant="outline" size="icon">
            <Minus />
          </Button>
          <Button onClick={reset} variant="secondary">
            <Refresh className="mr-2 h-4 w-4" />
            {t('reset')}
          </Button>
          <Button onClick={increment} size="icon">
            <Plus />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
