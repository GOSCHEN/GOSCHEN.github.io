# goschen.github.io

Personal site of Fabian Seiffert ([@GOSCHEN](https://github.com/GOSCHEN)) — software engineer at VdS Schadenverhütung.

Live: [goschen.github.io](https://goschen.github.io)

## What this is

A small Next.js site with two pages:

- **`/`** — short intro and tech stack.
- **`/stars`** — browser for my GitHub-starred repos. Fetches from the public GitHub API on load, filters by language, sorts by recent / stars / pushed / name, and lazy-loads 50 cards at a time on scroll.

No backend. Static export friendly. Unauthenticated GitHub API calls are limited to 60/hr per IP.

## Stack

- [Next.js 12](https://nextjs.org/) (Pages Router)
- React 18
- [styled-components](https://styled-components.com/) with a dark/light theme
- [next-seo](https://github.com/garmeeh/next-seo) for OG/Twitter metadata
- [use-dark-mode](https://github.com/donavon/use-dark-mode) for theme persistence

## Project layout

```
pages/
  index.js          # hero + tech stack
  stars.js          # starred-repo browser
  _app.js, _document.js
components/
  Hero.js
  TechStack.js
  StarsBrowser.js   # fetch, filter, sort, infinite scroll
  Layout.js
  Seo.js
  ThemeContext.js
  icons/index.js
data/
  profile.js        # name, role, intro, stack
  languageColors.js # GitHub language → swatch color
styles/
  GlobalStyle.js
  theme.config.js
public/             # static assets (favicon, etc.)
next-seo.config.js
next.config.js
```

## Develop

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
yarn build       # next build
yarn export      # next build && next export → ./out
```

The `out/` directory is what GitHub Pages serves.

## Edit content

- **Profile, intro, stack** → `data/profile.js`
- **Starred-repo browser behavior** → `components/StarsBrowser.js` (GitHub username is read from `profile.handle`)
- **Theme colors** → `styles/theme.config.js`
- **SEO defaults** → `next-seo.config.js`

## License

[MIT](LICENSE.md)
