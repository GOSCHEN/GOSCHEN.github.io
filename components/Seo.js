import { NextSeo } from 'next-seo';
import seoData from '../next-seo.config';

export default function Seo({ page }) {
  const { title, slug } = page || {};
  const canonical = `${seoData.openGraph.url}${slug || ''}`;
  return (
    <NextSeo
      title={title || seoData.openGraph.title}
      description={seoData.openGraph.description}
      canonical={canonical}
      openGraph={{
        type: 'website',
        url: canonical,
        title: title || seoData.openGraph.title,
        description: seoData.openGraph.description,
        locale: 'en_US',
        images: seoData.openGraph.images,
        site_name: seoData.openGraph.site_name,
      }}
      twitter={seoData.twitter}
      additionalMetaTags={[
        { name: 'keywords', content: seoData.openGraph.keywords },
        { name: 'twitter:image', content: seoData.openGraph.images[0].url },
      ]}
    />
  );
}
