import { useTheme } from '@/hooks';
import { Colors } from '@/theme/Variables';
import React from 'react';
import { View, ActivityIndicator, Platform } from 'react-native';
import Spinner from 'react-native-spinkit'

type LoaderProps = {
    color?: string;
};

const FullScreenLoader = ({ color }: LoaderProps) => {
    const { Layout } = useTheme();
    return (
        <View style={[Layout.absolute, Layout.center, Layout.fullSize]}>
            {Platform.OS === 'ios' ? (
                <Spinner style={{ width: 80, height: 80 }} isVisible={true} size={80} type={'ChasingDots'} color={color} />
            ) : (
                <ActivityIndicator color={color} size={'large'} style={{ width: 80, height: 80 }} />
            )
            }
        </View>
    );
};

FullScreenLoader.defaultProps = {
    color: Colors.primary,
};

export default FullScreenLoader;
