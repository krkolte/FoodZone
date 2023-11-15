import { Colors } from '@/theme/Variables';
import React from 'react';
import { StyleProp } from 'react-native';
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native';

interface FZBProps {
  activeOpacity?: number,
  children: React.ReactNode,
  onPress?: Function,
  buttonStyle?: StyleProp<any>,
}

const FZButton: React.FC<FZBProps> = ({
  children,
  activeOpacity,
  buttonStyle = buttonStyles?.button,
  ...rest
}) => (
    <TouchableOpacity activeOpacity={activeOpacity} style={[buttonStyle]} {...rest} hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}>
      {children}
    </TouchableOpacity>
  );

  const buttonStyles = StyleSheet.create({
    button: {
        alignSelf: 'stretch',
        height: 42,
        marginTop: 15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors?.primary
     },
  })

FZButton.defaultProps = {
  activeOpacity: 0.8,
}

export default FZButton;