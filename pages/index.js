import Hero from '../components/Hero';
import TechStack from '../components/TechStack';
import Seo from '../components/Seo';

export default function Home() {
  return (
    <>
      <Seo page={{ title: 'Fabian Seiffert — Software Engineer', slug: '/' }} />
      <Hero />
      <TechStack />
    </>
  );
}
