import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '24/7', label: 'Мониторинг' },
  { value: '<15 мин', label: 'Реакция' },
  { value: '350+', label: 'Клиентов' },
  { value: '99.9%', label: 'Uptime' },
];

const Hero = () => {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden grid-bg pt-28 pb-16">
      <div className="absolute top-1/4 -left-40 w-[32rem] h-[32rem] rounded-full bg-primary/25 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-0 right-0 w-[34rem] h-[34rem] rounded-full bg-secondary/25 blur-[130px] animate-glow-pulse" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-7 text-sm animate-fade-in"
            style={{ opacity: 0 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-muted-foreground">Дежурная команда на связи прямо сейчас</span>
          </div>

          <h1
            className="font-display font-bold text-5xl md:text-7xl leading-[1.02] tracking-tight animate-fade-in"
            style={{ opacity: 0, animationDelay: '0.1s' }}
          >
            Ваша IT-инфраструктура
            <br />
            <span className="text-gradient-anim">под надёжной защитой</span>
          </h1>

          <p
            className="mt-6 text-lg text-muted-foreground max-w-lg animate-fade-in"
            style={{ opacity: 0, animationDelay: '0.2s' }}
          >
            Техническое сопровождение серверов, сетей и рабочих мест. Берём рутину на себя — вы занимаетесь бизнесом.
          </p>

          <div
            className="mt-9 flex flex-wrap gap-4 animate-fade-in"
            style={{ opacity: 0, animationDelay: '0.3s' }}
          >
            <Button
              size="lg"
              onClick={() => go('#order')}
              className="rounded-full font-semibold h-13 px-8 text-base bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 hover-scale"
            >
              Заказать сопровождение
              <Icon name="ArrowRight" size={18} className="ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => go('#services')}
              className="rounded-full font-semibold h-13 px-8 text-base border-border bg-transparent hover:bg-muted"
            >
              Смотреть услуги
            </Button>
          </div>

          <div
            className="mt-12 grid grid-cols-4 gap-4 max-w-lg animate-fade-in"
            style={{ opacity: 0, animationDelay: '0.4s' }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display font-bold text-2xl md:text-3xl text-gradient">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-scale-in" style={{ opacity: 0, animationDelay: '0.25s' }}>
          <div className="relative rounded-3xl overflow-hidden glow-border animate-float">
            <img
              src="https://cdn.poehali.dev/projects/5490d9bf-6a6c-4be2-beeb-8a80c9925cd2/files/f7c1bfe6-72ca-4435-8977-9819772cee85.jpg"
              alt="IT инфраструктура"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          <div className="absolute -left-6 top-10 glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-9 h-9 rounded-xl bg-accent/20 grid place-items-center">
              <Icon name="ShieldCheck" size={18} className="text-accent" />
            </div>
            <div>
              <div className="text-sm font-semibold">Всё под контролем</div>
              <div className="text-xs text-muted-foreground">0 инцидентов сегодня</div>
            </div>
          </div>

          <div className="absolute -right-4 bottom-14 glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl animate-float" style={{ animationDelay: '2.2s' }}>
            <div className="w-9 h-9 rounded-xl bg-secondary/20 grid place-items-center">
              <Icon name="Activity" size={18} className="text-secondary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Нагрузка 24%</div>
              <div className="text-xs text-muted-foreground">все системы в норме</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
