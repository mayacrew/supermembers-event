import Typo from '@/components/Typo'
import { Color } from '@/utils/color'

interface Props {
  className?: string
  title: string
  content: React.ReactNode
  gap?: number
}

const Card = ({ title, content, gap = 12, className }: Props) => {
  return (
    <div style={{ ...styles.container, gap }} className={className}>
      <Typo
        fontSize={16}
        fontWeight={600}
        lineHeight={20}
        color={Color.default_light}
      >
        {title}
      </Typo>
      {content}
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    padding: '20px 0px 20px 0px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    border: `2px solid ${Color.disabled_dark}`,
  },
}

export default Card
