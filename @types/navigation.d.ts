import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type MainParamsList = {
  Home: undefined;
  Menu:  NavigatorScreenParams;
  OrderCheckout: NavigatorScreenParams;
};

export type AuthParamsList = {
  Login: undefined;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
  Auth: NavigatorScreenParams<AuthParamsList>;
  Login: NavigatorScreenParams<{}>;
  Signup:  NavigatorScreenParams<{}>;
  Home:  NavigatorScreenParams<{}>;
  Menu:  NavigatorScreenParams<{}>;
  OrderCheckout: NavigatorScreenParams;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
