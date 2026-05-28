const url = 'https://goschen.github.io';

export default {
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Fabian Seiffert — Software Engineer',
    url,
    description:
      'Personal site of Fabian Seiffert (@GOSCHEN). Software engineer at VdS — building enterprise tooling in C#/.NET + React. Browse my GitHub stars.',
    keywords:
      'fabian seiffert, goschen, software engineer, developer, c#, .net, react, typescript, vds, github stars',
    images: [{ width: 1200, height: 630, url: `${url}/og.png`, alt: 'Fabian Seiffert' }],
    site_name: 'GOSCHEN',
  },
  twitter: { handle: '@goschen', site: 'goschen.github.io', cardType: 'summary_large_image' },
};
