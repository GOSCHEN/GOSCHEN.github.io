import styled from 'styled-components';
import Link from 'next/link';
import { MoonIcon, SunIcon, TerminalIcon } from './icons';
import { useThemeToggle } from './ThemeContext';
import profile from '../data/profile';

export default function Layout({ children, mounted }) {
  const darkMode = useThemeToggle();
  return (
    <Shell>
      <Nav>
        <NavInner>
          <Link href="/" passHref legacyBehavior>
            <Brand>
              <TerminalIcon size={18} />
              <span>{profile.handle}</span>
            </Brand>
          </Link>
          <NavLinks>
            <Link href="/" legacyBehavior><a>about</a></Link>
            <Link href="/stars" legacyBehavior><a>stars</a></Link>
            <a href={profile.links.github} target="_blank" rel="noreferrer">github &#x2197;</a>
            <ThemeBtn onClick={darkMode.toggle} aria-label="toggle theme" suppressHydrationWarning>
              {mounted ? (darkMode.value ? <SunIcon size={16} /> : <MoonIcon size={16} />) : null}
            </ThemeBtn>
          </NavLinks>
        </NavInner>
      </Nav>
      <Main>{children}</Main>
      <Foot>
        <FootInner>
          <span className="mono">{'// built with next.js + caffeine'}</span>
          <span>&copy; {new Date().getFullYear()} {profile.name}</span>
        </FootInner>
      </Foot>
    </Shell>
  );
}

const Shell = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  background: ${({ theme }) => (theme.mode === 'dark' ? 'rgba(10,10,10,0.65)' : 'rgba(250,250,250,0.75)')};
  border-bottom: 1px solid ${({ theme }) => theme.bg.border};
`;

const NavInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.text.primary};
  span::before {
    content: '~/';
    color: ${({ theme }) => theme.text.tertiary};
    margin-right: 2px;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 22px;
  font-size: 14px;
  font-family: 'JetBrains Mono', monospace;
  a {
    color: ${({ theme }) => theme.text.secondary};
    transition: color 0.15s ease;
    &:hover { color: ${({ theme }) => theme.accent}; }
  }
  @media (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    gap: 14px;
    font-size: 13px;
  }
`;

const ThemeBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.bg.border};
  color: ${({ theme }) => theme.text.secondary};
  transition: all 0.15s ease;
  &:hover {
    color: ${({ theme }) => theme.accent};
    border-color: ${({ theme }) => theme.accent};
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
`;

const Foot = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.bg.border};
  margin-top: 80px;
`;

const FootInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: ${({ theme }) => theme.text.tertiary};
  @media (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    flex-direction: column;
    gap: 6px;
  }
`;
