import { ThemeVariables } from '../../@types/theme';

export default function ({}: ThemeVariables) {
  return {
    logo: require('./assets/images/foodZoneLogo.jpeg'),
    sparkles: {
      topLeft: require('./assets/images/sparkles-top-left.png'),
      top: require('./assets/images/sparkles-top.png'),
      topRight: require('./assets/images/sparkles-top-right.png'),
      right: require('./assets/images/sparkles-right.png'),
      bottomRight: require('./assets/images/sparkles-bottom-right.png'),
      bottom: require('./assets/images/sparkles-bottom.png'),
      bottomLeft: require('./assets/images/sparkles-bottom-left.png'),
    },
    icons: {
      colors: require('./assets/images/colorswatch.png'),
      send: require('./assets/images/send.png'),
      translate: require('./assets/images/translate.png'),
      logout: require('./assets/images/logout.png'),
      leaf: require('./assets/images/leaf.png')
    },
  };
}
