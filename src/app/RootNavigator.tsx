import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import ComponentGalleryScreen from './gallery/ComponentGalleryScreen';
import ComponentPreviewScreen from './gallery/ComponentPreviewScreen';

export type RootStackParamList = {
  ComponentGallery: undefined;
  ComponentPreview: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          fullScreenGestureEnabled: Platform.OS === 'ios',
        }}
      >
        <Stack.Screen
          name="ComponentGallery"
          component={ComponentGalleryScreen}
          options={{ headerShown: false, title: '组件' }}
        />
        <Stack.Screen
          name="ComponentPreview"
          component={ComponentPreviewScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
