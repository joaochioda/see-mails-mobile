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

  const convertToExpandable = (item) => {
    const itemEx = [{
      id: item.key, categoryName: item.val.subject,

      subCategory: [

        { id: item.key, name: item.val.message },
        {
          customInnerItem: (
            <View style={styles.mainView}>
              <View style={styles.view30Left}>
                <Text style={styles.textBoldMargin10}>{item.val.name}</Text>
                <Text style={styles.textBold} >{item.val.email}</Text>
              </View>
            </View>
          ),
          id: '1',
          name: '',
        }
      ]
    }
    ];

    if (itemEx !== null) {
      return itemEx;

    } else {
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
      <TouchableOpacity onPress={() => props.handleDelete(props.data.key)} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.Text style={{ transform: [{ scale: scale }], color: 'white' }}>
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
    <View style={{margin: 10}}>

    <Swipeable renderLeftActions={leftSwipe}>

      <ExpandableListView
        data={convertToExpandable(props.data)} // required
        onInnerItemClick={handleInnerItemClick}
        onItemClick={handleItemClick}
        customChevron={{}}
        itemContainerStyle={{ backgroundColor: "#3d405b", height: 40 }}
        itemLabelStyle={{ color: 'white' }}
        innerItemLabelStyle={{ color: '#e07a5f', backgroundColor: "#3d405b" }}
      />

    </Swipeable>
    </View>

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
    height: 40,
  },
  text: {
    fontSize: 14,
    color: "#e07a5f",
  },
  mainView: {
    flexDirection: 'column', backgroundColor: "#3d405b"
  },
  view30Left: {
    flexDirection: 'column', marginLeft: 30, backgroundColor: "#3d405b", margin: 5
  },
  view40Left: {
    flexDirection: 'column', marginLeft: 40, backgroundColor: "#3d405b"
  },
  textBoldMargin10: {
     color: '#e07a5f', fontWeight: "bold" , margin: 5
  },
  textBold: {
    color: '#e07a5f', fontWeight: "bold", margin: 5
  }
});
