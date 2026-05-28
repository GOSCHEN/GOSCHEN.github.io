import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import profile from '../data/profile';
import { GithubIcon, MailIcon, ArrowRight, StarIcon } from './icons';

export default function Hero() {
  return (
    <Wrap>
      <Prompt className="mono">
        <span className="dim">$</span> whoami
      </Prompt>

      <Heading>
        <span className="muted">Hi, I&rsquo;m</span>{' '}
        <Gradient>{profile.name}.</Gradient>
      </Heading>

      <Sub>
        <Role>{profile.role}</Role>
        <Dot />
        <span>{profile.company}</span>
        <Dot />
        <span className="mono">{profile.location}</span>
      </Sub>

      <Tagline>{profile.tagline}</Tagline>

      <Bio>
        {profile.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Bio>

      <Actions>
        <Link href="/stars" legacyBehavior>
          <PrimaryBtn as="a">
            <StarIcon size={16} />
            browse my stars
            <ArrowRight size={14} />
          </PrimaryBtn>
        </Link>
        <SecondaryBtn href={profile.links.github} target="_blank" rel="noreferrer">
          <GithubIcon size={16} /> github
        </SecondaryBtn>
        <SecondaryBtn href={profile.links.email}>
          <MailIcon size={16} /> email
        </SecondaryBtn>
      </Actions>
    </Wrap>
  );
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrap = styled.section`
  padding: 80px 0 48px;
  animation: ${fadeUp} 0.5s ease-out;
  @media (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    padding: 48px 0 32px;
  }
`;

const Prompt = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text.tertiary};
  margin-bottom: 18px;
  .dim { color: ${({ theme }) => theme.accent}; margin-right: 8px; }
`;

const Heading = styled.h1`
  font-size: clamp(40px, 7vw, 72px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  .muted { color: ${({ theme }) => theme.text.tertiary}; font-weight: 600; }
`;

const Gradient = styled.span`
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const Sub = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
  font-size: 16px;
  color: ${({ theme }) => theme.text.secondary};
`;

const Role = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ theme }) => theme.text.tertiary};
`;

const Tagline = styled.p`
  margin-top: 24px;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
  max-width: 720px;
  @media (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    font-size: 18px;
  }
`;

const Bio = styled.div`
  margin-top: 28px;
  max-width: 680px;
  p {
    color: ${({ theme }) => theme.text.secondary};
    font-size: 16px;
    line-height: 1.7;
    & + p { margin-top: 14px; }
  }
`;

const Actions = styled.div`
  margin-top: 36px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 10px;
  background: ${({ theme }) => theme.text.primary};
  color: ${({ theme }) => theme.text.inverse};
  font-weight: 600;
  font-size: 14px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px ${({ theme }) => theme.accentSoft};
  }
`;

const SecondaryBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.bg.border};
  color: ${({ theme }) => theme.text.primary};
  font-weight: 600;
  font-size: 14px;
  transition: all 0.15s ease;
  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;
