import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    FlatList,
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
import { RestourantsListItemType } from 'types/theme';

const HomeScreen = ({ navigation }: ApplicationScreenProps) => {
    const { t } = useTranslation(['common']);
    const {
        Common,
        Fonts,
        Layout,
        Images,
    } = useTheme();
    const dispatch = useDispatch();
    const userData = useUserData()
    const [restourantsList, setRestourantsList] = useState([]);

    const [getRestourants, { data, isSuccess, isLoading, isFetching }] =
        useLazyGetRestourantsQuery();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `Welcome ${userData?.fullname}`,
            headerShown: true,
            headerStyle: {
                backgroundColor: Colors.white,
                borderBottomColor: Colors.white,
                shadowOffset: {
                    height: 0,
                    width: 0
                }
            },
            headerRight: () => (
                <FZImage onPress={showLogoutAlert} source={Images.icons.logout} />
            ),
        });
    }, []);

    const showLogoutAlert = () =>
        Alert.alert(
            t('common:Logout'),
            t('common:Sure_Hint'),
            [
                {
                    text: t('common:Cancel'),
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: t('common:Confirm'),
                    onPress: onLogoutConfirm,
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
            },
        );

    const onLogoutConfirm = () => {
        dispatch(setUserData({ userData: null }));
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Auth' }],
            });
        }, 100);
    }

    useEffect(() => {
        getRestourants();
    }, []);

    useEffect(() => {
        setRestourantsList(data);
    }, [data]);

    const goToMenu = (selectedItem: RestourantsListItemType) => {
        navigation.navigate('Menu', {
            restourantData: selectedItem
        })
    }

    const resItemView = ({ item }) => {
        return (
                <RestourantItem restourantData={item} onItemPress={() => goToMenu(item)}/>
        );
    }

    const renderBody = () => (
        <View style={screenStyle.innerContainer}>
            <FlatList
                data={restourantsList}
                renderItem={resItemView}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                style={screenStyle.listStyle}
                contentContainerStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                ListHeaderComponent={<PopularRestourants resList={restourantsList} onItemPress={(item) => goToMenu(item)}/>}
            />
        </View>
    );

    return (
        <View
            style={[Layout.screenContainer, Layout.screenPadding]}
        >
            {isLoading && <FullScreenLoader />}
            {restourantsList?.length > 0 && renderBody()}
        </View>
    );
};

const screenStyle = StyleSheet.create({
    innerContainer: {
        flex: 1
    },
    listStyle: { marginTop: 15, flex: 1 }
});

export default HomeScreen;
