import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Amplify } from 'aws-amplify';
import { awsConfigs } from '../config/aws-configs';
import { colors } from '../util/constants';

Amplify.configure(awsConfigs);

export default function Layout() {
  return (
    <Tabs
      screenOptions={{ headerTitleAlign: 'center' }}
      initialRouteName="index"
      backBehavior="history"
    >
      <Tabs.Screen
        name="video/[id]"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          headerStyle: {
            backgroundColor: colors.defaultBg,
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? colors.focused : colors.blurred }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={20}
              color={focused ? colors.focused : colors.blurred}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="createContent"
        options={{
          //title: 'New Post',
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
          unmountOnBlur: true,
          tabBarButton: (props) => (
            <View style={{ justifyContent: 'center' }}>
              <FontAwesome.Button
                onPress={props.onPress}
                onBlur={props.onBlur}
                size={20}
                name="plus"
                iconStyle={{ marginRight: 0, padding: 0 }}
                style={{
                  backgroundColor: colors.defaultTheme,
                  width: 45,
                  flexDirection: 'column',
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="userProfile"
        options={{
          //title: 'User',
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? colors.focused : colors.blurred }}>
              Me
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={20}
              color={focused ? colors.focused : colors.blurred}
            />
          ),
        }}
      />
    </Tabs>
  );
}
