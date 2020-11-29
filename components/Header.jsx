import React from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";


const Header = (props) => {
    return (
        <View style={styles.header}>
            <Image
                style={styles.tinyLogo}
                source={{ uri: props.photo }}
            />
            <Text style={styles.textHeader}>
                {`Hi, ${props.userName}`}
            </Text>
            <Button
                title="Sign out"
                onPress={() => props.login()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
      width: 80,
      height: 80,
      borderRadius: 50,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 50,
    },
    textHeader: {
      fontSize: 25,
      color: "#e07a5f",
    },
  })

export default Header;