import React, {useState} from 'react'
import { StyleSheet, Text, View,Image, TouchableOpacity, Dimensions } from 'react-native'
import  Icon  from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import  {SET_FAV_CHARACTERS} from "../slices/favSlice"

const width = Dimensions.get("window").width / 2 - 30
const height = Dimensions.get("window").height / 3


const SingleCharacter = ({character,navigation,noFav, fav}) => {
    const [favourite, setFavourite] = useState(false)
    const dispatch = useDispatch();

    const addFavChar = () => {
        dispatch({
            type : SET_FAV_CHARACTERS,
            payload : character
        })
        setFavourite(true)
    }

    return (
        <View key={character?.char_id} style={styles.container}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', character)}
        >
            <Image source={{uri : character.img}} 
                style={styles.image} 
            />
        </TouchableOpacity>
            
            <View style={styles.characterNameContianer}>
                <Text numberOfLines={1} style={styles.charName}>{character.name}</Text>
                {!noFav && 
                <TouchableOpacity activeOpacity={0.5}
                    
                >
                {fav ? (
                        <Icon name="heart" size={22} color="green"/>
                ) : (
                    <>
                        {favourite ? (
                     <Icon onPress={() => setFavourite(false)} name="heart" size={22} color="green"/>
                ) : (
                     <Icon onPress={addFavChar} name="hearto" size={22} color="white"/>
                )}
                    </>
                )}
                
                   
                </TouchableOpacity>
                }
            </View>

            <Text style={styles.location}>{character.nickname}</Text>
        </View>
    )
}

export default SingleCharacter

const styles = StyleSheet.create({
    container : {
        width: width  ,
        height: height,
        marginVertical : 25,
        marginHorizontal : 10
    },
    image : {
        width: width,
        height: height - 60,
        borderRadius : 5
    },
    characterNameContianer : {
        flex: 1,
        flexDirection : 'row',
        justifyContent : "space-between",
        alignItems : "center"
    },
    charName : {
        width : "80%",
        fontSize : 16,
        fontWeight : "bold",
        color:  "white"
    },
    location : {
        fontSize : 14,
        color: "white"
    }
})
