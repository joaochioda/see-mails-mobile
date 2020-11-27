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
  console.log(props.data);

  const convertToExpandable = (item) => {
    const itemEx = [{
      			id: item.key, categoryName: item.val.subject,
      
      			subCategory: [
      
              { id: item.key, name:item.val.message },
              {
                					customInnerItem: (
                						<View style={{ flexDirection: 'column', backgroundColor: "#3d405b" }}>
                							<Text style={{ color: '#e07a5f', margin: 10, fontWeight: "bold" }}>{item.val.name}</Text>
                							<View style={{ flexDirection: 'column', marginLeft: 10, backgroundColor: "#3d405b" }}>
                
                								<Text style={{ color: '#e07a5f', fontWeight: "bold" }} >{item.val.email}</Text>
                							</View>
                						</View>
                					),
                					id: '1',
                					name: '',
                				}
      			]
      		}
          ];
    console.log(itemEx);

    if (itemEx !== null ) {
      console.log('retorna o item poxa')
      return itemEx;

    } else {
      console.log('retornou nada');
      return [];
    }
  }
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

  function handleItemClick({ index }) {
  };

  function handleInnerItemClick({ innerIndex, item, itemIndex }) {
  };

  return (
    <Swipeable renderLeftActions={leftSwipe}>
      		<ExpandableListView
									data={convertToExpandable(props.data)} // required
									onInnerItemClick={handleInnerItemClick}
									onItemClick={handleItemClick}
									customChevron={{}}
									itemContainerStyle={{ backgroundColor: "#3d405b" }}
									itemLabelStyle={{ color: 'white' }}
									innerItemLabelStyle={{ color: '#e07a5f', backgroundColor: "#3d405b" }}
								/>
      {/* <View style={styles.container}>
        <Text style={styles.text}>My name is {props.data.val.name}.</Text>
      </View> */}
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
  },
  text: {
		fontSize: 14,
		color: "#e07a5f",
	},
});

//// const mountContent = (arr) => {
// 	let items = [];
// 	arr.forEach((array, idx) => {
// 		items[idx] = [{
// 			id: array.key, categoryName: array.val.subject,

// 			subCategory: [

// 				{ id: idx + 1, name: array.val.message },
// 				{
// 					customInnerItem: (
// 						<View style={{ flexDirection: 'column', backgroundColor: "#3d405b" }}>
// 							<Text style={{ color: '#e07a5f', margin: 10, fontWeight: "bold" }}>{array.val.name}</Text>
// 							<View style={{ flexDirection: 'column', marginLeft: 10, backgroundColor: "#3d405b" }}>

// 								<Text style={{ color: '#e07a5f', fontWeight: "bold" }} >{array.val.email}</Text>
// 							</View>
// 						</View>
// 					),
// 					id: '1',
// 					name: '',
// 				}
// 			]
// 		}
// 		];
// 	}
// 	);
// 	setCONTENT(items);

// }