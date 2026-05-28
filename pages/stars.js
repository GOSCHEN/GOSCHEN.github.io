import StarsBrowser from '../components/StarsBrowser';
import Seo from '../components/Seo';

export default function StarsPage() {
  return (
    <>
      <Seo page={{ title: 'Stars — Fabian Seiffert', slug: '/stars' }} />
      <StarsBrowser />
    </>
  );
}
