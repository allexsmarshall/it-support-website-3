import Icon from '@/components/ui/icon';

const items = [
  { icon: 'Phone', label: 'Телефон', value: '+7 (960) 411-49-11', href: 'tel:+79604114911' },
  { icon: 'Phone', label: 'Телефон', value: '+7 (918) 189-68-80', href: 'tel:+79181896880' },
  { icon: 'Mail', label: 'Email', value: 'help@nexustech.ru', href: 'mailto:help@nexustech.ru' },
  { icon: 'MapPin', label: 'Офис', value: 'Москва, ул. Тверская, 12', href: '#' },
];

const Contacts = () => {
  return (
    <section id="contacts" className="relative py-28">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-4">
            <span className="h-px w-8 bg-primary" /> Контакты
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight">
            Всегда на связи
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Позвоните, напишите или приезжайте в офис — поможем с любым IT-вопросом.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((c) => (
            <a
              key={c.value}
              href={c.href}
              className="group rounded-3xl bg-card border border-border p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                <Icon name={c.icon} size={22} className="text-primary" />
              </div>
              <div className="text-sm text-muted-foreground">{c.label}</div>
              <div className="font-semibold mt-1">{c.value}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contacts;