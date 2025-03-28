import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import CTA from '@/components/landing/CTA';
import Tools from '@/components/landing/Tools';
import Work from '@/components/landing/Work';
import Services from '@/components/landing/Services';
import Journey from '@/components/landing/Journey';
import Stats from '@/components/landing/Stats';
import Testimonials from '@/components/landing/Testimonials';
import FAQs from '@/components/landing/FAQs';
import Success from '@/components/landing/Success';
import Newsletter from '@/components/landing/Newsletter';
import Contact from '@/components/landing/Contact';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Navigation />

      <div className="w-full mx-auto md:w-[550px] h-fit overflow-x-hidden md:overflow-x-visible">
        <div id="home">
          <Hero />
        </div>
        {/* <Tools /> */}
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
        <Newsletter />
        <div id="contact">
          <Contact />
        </div>
        {/* <Features /> */}
        {/* <CTA /> */}
      </div>
    </main>
  );
}
