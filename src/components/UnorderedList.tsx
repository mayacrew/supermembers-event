import { Color } from '@/utils/color';
import Typo from './Typo';

interface Props {
  list: string[];
  typography?: {
    fontSize?: number;
    fontWeight?: number;
    lineHeight?: number;
    color?: string;
  };
}

const UnorderedList = ({
  list,
  typography = {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 24,
    color: Color.default_dark,
  },
}: Props) => {
  return (
    <div style={styles.container}>
      {list.map((item, index) => (
        <div key={index} style={styles.item}>
          <Typo color={typography.color}>•</Typo>
          <Typo
            fontSize={typography.fontSize}
            fontWeight={typography.fontWeight}
            lineHeight={typography.lineHeight}
            color={typography.color}
          >
            {item}
          </Typo>
        </div>
      ))}
    </div>
  );
};

export default UnorderedList;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    margin: 0,
  },
  item: {
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center',
    gap: 4,
  },
};
