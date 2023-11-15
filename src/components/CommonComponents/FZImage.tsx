import React from 'react'
import { Image, StyleSheet } from 'react-native'
import FZButton from './FZButton'

const FZImage = props => {
  const { children = null, style, rounded, source = { uri: 'https://www.flaticon.com/free-icons/logout' } } = props
  const viewStyles = [style, rounded ? { borderRadius: 100000 } : null]

  return (
    <FZButton {...props} buttonStyle={componentStyle.container}>
      <Image source={source} style={componentStyle.imageStyle}>
        {children}
      </Image>
    </FZButton>
  )
}

const componentStyle = StyleSheet.create({
    imageStyle: {
        height: 24,
        width: 24,
    },
    container: {
        paddingHorizontal: 10,
    },
});

export default React.memo(FZImage);