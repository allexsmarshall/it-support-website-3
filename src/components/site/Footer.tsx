import Icon from '@/components/ui/icon';

const Footer = () => {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="border-t border-border py-14">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center">
                <Icon name="Hexagon" size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl">
                Servis<span className="text-primary">911</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Техническое сопровождение IT-инфраструктуры для бизнеса. На связи 24/7.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <div className="font-semibold mb-4 text-sm">Разделы</div>
              <div className="flex flex-col gap-2.5">
                {[
                  { l: 'Услуги', h: '#services' },
                  { l: 'О компании', h: '#about' },
                  { l: 'Контакты', h: '#contacts' },
                ].map((x) => (
                  <button key={x.h} onClick={() => go(x.h)} className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                    {x.l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold mb-4 text-sm">Мы в сети</div>
              <div className="flex gap-3">
                {['Send', 'MessageCircle', 'Mail'].map((ic) => (
                  <a key={ic} href="#" className="w-10 h-10 rounded-xl bg-muted grid place-items-center hover:bg-primary/15 transition-colors">
                    <Icon name={ic} size={18} className="text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-sm text-muted-foreground">
          <span>© 2026 Servis911. Все права защищены.</span>
          <span>Политика конфиденциальности · Договор оферты</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;