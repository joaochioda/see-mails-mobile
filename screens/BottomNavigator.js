import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UnreadedMail from './UnreadedMail';
import ReadedMail from './ReadedMail';
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();

const firebaseConfig = {
	apiKey: "AIzaSyDLbQeqLKddeUfRf_5VvaoJft1lRyxG998",
	authDomain: "portfolio-joao.firebaseapp.com",
	databaseURL: "https://portfolio-joao.firebaseio.com",
	projectId: "portfolio-joao",
	storageBucket: "portfolio-joao.appspot.com",
	messagingSenderId: "149462281641",
	appId:
		"149462281641-r23b58n15ima692ehr55fao69u98vck4.apps.googleusercontent.com",
};

function MyTabs(props) {
	const [mails, setMails] = useState([]);
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}

	useEffect(() => {
    let isMounted = true;
		const array = [];
		firebase
			.database()
			.ref("messages")
			.once("value")
			.then((c) => {
				c.forEach(t => {
					array.push({ key: t.key, val: t.val() });
        });
        if (isMounted) {
          setMails(array);
        }

      });
      return () => { isMounted = false };
	}, []);



	firebase.database().ref('messages').on('child_added', (data) => {
		if (data !== null && data !== undefined && !mails.find(m => m.key === data.key)) {
			const array = [...mails, { key: data.key, val: data.val() }];
			setMails(array);

		};

	});

	firebase.database().ref('messages').on("child_removed", function (snapshot) {
		if (snapshot !== null && snapshot !== undefined) {
			const array = mails.filter(c => c.key !== snapshot.key);
			setMails(array);
		}
  });
  
  firebase.database().ref('messages').on("child_changed", function (snapshot) {
		if (snapshot !== null && snapshot !== undefined) {
			const newMail = mails.map(m=> m.key === snapshot.key ?  { key: snapshot.key, val: snapshot.val() } : m)
      setMails(newMail);
    }
	});


	function deleteMail(key) {
		let userRef = firebase.database().ref("messages/" + key);
		userRef.remove();
	}

  function handleRead(key) {
      const newMail = mails.filter(m=> m.key === key)[0].val;
      const userRef = firebase.database().ref("messages/" + key);
      newMail.read = true;
      userRef.set(newMail);
  }

  return (
    <Tab.Navigator
      initialRouteName="Unread"
      activeColor="#e07a5f"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: '#ffff' }}
    >
      <Tab.Screen
        name="Unread"
        children={() => <UnreadedMail userName={props.userName} photo={props.photo} login={props.login} mails={mails.filter(m => !m.val.read)} deleteMail={(item) => deleteMail(item)} handleRead={(item) => handleRead(item)}/>}
        options={{
          tabBarLabel: 'Unread',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="mailbox" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Readed"
        children={() => <ReadedMail userName={props.userName} photo={props.photo} login={props.login}  mails={mails.filter(m => m.val.read)} deleteMail={(item) => deleteMail(item)}/> }
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
