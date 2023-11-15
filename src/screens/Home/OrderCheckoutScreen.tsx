import React, { useLayoutEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    FlatList,
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks';
import { useLazyGetRestourantsQuery } from '../../services/modules/users';
import { setUserData } from '../../store/theme';
import FullScreenLoader from '@/components/CommonComponents/FullScreenLoader';
import { ApplicationScreenProps } from 'types/navigation';
import { Colors } from '@/theme/Variables';
import { useUserData } from '@/hooks/useUserData';
import PopularRestourants from '@/components/PopularRestourants/PopularRestourants';
import FZImage from '@/components/CommonComponents/FZImage';
import RestourantItem from '@/components/RestourantItem/RestourantItem';
import { MenuItemType, RestourantsListItemType } from 'types/theme';
import CheckoutItem from '@/components/CheckoutItem/CheckoutItem';
import { getCheckoutAmountData } from '@/helpers/commonFunctions';

const OrderCheckoutScreen = ({ navigation, route }: ApplicationScreenProps) => {
    const { t } = useTranslation(['common']);
    const {
        Common,
        Fonts,
        Layout,
        Images,
    } = useTheme();
    const dispatch = useDispatch();
    const userData = useUserData()
    const { addedMenuItems = [] } = route?.params || {};
    const [getRestourants, { data, isSuccess, isLoading, isFetching }] =
        useLazyGetRestourantsQuery();
    const [addedItems, setAddedItems] = useState(addedMenuItems)
    const amountData = getCheckoutAmountData(addedMenuItems);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: t('common:Checkout'),
            headerShown: true,
            headerStyle: {
                backgroundColor: Colors.white,
                borderBottomColor: Colors.white,
                shadowOffset: {
                    height: 0,
                    width: 0
                }
            },
        });
    }, []);

    const goBackToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    }

    const orderNow = () => {
        Alert.alert(
            t('common:Success'),
            t('common:Order_Placed'),
            [
                {
                    text: t('common:Got_it'),
                    onPress: goBackToHome,
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
            },
        );

    }

    const resItemView = ({ item }: { item: MenuItemType }) => {
        return (
            <CheckoutItem itemData={item} />
        );
    }

    const renderTotalRow = (label: '', value: '') => (
        <View style={[Layout.rowHCenter, Layout.justifyContentBetween, screenStyle.rowContainer]}>
            <Text style={[Fonts.textSmall]} numberOfLines={1}>{label}</Text>
            <Text style={[Fonts.textSmall, Fonts.textDark]} numberOfLines={1}>{value}</Text>
        </View>
    );

    const renderOrderNowView = () => {
        return (
            <TouchableWithoutFeedback onPressIn={orderNow}>
                <View style={[{
                    backgroundColor: Colors.primary, paddingVertical: 12,
                    alignSelf: 'stretch', borderRadius: 30, marginTop: 30
                }, Layout.center]}>
                    <Text style={[Fonts.textRegular, screenStyle.buttonLabel]} numberOfLines={1}>Order Now</Text>
                </View>

            </TouchableWithoutFeedback>
        )
    }

    const renderTotalView = () => {
        return (
            <View style={screenStyle.topPadding}>
                {renderTotalRow('Total', amountData?.total)}
                {renderTotalRow('Shipping Fee', amountData?.shippingFee)}
                {renderTotalRow('Tax(12%)', amountData?.tax)}
                <View style={screenStyle.divider} />
                {renderTotalRow('Total Amount', amountData?.finalAmount)}
            </View>
        );
    }

    const renderBody = () => (
        <View style={screenStyle.innerContainer}>
            <Text style={[Fonts.textTitleRegular, screenStyle.headerTitle, Fonts.textBold]} numberOfLines={1}>{t('common:Added_Items')}</Text>
            <FlatList
                data={addedItems}
                renderItem={resItemView}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                style={screenStyle.listStyle}
            />
            {renderTotalView()}
            {renderOrderNowView()}
        </View>
    );

    return (
        <View
            style={[Layout.screenContainer, Layout.screenPadding]}
        >
            {isLoading && <FullScreenLoader />}
            {renderBody()}
        </View>
    );
};

const screenStyle = StyleSheet.create({
    innerContainer: {
        flex: 1,
        marginTop: 20,
    },
    listStyle: { marginTop: 10, height: 400, flexGrow: 0 },
    headerTitle: {
        marginVertical: 10
    },
    rowContainer: {
        marginBottom: 10
    },
    divider: {
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        marginVertical: 5
    },
    buttonLabel: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 18
    },
    topPadding: {
        paddingTop: 10
    },
});

export default OrderCheckoutScreen;
