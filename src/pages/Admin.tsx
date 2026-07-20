import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const ADMIN_AUTH_URL = 'https://functions.poehali.dev/e74f4a08-4f6a-49c6-9690-63a72236cbfb';
const ADMIN_ORDERS_URL = 'https://functions.poehali.dev/d303913a-35e0-4cf9-976e-207035627006';

interface Order {
  id: number;
  name: string;
  phone: string;
  company: string;
  services: string;
  message: string;
  status: 'new' | 'in_progress' | 'closed';
  created_at: string;
}

const STATUS_LABELS: Record<Order['status'], string> = {
  new: 'Новая',
  in_progress: 'В работе',
  closed: 'Закрыта',
};

const STATUS_COLORS: Record<Order['status'], string> = {
  new: 'bg-primary/15 text-primary border-primary/30',
  in_progress: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
  closed: 'bg-muted text-muted-foreground border-border',
};

const TOKEN_KEY = 'admin_session_token';

const LoginForm = ({ onSuccess }: { onSuccess: (token: string) => void }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(ADMIN_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Ошибка входа');
        return;
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      onSuccess(data.token);
    } catch {
      setError('Не удалось подключиться к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <Card className="w-full max-w-sm p-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary grid place-items-center mb-6">
          <Icon name="Lock" size={22} className="text-white" />
        </div>
        <h1 className="font-display font-bold text-2xl mb-1">Вход в админку</h1>
        <p className="text-sm text-muted-foreground mb-6">Введите пароль администратора</p>
        <form onSubmit={submit} className="space-y-4">
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Проверка...' : 'Войти'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

const OrdersPanel = ({ token, onLogout }: { token: string; onLogout: () => void }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | Order['status']>('all');
  const { toast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(ADMIN_ORDERS_URL, {
        headers: { 'X-Authorization': `Bearer ${token}` },
      });
      if (res.status === 401) {
        onLogout();
        return;
      }
      const data = await res.json();
      setOrders(data.orders || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (id: number, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    const res = await fetch(ADMIN_ORDERS_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Authorization': `Bearer ${token}` },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      toast({ title: 'Не удалось обновить статус', variant: 'destructive' });
      load();
    }
  };

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  const counts = {
    all: orders.length,
    new: orders.filter((o) => o.status === 'new').length,
    in_progress: orders.filter((o) => o.status === 'in_progress').length,
    closed: orders.filter((o) => o.status === 'closed').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container flex items-center justify-between py-5">
          <h1 className="font-display font-bold text-xl">Заявки</h1>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <Icon name="LogOut" size={16} className="mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'new', 'in_progress', 'closed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                filter === f ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {f === 'all' ? 'Все' : STATUS_LABELS[f]} ({counts[f]})
            </button>
          ))}
          <Button variant="outline" size="sm" onClick={load} className="ml-auto">
            <Icon name="RefreshCw" size={14} className="mr-2" />
            Обновить
          </Button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Загрузка...</p>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground">Заявок пока нет</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((o) => (
              <Card key={o.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="font-semibold">{o.name}</span>
                      <Badge variant="outline" className={STATUS_COLORS[o.status]}>
                        {STATUS_LABELS[o.status]}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{o.created_at}</span>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-0.5">
                      <div>
                        <a href={`tel:${o.phone}`} className="hover:text-primary">{o.phone}</a>
                        {o.company && <span> · {o.company}</span>}
                      </div>
                      {o.services && <div>Услуги: {o.services}</div>}
                      {o.message && <div>Задача: {o.message}</div>}
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0">
                    {(['new', 'in_progress', 'closed'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(o.id, s)}
                        disabled={o.status === s}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors disabled:opacity-40 disabled:cursor-default ${
                          o.status === s ? STATUS_COLORS[s] : 'border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const Admin = () => {
  const [token, setToken] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (!stored) {
      setChecked(true);
      return;
    }
    fetch(ADMIN_AUTH_URL, { headers: { 'X-Authorization': `Bearer ${stored}` } })
      .then((res) => {
        if (res.ok) setToken(stored);
        else localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setChecked(true));
  }, []);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  if (!checked) return null;

  return token ? (
    <OrdersPanel token={token} onLogout={logout} />
  ) : (
    <LoginForm onSuccess={setToken} />
  );
};

export default Admin;