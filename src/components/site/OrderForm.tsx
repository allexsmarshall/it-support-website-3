import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const servicesList = ['Серверы', 'Сети', 'Техподдержка', 'Бэкапы', 'Рабочие места', 'Мониторинг'];

const OrderForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', company: '', message: '' });
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = 'Укажите имя';
    if (!/^[+\d][\d\s()-]{9,}$/.test(form.phone.trim())) e.phone = 'Некорректный телефон';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
    toast({ title: 'Заявка отправлена!', description: 'Свяжемся с вами в течение 15 минут.' });
  };

  return (
    <section id="order" className="relative py-28 overflow-hidden grid-bg">
      <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] rounded-full bg-primary/20 blur-[130px] animate-glow-pulse" />
      <div className="container relative">
        <div className="max-w-4xl mx-auto rounded-[2rem] glass p-8 md:p-12 glow-border">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-accent mb-4">
                <span className="h-px w-8 bg-accent" /> Заявка
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl tracking-tight leading-tight">
                Закажите техническое сопровождение
              </h2>
              <p className="mt-5 text-muted-foreground">
                Оставьте контакты — инженер свяжется с вами, задаст пару вопросов и предложит план обслуживания.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: 'Clock', t: 'Ответ за 15 минут в рабочее время' },
                  { icon: 'FileText', t: 'Бесплатный аудит инфраструктуры' },
                  { icon: 'BadgeCheck', t: 'Договор и SLA с фиксированной ценой' },
                ].map((b) => (
                  <div key={b.t} className="flex items-center gap-3 text-sm">
                    <Icon name={b.icon} size={18} className="text-accent shrink-0" />
                    <span className="text-muted-foreground">{b.t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {sent ? (
                <div className="h-full min-h-[20rem] flex flex-col items-center justify-center text-center animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-accent/20 grid place-items-center mb-5">
                    <Icon name="Check" size={32} className="text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl">Спасибо, {form.name}!</h3>
                  <p className="text-muted-foreground mt-2 max-w-xs">
                    Заявка принята. Наш инженер перезвонит вам в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4" noValidate>
                  <div>
                    <Input
                      placeholder="Ваше имя"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-12 bg-background/60 border-border rounded-xl"
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1.5 ml-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Input
                      placeholder="Телефон"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="h-12 bg-background/60 border-border rounded-xl"
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1.5 ml-1">{errors.phone}</p>}
                  </div>
                  <Input
                    placeholder="Компания (необязательно)"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="h-12 bg-background/60 border-border rounded-xl"
                  />

                  <div>
                    <p className="text-sm text-muted-foreground mb-2.5">Что нужно обслуживать?</p>
                    <div className="flex flex-wrap gap-2">
                      {servicesList.map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => toggle(s)}
                          className={`text-xs font-medium px-3.5 py-2 rounded-full border transition-all ${
                            picked.includes(s)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'bg-transparent border-border text-muted-foreground hover:border-primary/50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    placeholder="Кратко опишите задачу"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bg-background/60 border-border rounded-xl min-h-[90px] resize-none"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 rounded-xl font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                  >
                    Отправить заявку
                    <Icon name="Send" size={16} className="ml-1.5" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
