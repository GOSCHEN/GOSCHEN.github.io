import styled from 'styled-components';
import profile from '../data/profile';

const groups = [
  { key: 'daily', label: 'daily driver' },
  { key: 'fluent', label: 'fluent' },
  { key: 'exploring', label: 'currently exploring' },
];

export default function TechStack() {
  return (
    <Wrap>
      <SectionLabel className="mono">
        <span className="hash">#</span> stack
      </SectionLabel>
      <Grid>
        {groups.map((g) => (
          <Group key={g.key}>
            <GroupLabel className="mono">{g.label}</GroupLabel>
            <Chips>
              {profile.stack[g.key].map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </Chips>
          </Group>
        ))}
      </Grid>
    </Wrap>
  );
}

const Wrap = styled.section`
  padding: 32px 0 64px;
`;

const SectionLabel = styled.h2`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.tertiary};
  margin-bottom: 18px;
  .hash { color: ${({ theme }) => theme.accent}; margin-right: 6px; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Group = styled.div`
  padding: 20px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.bg.border};
  background: ${({ theme }) => theme.bg.elevated};
  transition: border-color 0.2s ease, transform 0.2s ease;
  &:hover {
    border-color: ${({ theme }) => theme.bg.borderStrong};
    transform: translateY(-2px);
  }
`;

const GroupLabel = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.text.tertiary};
  margin-bottom: 14px;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Chip = styled.span`
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: ${({ theme }) => theme.bg.sunken};
  border: 1px solid ${({ theme }) => theme.bg.border};
  color: ${({ theme }) => theme.text.primary};
`;
