import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '../../hooks';
import { RestourantsListItemType } from 'types/theme';
import FZRatingView from '../CommonComponents/FZRatingView';

type Props = {
    restourantData?: RestourantsListItemType;
    onItemPress?: () => void;
};

const RestourantItem = ({ restourantData, onItemPress }: Props) => {
    const { Layout, Images, Fonts } = useTheme();
    const { width } = useWindowDimensions();

    return (
        <TouchableOpacity style={[componentStyle.itemContainer, { width: (width / 2) - 10 }]} activeOpacity={0.8} onPress={onItemPress}>
            <Image source={{ uri: restourantData?.imageUrl }} style={[componentStyle.icon, { width: (width / 2) - 20 }]} />
            <Text style={[Fonts.textMidSmall, componentStyle.name]} numberOfLines={2}>{restourantData?.name}</Text>
            <Text style={[Fonts.textTiny, componentStyle.name]} numberOfLines={1}>{restourantData?.distance} km away</Text>
            <FZRatingView rating={restourantData?.rating} />
        </TouchableOpacity>
    );
};


const componentStyle = StyleSheet.create({
    itemContainer: {
        marginBottom: 20,
    },
    icon: {
        height: 150,
        width: 120,
        borderRadius: 8,
        marginBottom: 5,
    },
    name: {
        fontWeight: '600',

    },
    listStyle: { marginTop: 15, flex: 1 }
});

RestourantItem.defaultProps = {
    onItemPress: () => { },
    restourantData: [],
};

export default RestourantItem;
