import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks';
import { RestourantsListItemType } from 'types/theme';
import { useTranslation } from 'react-i18next';
import FZButton from '../CommonComponents/FZButton';

type Props = {
  resList?: Array<RestourantsListItemType>;
  onItemPress?: Function;
};

const PopularRestourants = ({ resList, onItemPress = () => {} }: Props) => {
    const { t } = useTranslation(['common']);
  const { Layout, Fonts } = useTheme();

  const resItemView = ({ item }) => {
    return (
        <FZButton buttonStyle={componentStyle.itemContainer} onPress={() => onItemPress(item)}>
            <Image source={{ uri: `${item?.imageUrl}` }} style={componentStyle.icon} />
            <Text style={[Fonts.textTiny, Fonts.textCenter, componentStyle.name]} numberOfLines={2}>{item?.name}</Text>
        </FZButton>
    );
  }

  return (
    <View style={componentStyle.container}>
        <Text style={[Fonts.textBold, Fonts.textRegular]}>{t('common:popular')}</Text>
        <FlatList
            data={resList}
            renderItem={resItemView}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            style={{ marginVertical: 15 }}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
        {<Text style={[Fonts.textBold, Fonts.textRegular]}>{t('common:greatSpots')}</Text>}
    </View>
  );
};

const componentStyle = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 15,
    },
    itemContainer: {
        alignItems: 'center',
        marginRight: 16
    },
    icon: {
        height: 64,
        width: 64,
        borderRadius: 8,
    },
    name: {
        maxWidth: 76,
        marginTop: 5,
        fontWeight: '500'
    },
});

PopularRestourants.defaultProps = {
    resList: [],
};

export default PopularRestourants;
