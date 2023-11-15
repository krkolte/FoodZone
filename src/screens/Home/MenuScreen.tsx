import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks';
import { useLazyGetMenuQuery } from '../../services/modules/users';
import FullScreenLoader from '@/components/CommonComponents/FullScreenLoader';
import { ApplicationScreenProps } from 'types/navigation';
import { Colors } from '@/theme/Variables';
import MenuHeader from '@/components/MenuHeader/MenuHeader';
import { getAlteredMenuListForItemSelection, getSectionedMenuWithCuisine, getSelectedMenuItems, isAnyMenuItemAdded } from '@/helpers/commonFunctions';
import MenuListWithCuisine from '@/components/MenuListWithCuisine/MenuListWithCuisine';
import { MenuItemType, RestourantMenuListType } from 'types/theme';

const MenuScreen = ({ navigation, route }: ApplicationScreenProps) => {
    const { t } = useTranslation(['common']);
    const {
        Common,
        Fonts,
        Layout,
        Images,
    } = useTheme();
    const dispatch = useDispatch();
    const [menuList, setMenuList] = useState<any>([]);
    const { restourantData = {} } = route?.params || {};

    const [getMenuItems, { data, isSuccess, isLoading, isFetching }] =
        useLazyGetMenuQuery();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: ``,
        });
    }, []);

    useEffect(() => {
        getMenuItems(restourantData?.id);
    }, []);

    useEffect(() => {
        setMenuList(getSectionedMenuWithCuisine(data));
    }, [data]);

    const goToCheckout = () => {
        const addedItems = getSelectedMenuItems(menuList);
        navigation.navigate('OrderCheckout', {
            addedMenuItems: addedItems
        })
    }

    const updateAddedItem = (updatedItem: MenuItemType, section: RestourantMenuListType) => {
        const newList = getAlteredMenuListForItemSelection(menuList, section?.id, updatedItem?.id, updatedItem?.itemsAdded);
        setMenuList(newList);
    }

    const renderCheckoutView = () => {
        const isAnyItemAdded = isAnyMenuItemAdded(menuList);
        if (!isAnyItemAdded) return null;
        return (
            <TouchableWithoutFeedback onPressIn={goToCheckout}>
                <View style={[{
                    position: 'absolute', bottom: 0, left: 10, right: 10, backgroundColor: Colors.primary, paddingVertical: 12,
                    alignSelf: 'flex-start', borderRadius: 30
                }, Layout.center]}>
                    <Text style={[Fonts.textRegular, screenStyle.buttonLabel]} numberOfLines={1}>Let's Order</Text>
                </View>

            </TouchableWithoutFeedback>
        )
    }

    const renderHeaderView = () => (
        <MenuHeader restourantData={restourantData} />
    );

    const renderMenuWithCuisine = () => (
        <MenuListWithCuisine menuList={menuList} updateAddedItem={updateAddedItem} />
    );

    const renderContent = () => (
        <View style={screenStyle.innerContainer}>
            {renderHeaderView()}
            {renderMenuWithCuisine()}
        </View>
    );

    return (
        <View
            style={[Layout.screenContainer, Layout.screenPadding]}
        >
            {renderContent()}
            {renderCheckoutView()}
            {isLoading && <FullScreenLoader />}
        </View>
    );
};

const screenStyle = StyleSheet.create({
    innerContainer: {
        flex: 1
    },
    listStyle: { marginTop: 15, flex: 1 },
    buttonLabel: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 18

    },
});

export default MenuScreen;
