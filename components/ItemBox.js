import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ExpandableListView } from 'react-native-expandable-listview';


const SCREEN_WIDTH = Dimensions.get('window').width;

const ItemBox = (props) => {
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.Text style={{transform: [{scale: scale}]}}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderLeftActions={leftSwipe}>
      		{/* <ExpandableListView
									data={CONTENT[idx]} // required
									onInnerItemClick={handleInnerItemClick}
									onItemClick={handleItemClick}
									customChevron={{}}
									itemContainerStyle={{ backgroundColor: "#3d405b" }}
									itemLabelStyle={{ color: 'white' }}
									innerItemLabelStyle={{ color: '#e07a5f', backgroundColor: "#3d405b" }}
								/> */}
      <View style={styles.container}>
        <Text style={styles.text}>My name is {props.data.val.name}.</Text>
      </View>
    </Swipeable>
  );
};

export default ItemBox;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    backgroundColor: '#3d405b',
    justifyContent: 'center',
    padding: 32,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 80,
  },
  text: {
		fontSize: 14,
		color: "#e07a5f",
	},
});