import React from 'react';
import { View, Image, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '../../hooks';
import { RestourantsListItemType } from 'types/theme';
import FZRatingView from '../CommonComponents/FZRatingView';

type Props = {
    restourantData?: RestourantsListItemType;
};

const MenuHeader = ({ restourantData }: Props) => {
    const { Layout, Images, Fonts } = useTheme();
    const { width } = useWindowDimensions();

    const dot = () => (
        <View style={Layout.dot}/>
    );

    const renderDetail = () => (
        <View style={[Layout.rowCenter, componentStyle.verticalMargin4]}>
            <Image source={Images.icons.leaf} style={componentStyle.leaf} />
            <Text style={[Fonts.textTiny]} numberOfLines={1}>Pure Veg</Text>
            {dot()}
            <Text style={[Fonts.textTiny]} numberOfLines={1}>North Indian</Text>
            {dot()}
            <Text style={[Fonts.textTiny]} numberOfLines={1}>Street Food</Text>
        </View>
    );

    return (
        <View style={[componentStyle.itemContainer, Layout.center]}>
            <Text style={[Fonts.titleSmall, componentStyle.name]} numberOfLines={2}>{restourantData?.name}</Text>
            {renderDetail()}
            <Text style={[Fonts.textTiny, componentStyle.des]} numberOfLines={1}>45-55 Min</Text>
            <FZRatingView rating={restourantData?.rating} align='center' showRating={true}/>
        </View>
    );
};


const componentStyle = StyleSheet.create({
    itemContainer: {
        paddingBottom: 15,
    },
    icon: {
        height: 150,
        width: 120,
        borderRadius: 8,
        marginBottom: 5,
    },
    name: {
        fontWeight: '700',
    },
    des: {
        fontWeight: '500',
    },
    listStyle: { marginTop: 15, flex: 1 },
    leaf: {
        height: 15,
        width: 12,
        marginRight: 4,
    },
    verticalMargin4: {
        marginVertical: 4,
    },
});

MenuHeader.defaultProps = {
    restourantData: {},
};

export default MenuHeader;
