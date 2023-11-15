import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import { useTheme } from '../../hooks';
import { ApplicationScreenProps } from '../../../@types/navigation';
import FullScreenLoader from '@/components/CommonComponents/FullScreenLoader';
import { useTranslation } from 'react-i18next';
import FZInput from '@/components/CommonComponents/FZInput';
import FZButton from '@/components/CommonComponents/FZButton';
import { Colors } from '@/theme/Variables';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '@/store/theme';
import { UserDataType } from 'types/theme';
import { useUserData } from '@/hooks/useUserData';

const SignupScreen = ({ navigation }: ApplicationScreenProps) => {
    const { Layout, Gutters, Images, Fonts } = useTheme();
    const userData = useUserData()
    const dispatch = useDispatch();
    const { t } = useTranslation(['login', 'common']);
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [fullname, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [cnfpassword, setCnfPassword] = useState('');

    useEffect(() => {
        if(userData) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main'}],
              });
        }
    }, [userData]);

    const goToLogin = () => {
        navigation?.goBack();
    }

    const onSignupPress = () => {
        if (email.length <= 0 || password.length <= 0 || fullname.length <= 0) {
            Alert.alert(t('common:Empty_Fields_Msg'));
            return;
        }
        setLoading(true)
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const user_uid = response.user._user.uid;
                setLoading(false)
                const data = {
                    email: email,
                    fullname: fullname,
                    id: user_uid
                };
                dispatch(setUserData({ userData: data }));
            }).catch((error) => {
                const { message } = error;
                alert(message);
                setLoading(false)
            })
    }

    const renderAppLogo = () => (
        <View style={[Layout.center, screenStyles.logoContainer]}>
            <Image
                testID={'login-logo'}
                style={Layout.logo}
                source={Images.logo}
            />
            <Text style={[Fonts.textBold, Fonts.titleSmall]}>FoodZone</Text>
        </View>
    )

    const renderButton = () => (
        <View style={[Layout.fullWidth]}>
            <FZButton onPress={() => onSignupPress()}>
                <Text style={[Fonts.textBold, Fonts.textRegular, screenStyles.buttonLabel]}>{t('login:signup')}</Text>
            </FZButton>
        </View>
    );

    const noAccountLabel = () => (
        <View style={screenStyles.noAccountView}>
            <Text style={[Fonts.textBold, Fonts.textSmall]}>{t('login:alreadyAccount')} <Text style={screenStyles.noAccountLabel} onPress={goToLogin}>{t('login:login')}</Text></Text>
        </View>
    );

    const renderBody = () => (
        <View style={[Layout.fullWidth, screenStyles.body, Layout.center]}>
            <Text style={[Fonts.textBold, Fonts.titleSmall, screenStyles.title]}>{t('login:signup')}</Text>
            <FZInput placeholder={t('login:email')} value={email} onTextChange={setEmail} />
            <FZInput placeholder={t('login:fullname')} value={fullname} onTextChange={setFullName} />
            <FZInput placeholder={t('login:password')} value={password} onTextChange={setPassword} />
            <FZInput placeholder={t('login:cnfPassword')} value={cnfpassword} onTextChange={setCnfPassword} />
            {renderButton()}
            {noAccountLabel()}
        </View>
    );

    return (
        <View style={[Layout.screenContainer, Layout.alignItemsCenter]}>
            {isLoading && <FullScreenLoader />}
            <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[Layout.center, Layout.fullSize, Layout.screenPadding]} style={Layout.fullWidth}>
                {renderAppLogo()}
                {renderBody()}
            </KeyboardAwareScrollView>
        </View>
    );
};

const screenStyles = StyleSheet.create({
    logoContainer: {
        top: 50,
        position: 'absolute'
    },
    body: {
        marginTop: 60,
    },
    buttonLabel: {
        color: Colors.white
    },
    noAccountView: {
        marginTop: 10,
    },
    noAccountLabel: {
        color: Colors.secondary
    },
    title: {
        alignSelf: 'flex-start',
        marginVertical: 20
    }
});

export default SignupScreen;
