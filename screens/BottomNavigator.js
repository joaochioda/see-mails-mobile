import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './ProfileScreen';
import LoginScreen from './LoginScreen';

const Tab = createMaterialBottomTabNavigator();

function MyTabs(props) {
  return (
    <Tab.Navigator
      initialRouteName="Unread"
      activeColor="#e07a5f"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: '#ffff' }}
    >
      <Tab.Screen
        name="Unread"
        children={() => <ProfileScreen userName={props.userName} photo={props.photo} login={props.login}/>}
        options={{
          tabBarLabel: 'Unread',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="mailbox" color={color} size={26} />
          ),
        }}
      />
        <Tab.Screen
        name="Readed"
        children={() => <LoginScreen userName={props.userName} photo={props.photo} login={props.login}/>}
        options={{
          tabBarLabel: 'Readed',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="email-check" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
