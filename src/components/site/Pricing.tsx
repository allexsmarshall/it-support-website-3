import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Старт',
    price: '19 900',
    tagline: 'Для небольших офисов',
    features: [
      'До 10 рабочих мест',
      'Техподдержка в рабочее время',
      'Реакция до 2 часов',
      'Обновление ПО и антивирус',
      'Ежемесячный отчёт',
    ],
    featured: false,
  },
  {
    name: 'Бизнес',
    price: '44 900',
    tagline: 'Оптимально для компаний',
    features: [
      'До 40 рабочих мест',
      'Поддержка серверов и сети',
      'Реакция до 30 минут',
      'Мониторинг 24/7',
      'Резервное копирование',
      'Выделенный инженер',
    ],
    featured: true,
  },
  {
    name: 'Энтерпрайз',
    price: 'от 89 900',
    tagline: 'Для распределённой сети',
    features: [
      'Без ограничений по местам',
      'Полное сопровождение 24/7',
      'Реакция до 15 минут',
      'Персональный SLA',
      'Информационная безопасность',
      'План аварийного восстановления',
    ],
    featured: false,
  },
];

const Pricing = () => {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" className="relative py-28 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] rounded-full bg-primary/10 blur-[130px]" />
      <div className="container relative">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-secondary mb-4">
            <span className="h-px w-8 bg-secondary" /> Тарифы
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight">
            Прозрачные пакеты <span className="text-gradient">сопровождения</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Фиксированная цена в месяц без скрытых доплат. Начнём с бесплатного аудита.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                p.featured
                  ? 'glass glow-border shadow-2xl shadow-primary/20 md:-translate-y-4'
                  : 'bg-card border border-border'
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
                  Популярный
                </span>
              )}
              <div className="mb-6">
                <h3 className="font-display font-semibold text-xl">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>
              </div>
              <div className="mb-7">
                <span className="font-display font-bold text-4xl">{p.price}</span>
                <span className="text-muted-foreground text-sm"> ₽ / мес</span>
              </div>
              <ul className="space-y-3.5 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={`w-5 h-5 shrink-0 rounded-full grid place-items-center mt-0.5 ${
                        p.featured ? 'bg-primary/20' : 'bg-muted'
                      }`}
                    >
                      <Icon name="Check" size={12} className="text-primary" />
                    </span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => go('#order')}
                className={`w-full h-12 rounded-xl font-semibold ${
                  p.featured
                    ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25'
                    : 'bg-muted hover:bg-muted/70 text-foreground'
                }`}
              >
                Выбрать тариф
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
