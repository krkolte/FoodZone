import React from 'react';
import { View, Image, Text, StyleSheet, SectionList, SectionListData, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../hooks';
import FZRatingView from '../CommonComponents/FZRatingView';
import { Colors } from '@/theme/Variables';
import FZButton from '../CommonComponents/FZButton';
import { isAnyMenuItemAdded } from '@/helpers/commonFunctions';
import { MenuItemType, RestourantMenuListType } from 'types/theme';

type Props = {
    menuList?: RestourantMenuListType;
    updateAddedItem?: Function;
};

const MenuListWithCuisine = ({ menuList = [], updateAddedItem = () => {} }: Props) => {
    const { Layout, Fonts } = useTheme();
    const isAnyItemAdded = isAnyMenuItemAdded(menuList);

    const onAddPress = (selectedItem: MenuItemType, section: RestourantMenuListType) => {
        const updatedItem = {
            ...selectedItem,
            itemsAdded: selectedItem?.itemsAdded ? selectedItem?.itemsAdded + 1 : 1,
        }
        updateAddedItem(updatedItem, section)

    }

    const onMinusPress = (selectedItem: MenuItemType, section: RestourantMenuListType) => {
        if(selectedItem?.itemsAdded === 0) return; 
        const updatedItem = {
            ...selectedItem,
            itemsAdded: selectedItem?.itemsAdded ? selectedItem?.itemsAdded - 1 : 0,
        }
        updateAddedItem(updatedItem, section)
    }

    const renderAddItemView = (item: MenuItemType, section: RestourantMenuListType) => {
        return (
            <TouchableOpacity onPress={() => onAddPress(item, section)} onPressIn={() => onAddPress(item, section)} style={{ paddingHorizontal: 30, paddingVertical: 8, backgroundColor: Colors.primary, position: 'absolute', alignSelf: 'center', top: 100, borderRadius: 10, flex: 1 }} activeOpacity={1}>
                <Text style={[Fonts.textSmall, componentStyle.addLabel]}>ADD</Text>
            </TouchableOpacity>
        );
    }

    const renderAddRemoveItemView = (item: MenuItemType, section: RestourantMenuListType) => {
        const count = item?.itemsAdded || 1;
        return (
            <View style={{ paddingHorizontal: 10, paddingVertical: 8, backgroundColor: Colors.primary, position: 'absolute', alignSelf: 'center', top: 100, borderRadius: 10, flexDirection: 'row', flex: 1, alignItems: 'center', right: 20 }} activeOpacity={0.8}>
                <TouchableWithoutFeedback onPressIn={() => onMinusPress(item, section)} >
                    <Text style={[Fonts.textSmall, componentStyle.operationLabel]}>-</Text>
                </TouchableWithoutFeedback>
                <Text style={[Fonts.textSmall, componentStyle.countLabel]}>{count}</Text>
                <TouchableWithoutFeedback onPressIn={() => onAddPress(item, section)}>
                    <Text style={[Fonts.textSmall, componentStyle.operationLabel]}>+</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    const renderMenuItem = ({ item, section }: { item: MenuItemType, section: RestourantMenuListType }) => {
        return (
            <>
                <View style={[Layout.row, componentStyle.menuItemContainer, Layout.fill]}>
                    <View style={[Layout.fill]}>
                        <Text style={[Fonts.textSmall, componentStyle.name]} numberOfLines={2}>{item?.name}</Text>
                        <FZRatingView rating={item?.rating}/>
                        <Text style={[Fonts.textSmall, componentStyle.price]} numberOfLines={1}>₹ {item?.price}</Text>
                        <Text style={[Fonts.textTiny, componentStyle.name]} numberOfLines={5}>{item?.des}</Text>
                    </View>
                    <View>
                        <Image source={{ uri: item?.avatar }} style={componentStyle.menuImage} />
                        {item?.itemsAdded > 0 ? renderAddRemoveItemView(item, section) : renderAddItemView(item, section)}
                    </View>
                </View>
            </>

        );
    }
    if(menuList?.length === 0) return null;
    return (
        <View style={[componentStyle.itemContainer]}>
            <SectionList
                sections={menuList}
                keyExtractor={(item, index) => item + index}
                renderItem={renderMenuItem}
                stickyHeaderHiddenOnScroll
                stickySectionHeadersEnabled={false}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={componentStyle.header}>{title}</Text>
                )}
                style={{ marginBottom: isAnyItemAdded ? 200 : 120, paddingBottom: 10 }}
                ItemSeparatorComponent={() => <View style={componentStyle.separator}/>}
            />
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
        fontWeight: '500',
        color: Colors.textGray800,
        marginVertical: 3
    },
    price: {
        fontWeight: '600',
        color: Colors.textGray800,
        marginVertical: 3
    },
    des: {
        fontWeight: '500',
    },
    addLabel: {
        fontWeight: '600',
        color: Colors.white,
    },
    countLabel: {
        fontWeight: '600',
        color: Colors.white,
        width: 30,
        textAlign: 'center'
    },
    operationLabel: {
        fontWeight: '600',
        color: Colors.white,
        paddingHorizontal: 10
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
    menuImage: {
        height: 124,
        width: 124,
        borderRadius: 8,
        marginRight: 10,
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 10,
    },
    menuItemContainer: {
        marginBottom: 15
    },
    separator: {
        height: 1,
        backgroundColor: 'lightgrey',
        alignSelf: 'stretch',
        marginBottom: 15,
        opacity: 0.6
    },
});

MenuListWithCuisine.defaultProps = {
    menuList: [],
    updateAddedItem: () => {},
};

export default MenuListWithCuisine;
