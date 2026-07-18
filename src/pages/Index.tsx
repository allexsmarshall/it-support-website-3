import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import Services from '@/components/site/Services';
import About from '@/components/site/About';
import OrderForm from '@/components/site/OrderForm';
import Contacts from '@/components/site/Contacts';
import Footer from '@/components/site/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <OrderForm />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
