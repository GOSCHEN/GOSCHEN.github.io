import { useEffect, useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { SearchIcon, StarIcon, ForkIcon, ExternalIcon, GithubIcon } from './icons';
import languageColors from '../data/languageColors';
import profile from '../data/profile';

const API = (page) =>
  `https://api.github.com/users/${profile.handle}/starred?per_page=100&page=${page}`;

const SORTS = [
  { key: 'recent', label: 'recently starred' },
  { key: 'stars', label: 'most stars' },
  { key: 'pushed', label: 'recently pushed' },
  { key: 'name', label: 'A→Z' },
];

function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k';
  return String(n);
}

function timeAgo(iso) {
  const d = new Date(iso);
  const s = (Date.now() - d.getTime()) / 1000;
  const units = [
    [60, 's'],
    [60, 'm'],
    [24, 'h'],
    [30, 'd'],
    [12, 'mo'],
    [Number.POSITIVE_INFINITY, 'y'],
  ];
  let v = s;
  let u = 's';
  for (const [div, label] of units) {
    if (v < div) {
      u = label;
      break;
    }
    v = v / div;
    u = label;
  }
  return `${Math.floor(v)}${u} ago`;
}

export default function StarsBrowser() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState('all');
  const [sort, setSort] = useState('recent');

  useEffect(() => {
    let cancelled = false;
    async function loadAll() {
      setLoading(true);
      setError(null);
      try {
        const acc = [];
        let page = 1;
        const maxPages = 15;
        while (page <= maxPages) {
          const res = await fetch(API(page), {
            headers: { Accept: 'application/vnd.github+json' },
          });
          if (!res.ok) throw new Error(`GitHub API ${res.status}`);
          const batch = await res.json();
          if (!Array.isArray(batch) || batch.length === 0) break;
          acc.push(...batch);
          if (batch.length < 100) break;
          page++;
        }
        if (!cancelled) setRepos(acc);
      } catch (e) {
        if (!cancelled) setError(e.message || 'failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadAll();
    return () => {
      cancelled = true;
    };
  }, []);

  const languages = useMemo(() => {
    const m = new Map();
    for (const r of repos) {
      const l = r.language || 'Unknown';
      m.set(l, (m.get(l) || 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [repos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = repos;
    if (lang !== 'all') {
      list = list.filter((r) => (r.language || 'Unknown') === lang);
    }
    if (q) {
      list = list.filter((r) => {
        return (
          r.full_name.toLowerCase().includes(q) ||
          (r.description || '').toLowerCase().includes(q) ||
          (r.topics || []).some((t) => t.toLowerCase().includes(q))
        );
      });
    }
    const sorted = [...list];
    if (sort === 'stars') sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
    else if (sort === 'pushed') sorted.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
    else if (sort === 'name') sorted.sort((a, b) => a.full_name.localeCompare(b.full_name));
    return sorted;
  }, [repos, query, lang, sort]);

  return (
    <Wrap>
      <Header>
        <h1>
          <span className="dim mono">$</span> ls ~/starred
        </h1>
        <Stats>
          <StarIcon size={14} />
          <strong>{repos.length}</strong> repos
          <Dot />
          <strong>{languages.length}</strong> languages
        </Stats>
      </Header>

      <Controls>
        <SearchWrap>
          <SearchIcon size={16} />
          <input
            type="text"
            placeholder="search name, description, topic…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && <Clear onClick={() => setQuery('')}>esc</Clear>}
        </SearchWrap>

        <Select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="all">all languages</option>
          {languages.map(([l, count]) => (
            <option key={l} value={l}>
              {l} ({count})
            </option>
          ))}
        </Select>

        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              sort: {s.label}
            </option>
          ))}
        </Select>
      </Controls>

      {loading && <Status>fetching from github…</Status>}
      {error && (
        <Status className="err">
          ! {error}. (rate-limited? unauthenticated calls are 60/hr per IP.)
        </Status>
      )}

      {!loading && !error && filtered.length === 0 && (
        <Status>no matches. try fewer filters.</Status>
      )}

      <Grid>
        {filtered.map((r) => (
          <Card key={r.id} href={r.html_url} target="_blank" rel="noreferrer">
            <CardTop>
              <Owner>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.owner.avatar_url} alt={r.owner.login} loading="lazy" />
                <span>{r.owner.login}</span>
              </Owner>
              <ExternalIcon size={14} />
            </CardTop>

            <Name>{r.name}</Name>

            {r.description && <Desc>{r.description}</Desc>}

            {r.topics && r.topics.length > 0 && (
              <Topics>
                {r.topics.slice(0, 4).map((t) => (
                  <Topic key={t}>{t}</Topic>
                ))}
              </Topics>
            )}

            <CardFoot>
              {r.language && (
                <Meta>
                  <LangDot style={{ background: languageColors[r.language] || '#888' }} />
                  {r.language}
                </Meta>
              )}
              <Meta>
                <StarIcon size={13} /> {fmt(r.stargazers_count)}
              </Meta>
              {r.forks_count > 0 && (
                <Meta>
                  <ForkIcon size={13} /> {fmt(r.forks_count)}
                </Meta>
              )}
              <Spacer />
              <Pushed>{timeAgo(r.pushed_at)}</Pushed>
            </CardFoot>
          </Card>
        ))}
      </Grid>
    </Wrap>
  );
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrap = styled.section`
  padding: 80px 0 32px;
  animation: ${fadeUp} 0.5s ease-out;
  @media (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    padding: 48px 0 32px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
  h1 {
    font-size: clamp(28px, 4.5vw, 42px);
    font-weight: 800;
    letter-spacing: -0.03em;
    font-family: 'JetBrains Mono', monospace;
  }
  .dim {
    color: ${({ theme }) => theme.accent};
    margin-right: 10px;
  }
`;

const Stats = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.text.secondary};
  strong { color: ${({ theme }) => theme.text.primary}; }
`;

const Dot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: ${({ theme }) => theme.text.tertiary};
  margin: 0 4px;
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 200px;
  gap: 10px;
  margin-bottom: 24px;
  @media (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const SearchWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.bg.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.bg.elevated};
  padding: 0 14px;
  transition: border-color 0.15s ease;
  &:focus-within {
    border-color: ${({ theme }) => theme.accent};
  }
  svg { color: ${({ theme }) => theme.text.tertiary}; flex-shrink: 0; }
  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.text.primary};
    padding: 12px 10px;
    font-size: 14px;
    &::placeholder { color: ${({ theme }) => theme.text.tertiary}; }
  }
`;

const Clear = styled.button`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  padding: 3px 6px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.bg.border};
  color: ${({ theme }) => theme.text.tertiary};
`;

const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  background: ${({ theme }) => theme.bg.elevated};
  border: 1px solid ${({ theme }) => theme.bg.border};
  border-radius: 10px;
  padding: 12px 14px;
  color: ${({ theme }) => theme.text.primary};
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.15s ease;
  &:hover, &:focus {
    border-color: ${({ theme }) => theme.accent};
    outline: none;
  }
`;

const Status = styled.div`
  padding: 60px 0;
  text-align: center;
  color: ${({ theme }) => theme.text.tertiary};
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  &.err { color: #ff6b6b; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 14px;
`;

const Card = styled.a`
  display: flex;
  flex-direction: column;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.bg.border};
  background: ${({ theme }) => theme.bg.elevated};
  transition: all 0.18s ease;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: ${({ theme }) => theme.bg.borderStrong};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.accentSoft};
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.gradient};
    opacity: 0;
    transition: opacity 0.18s ease;
  }
  &:hover::before { opacity: 1; }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text.tertiary};
  margin-bottom: 8px;
`;

const Owner = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
  }
`;

const Name = styled.h3`
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
  word-break: break-word;
`;

const Desc = styled.p`
  font-size: 13.5px;
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Topics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 12px;
`;

const Topic = styled.span`
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${({ theme }) => theme.accentSoft};
  color: ${({ theme }) => theme.accent};
  font-weight: 500;
`;

const CardFoot = styled.div`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.text.secondary};
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.bg.border};
`;

const Meta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
`;

const LangDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
`;

const Spacer = styled.span`
  flex: 1;
`;

const Pushed = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: ${({ theme }) => theme.text.tertiary};
`;
