import Icon from '@/components/ui/icon';

const services = [
  {
    icon: 'Server',
    title: 'Обслуживание серверов',
    desc: 'Настройка, мониторинг и профилактика физических и облачных серверов без простоев.',
    tags: ['Linux', 'Windows', 'Cloud'],
  },
  {
    icon: 'Network',
    title: 'Сети и безопасность',
    desc: 'Проектирование сетей, VPN, межсетевые экраны и защита от внешних угроз.',
    tags: ['VPN', 'Firewall', 'Wi-Fi'],
  },
  {
    icon: 'Headset',
    title: 'Техподдержка пользователей',
    desc: 'Первая и вторая линия поддержки сотрудников по телефону, чату и на месте.',
    tags: ['Helpdesk', 'SLA', 'Выезд'],
  },
  {
    icon: 'DatabaseBackup',
    title: 'Резервное копирование',
    desc: 'Автоматические бэкапы и отработанный план восстановления данных.',
    tags: ['Backup', 'Recovery', 'DR'],
  },
  {
    icon: 'MonitorSmartphone',
    title: 'Рабочие места',
    desc: 'Обслуживание ПК, ноутбуков и оргтехники, установка ПО и обновлений.',
    tags: ['ПК', 'ПО', 'Печать'],
  },
  {
    icon: 'GaugeCircle',
    title: 'Мониторинг 24/7',
    desc: 'Круглосуточное наблюдение за инфраструктурой и оповещения об инцидентах.',
    tags: ['Alerts', 'Uptime', 'Метрики'],
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-28">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
            <span className="h-px w-8 bg-primary" /> Что мы делаем
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight">
            Полный цикл технического <span className="text-gradient">сопровождения</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Закрываем все задачи по IT — от одного рабочего места до распределённой инфраструктуры.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative rounded-3xl bg-card p-8 border border-border overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-primary/40"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/0 group-hover:bg-primary/10 blur-3xl transition-all duration-500" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 grid place-items-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Icon name={s.icon} size={26} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <Icon name="ArrowUpRight" size={22} className="text-primary" />
              </div>
              <span className="sr-only">{i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
