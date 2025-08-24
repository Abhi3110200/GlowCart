declare module 'react-native-vector-icons/SimpleLineIcons' {
  import { ComponentType } from 'react';
  import { TextProps } from 'react-native';
  import { IconButtonProps } from 'react-native-vector-icons/Icon';

  export interface SimpleLineIconsProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }
  
  const SimpleLineIcons: ComponentType<SimpleLineIconsProps>;
  export default SimpleLineIcons;
}

declare module 'react-native-vector-icons/Ionicons' {
  import { ComponentType } from 'react';
  import { TextProps } from 'react-native';
  import { IconButtonProps } from 'react-native-vector-icons/Icon';

  export interface IoniconsProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  const Ionicons: ComponentType<IoniconsProps>;
  export default Ionicons;
}
