import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import SingleCharacter from '../components/SingleCharacter';
import { selectFavCharacters } from '../slices/favSlice';


const FavouriteScreen = ({navigation}) => {
    const favCharacters = useSelector(selectFavCharacters)
    console.log("FAV", favCharacters);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.screenName}>Favourites</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="close" size={23} color="white"/>
                </TouchableOpacity>
            </View>

             <FlatList 
                keyExtractor={(item) => item.char_id}
                showsVerticalScrollIndicator={false}
                data={favCharacters}
                numColumns={2}
                renderItem={({item}) => <SingleCharacter fav navigation={navigation} character={item}/>}
            />
        </SafeAreaView>
    )
}

export default FavouriteScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : "black",
        paddingHorizontal : 10,
        
    },
    header : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        marginVertical : 10,
        paddingHorizontal : 10
    },
    screenName : {
        fontSize : 25,
        fontWeight : "bold",
        color:  "green"
    }
})
