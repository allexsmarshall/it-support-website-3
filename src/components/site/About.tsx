import Icon from '@/components/ui/icon';

const advantages = [
  { icon: 'Timer', title: 'Реакция за 15 минут', desc: 'Фиксируем срок реакции в SLA и соблюдаем его.' },
  { icon: 'Users', title: 'Выделенный инженер', desc: 'За вами закреплён специалист, знающий вашу инфраструктуру.' },
  { icon: 'Lock', title: 'Прозрачность', desc: 'Ежемесячные отчёты по всем работам и инцидентам.' },
  { icon: 'TrendingUp', title: 'Рост без боли', desc: 'Масштабируем IT вместе с вашим бизнесом.' },
];

const steps = [
  { n: '01', title: 'Аудит', desc: 'Изучаем инфраструктуру и находим слабые места.' },
  { n: '02', title: 'План', desc: 'Составляем регламент обслуживания и SLA.' },
  { n: '03', title: 'Внедрение', desc: 'Подключаем мониторинг и берём поддержку на себя.' },
  { n: '04', title: 'Сопровождение', desc: 'Держим системы в строю и развиваем их.' },
];

const About = () => {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-secondary/10 blur-[140px]" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-secondary mb-4">
              <span className="h-px w-8 bg-secondary" /> О компании
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-tight">
              Мы — ваш IT-отдел на аутсорсе
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Servis911 с 2014 года обслуживает инфраструктуру компаний по всей стране. Команда сертифицированных
              инженеров берёт на себя всё: от техподдержки сотрудников до администрирования серверов и сетей.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {advantages.map((a) => (
                <div key={a.title} className="flex gap-4 group">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-muted grid place-items-center group-hover:bg-primary/15 transition-colors">
                    <Icon name={a.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{a.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass rounded-3xl p-8">
              <h3 className="font-display font-semibold text-xl mb-8">Как мы начинаем работу</h3>
              <div className="space-y-6">
                {steps.map((st, i) => (
                  <div key={st.n} className="flex gap-5 relative">
                    {i < steps.length - 1 && (
                      <span className="absolute left-[1.35rem] top-12 bottom-[-1.5rem] w-px bg-border" />
                    )}
                    <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary grid place-items-center font-display font-bold text-sm text-white shadow-lg shadow-primary/30">
                      {st.n}
                    </div>
                    <div className="pt-1.5">
                      <div className="font-semibold">{st.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{st.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;