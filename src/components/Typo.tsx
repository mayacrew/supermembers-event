import { Color } from '@/utils/color';

interface Props {
  style?: React.CSSProperties;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  lineHeight?: number;
  color?: string;
  children: React.ReactNode;
}

const Typo = ({
  style,
  fontSize = 14,
  fontWeight = 600,
  fontFamily = 'Pretendard',
  lineHeight = 24,
  color = Color.default,
  children,
}: Props) => {
  return (
    <div
      style={{
        ...style,
        fontFamily: fontFamily,
        fontSize: `${fontSize}px`,
        fontStyle: 'normal',
        fontWeight: `${fontWeight}`,
        lineHeight: `${lineHeight}px`,
        letterSpacing: '0px',
        color: color,
      }}
    >
      {children}
    </div>
  );
};

export default Typo;
