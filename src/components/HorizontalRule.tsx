import { Color } from '@/utils/color';

const HorizontalRule = () => {
  return <div style={styles.container} />;
};

const styles = {
  container: {
    width: '100%',
    height: 1,
    backgroundColor: Color.default_dark,
  },
};

export default HorizontalRule;
