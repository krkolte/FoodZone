import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../../hooks';
import { MenuItemType, RestourantsListItemType } from 'types/theme';
import FZRatingView from '../CommonComponents/FZRatingView';
import { Colors } from '@/theme/Variables';

type Props = {
    itemData?: MenuItemType;
};

const CheckoutItem = ({ itemData }: Props) => {
    const { Layout, Images, Fonts } = useTheme();
    const { width } = useWindowDimensions();

    return (
        <TouchableOpacity style={[componentStyle.itemContainer]} activeOpacity={1}>
            <Image source={{ uri: itemData?.avatar }} style={[componentStyle.icon]} />
            <View style={[Layout.justifyContentAround, Layout.fill]}>
                <Text style={[Fonts.textMidSmall, componentStyle.name]} numberOfLines={2}>{itemData?.name}</Text>
                <Text style={[Fonts.textTiny, componentStyle.name]} numberOfLines={2}>{itemData?.des}</Text>
                <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
                    <Text style={[Fonts.textSmall, componentStyle.price]} numberOfLines={1}>₹ {itemData?.price}</Text>
                    <Text style={[Fonts.textSmall, componentStyle.count]} numberOfLines={1}>× {itemData?.itemsAdded}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const componentStyle = StyleSheet.create({
    itemContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        flex: 1,
    },
    icon: {
        height: 100,
        width: 100,
        borderRadius: 8,
        marginRight: 15,
    },
    name: {
        fontWeight: '600',

    },
    listStyle: { marginTop: 15, flex: 1 },
    price: {
        fontWeight: '600',
        color: Colors.textGray800,
        marginVertical: 3
    },
    count: {
        fontWeight: '800',
        color: Colors.primary,
        marginVertical: 3 
    }
});

CheckoutItem.defaultProps = {
    restourantData: {},
};

export default CheckoutItem;
