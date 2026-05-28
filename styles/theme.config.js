const shared = {
  fontWeights: { body: 400, sub: 500, link: 600, bold: 700, heading: 800 },
  deviceSize: {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px',
  },
};

const light = {
  bg: {
    primary: '#fafafa',
    elevated: '#ffffff',
    sunken: '#f1f1ee',
    border: 'rgba(10,10,10,0.08)',
    borderStrong: 'rgba(10,10,10,0.16)',
    hover: 'rgba(10,10,10,0.04)',
  },
  text: {
    primary: '#0a0a0a',
    secondary: 'rgba(10,10,10,0.65)',
    tertiary: 'rgba(10,10,10,0.45)',
    inverse: '#fafafa',
  },
  accent: '#0a7d3b',
  accentSoft: 'rgba(10,125,59,0.10)',
  gradient: 'linear-gradient(90deg, #0a7d3b 0%, #1d4ed8 50%, #c026d3 100%)',
};

const dark = {
  bg: {
    primary: '#0a0a0a',
    elevated: '#111111',
    sunken: '#050505',
    border: 'rgba(250,250,250,0.10)',
    borderStrong: 'rgba(250,250,250,0.22)',
    hover: 'rgba(250,250,250,0.05)',
  },
  text: {
    primary: '#fafafa',
    secondary: 'rgba(250,250,250,0.65)',
    tertiary: 'rgba(250,250,250,0.40)',
    inverse: '#0a0a0a',
  },
  accent: '#7cff6b',
  accentSoft: 'rgba(124,255,107,0.10)',
  gradient: 'linear-gradient(90deg, #7cff6b 0%, #6ba8ff 50%, #ff6bd2 100%)',
};

export const lightTheme = { ...shared, ...light, mode: 'light' };
export const darkTheme = { ...shared, ...dark, mode: 'dark' };
