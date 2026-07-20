import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const FloatingCta = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      const orderSection = document.querySelector('#order');
      let hideForOrder = false;

      if (orderSection) {
        const rect = orderSection.getBoundingClientRect();
        hideForOrder = rect.top < window.innerHeight && rect.bottom > 0;
      }

      setVisible(window.scrollY > heroHeight && !hideForOrder);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = () => document.querySelector('#order')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-400 ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <Button
        onClick={go}
        size="lg"
        className="rounded-full h-14 pl-6 pr-7 font-semibold bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/40 hover-scale group"
      >
        <span className="relative flex h-2.5 w-2.5 mr-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
        </span>
        Оставить заявку
        <Icon name="ArrowRight" size={18} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </div>
  );
};

export default FloatingCta;
