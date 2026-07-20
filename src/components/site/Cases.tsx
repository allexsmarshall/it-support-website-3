import Icon from '@/components/ui/icon';

const cases = [
  {
    industry: 'Ритейл',
    title: 'Сеть магазинов, 24 точки',
    task: 'Постоянные сбои касс и медленный интернет между филиалами.',
    result: 'Обновили сеть и подключили мониторинг — простои сократились на 92%.',
    metrics: [
      { value: '92%', label: 'меньше простоев' },
      { value: '24', label: 'точки под контролем' },
    ],
    icon: 'ShoppingBag',
  },
  {
    industry: 'Производство',
    title: 'Завод металлоконструкций',
    task: 'Не было резервного копирования, риск потери данных 1С.',
    result: 'Развернули бэкапы и план восстановления — данные защищены на 100%.',
    metrics: [
      { value: '100%', label: 'сохранность данных' },
      { value: '15 мин', label: 'восстановление' },
    ],
    icon: 'Factory',
  },
  {
    industry: 'Финансы',
    title: 'Бухгалтерская компания',
    task: 'Сотрудники теряли время на IT-проблемы, не было поддержки.',
    result: 'Подключили helpdesk с реакцией 15 минут — производительность выросла.',
    metrics: [
      { value: '15 мин', label: 'реакция' },
      { value: '+30%', label: 'к скорости работы' },
    ],
    icon: 'Landmark',
  },
];

const Cases = () => {
  return (
    <section id="cases" className="relative py-28 grid-bg">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-accent mb-4">
            <span className="h-px w-8 bg-accent" /> Кейсы
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight">
            Результаты, а не <span className="text-gradient">обещания</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Реальные проекты, где мы взяли IT под контроль и решили проблемы бизнеса.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div
              key={c.title}
              className="group rounded-3xl bg-card border border-border p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-accent/40"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                  {c.industry}
                </span>
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 grid place-items-center group-hover:scale-110 transition-transform">
                  <Icon name={c.icon} size={20} className="text-accent" />
                </div>
              </div>

              <h3 className="font-display font-semibold text-xl mb-4">{c.title}</h3>

              <div className="space-y-3 mb-6 flex-1">
                <div className="flex gap-2.5 text-sm">
                  <Icon name="CircleDot" size={16} className="text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{c.task}</span>
                </div>
                <div className="flex gap-2.5 text-sm">
                  <Icon name="Sparkles" size={16} className="text-accent shrink-0 mt-0.5" />
                  <span>{c.result}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-display font-bold text-2xl text-gradient">{m.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
