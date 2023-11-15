import { Colors } from '@/theme/Variables';
import React from 'react';
import { KeyboardTypeOptions } from 'react-native';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

interface FZIProps {
  placeholder?: string,
  value: any,
  onTextChange: Function,
  inputKeyboardType?: KeyboardTypeOptions,
}

const FZInput: React.FC<FZIProps> = ({
    value,
    onTextChange,
  placeholder,
  inputKeyboardType,
  ...rest
}) => (
    <TextInput
    style={inputStyle.inputContainer}
    placeholder={placeholder}
    onChangeText={(_text) => onTextChange(_text)}
    value={value}
    keyboardType={inputKeyboardType}
    placeholderTextColor={Colors.textGray200}
    underlineColorAndroid="transparent"
    autoCapitalize={'none'}
    autoCorrect={false}
  />
  );

  const inputStyle = StyleSheet.create({
    inputContainer: {
        alignSelf: 'stretch',
        height: 42,
        borderColor: Colors?.textGray200,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 20, 
        marginBottom: 15,
        borderRadius: 20
     },
  })

FZInput.defaultProps = {
    placeholder: '',
    value: '',
    onTextChange: () => {},
    inputKeyboardType: 'email-address'
}

export default FZInput;