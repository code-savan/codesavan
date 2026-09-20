import Hero from '@/components/landing/Hero';
import Work from '@/components/landing/Work';
import Services from '@/components/landing/Services';
import Journey from '@/components/landing/Journey';
import Stats from '@/components/landing/Stats';
import Testimonials from '@/components/landing/Testimonials';
import FAQs from '@/components/landing/FAQs';
import Success from '@/components/landing/Success';
import Contact from '@/components/landing/Contact';
import Navigation from '@/components/Navigation';
import { FaqJsonLd } from '@/components/JsonLd';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <FaqJsonLd />
      <Navigation />

      <div className="w-full mx-auto md:w-[550px] h-fit overflow-x-hidden md:overflow-x-visible">
        <div id="home">
          <Hero />
        </div>
        <div id="work">
          <Work />
        </div>
        <Journey />
        <Services />
        <Stats />
        <div id="testimonials">
          <Testimonials />
        </div>
        <Success />
        <FAQs />
        <div id="contact">
          <Contact />
        </div>
      </div>
    </main>
  );
}
