import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const links = [
  { label: 'Услуги', href: '#services' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'О компании', href: '#about' },
  { label: 'Контакты', href: '#contacts' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        <button onClick={() => go('#hero')} className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary grid place-items-center shadow-lg shadow-primary/30">
            <Icon name="Hexagon" size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            Servis<span className="text-primary">911</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary hover:after:w-full after:transition-all"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button onClick={() => go('#order')} className="rounded-full font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
            Оставить заявку
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen((v) => !v)}>
          <Icon name={open ? 'X' : 'Menu'} size={26} />
        </button>
      </div>

      {open && (
        <div className="md:hidden glass mt-3 mx-4 rounded-2xl p-4 animate-fade-in">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="text-left px-4 py-3 rounded-xl hover:bg-muted transition-colors font-medium"
              >
                {l.label}
              </button>
            ))}
            <Button onClick={() => go('#order')} className="mt-2 rounded-full font-semibold">
              Оставить заявку
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;