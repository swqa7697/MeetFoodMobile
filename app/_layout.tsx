import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/Ionicons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerTitleAlign: 'center' }}>
      <Tabs.Screen
        name="video/[id]"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          headerStyle: {
            backgroundColor: '#f6f6f6',
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#231f20' : '#999693' }}>Home</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={20}
              color={focused ? '#231f20' : '#999693'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="createContent"
        options={{
          title: 'New Post',
          tabBarButton: (props) => (
            <View style={{ justifyContent: 'center' }}>
              <FontAwesome.Button
                onPress={props.onPress}
                onBlur={props.onBlur}
                size={20}
                name="add"
                style={{
                  paddingRight: 0,
                  backgroundColor: '#ff5722',
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
          title: 'User',
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#231f20' : '#999693' }}>Me</Text>
          ),
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="person"
              size={20}
              color={focused ? '#231f20' : '#999693'}
            />
          ),
        }}
      />
    </Tabs>
  );
}