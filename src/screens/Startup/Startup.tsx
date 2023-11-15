import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { setDefaultTheme } from '../../store/theme';
import { ApplicationScreenProps } from '../../../@types/navigation';
import { useUserData } from '@/hooks/useUserData';

const Startup = ({ navigation }: ApplicationScreenProps) => {
  const { Layout } = useTheme();
  const userData = useUserData()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 2000),
    );
    await setDefaultTheme({ theme: 'default', darkMode: null });
    navigation.reset({
      index: 0,
      routes: [{ name: !!userData ? 'Main' : 'Auth' }],
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={[Layout.fill, Layout.screenContainer, Layout.center]}>
      <Brand />
    </View>
  );
};

export default Startup;
