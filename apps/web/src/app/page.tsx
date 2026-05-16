import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { PathsForEveryone } from '@/components/sections/PathsForEveryone';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { WorkbenchShowcase } from '@/components/sections/WorkbenchShowcase';
import { Curriculum } from '@/components/sections/Curriculum';
import { Proof } from '@/components/sections/Proof';
import { OpenSource } from '@/components/sections/OpenSource';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import {
  JsonLd,
  ORGANIZATION_SCHEMA,
  SOFTWARE_APP_SCHEMA,
  FAQ_SCHEMA,
} from '@/components/seo/JsonLd';

export default function Home() {
  return (
    <main className="paper-grain" style={{ background: 'var(--paper)', minHeight: '100vh', overflow: 'hidden' }}>
      <JsonLd data={[ORGANIZATION_SCHEMA, SOFTWARE_APP_SCHEMA, FAQ_SCHEMA]} />
      <Nav />
      <Hero />
      <PathsForEveryone />
      <HowItWorks />
      <WorkbenchShowcase />
      <Curriculum />
      <Proof />
      <OpenSource />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
