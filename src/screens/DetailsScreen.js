import React,{useState, useEffect} from 'react'
import { Image, ImageBackground,ScrollView,  StyleSheet, Text, TouchableOpacity, View, Dimensions, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import SingleCharacter from '../components/SingleCharacter';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height / 2;

const DetailsScreen = ({navigation, route}) => {
    const character = route.params;
    const [data, setData] = useState([])

    console.log(data);
    const [loading, setLoading] = useState(true)

    const fetchDetials = async() => {
        try {
            const response = await fetch(
                "https://www.breakingbadapi.com/api/characters?limit=5&offset=5"
                )
            const json = await response.json()
            setData(json)
            setLoading(false)
            return () => response;
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
      fetchDetials()

      return () => fetchDetials;
    },[])
    
    return (
        <ScrollView key={character.char_id} contentContainerStyle={styles.contianer}>
            <ImageBackground source={{uri : character.img}}
            style={styles.imageContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrowleft" size={25} color="white"/>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Favourite")}
                    >
                        <Icon name="heart" size={25} color="green"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.profileImageContainer}>
                    <Image source={{uri : character.img}} resizeMode="cover" style={styles.image}/>
                    <Text numberOfLines={1} style={styles.name}>{character.name}</Text>
                    <Text style={styles.nickname}>{character.nickname}</Text>

                </View>
                
            </ImageBackground>
            <View style={styles.bottomContainer}>
                <View style={styles.portrayed}>
                    <Text style={styles.Potrayed}>Potrayed</Text>
                    <View style={styles.details}>
                        <Text style={styles.text}>{character.portrayed}</Text>
                        <Text style={styles.birthday}>{character.birthday}</Text>
                    </View>
                </View>

                <View style={styles.occupation}>
                    <Text style={styles.heading}>Occupation</Text>
                    {character.occupation.map((item, index) => (
                        <Text style={styles.occupationName} key={index}>{item}</Text>
                    ))}
                </View>

                <View style={styles.Appeared}>
                    <Text style={styles.title}>Appeared In</Text>
                    <FlatList 
                    horizontal
                    
                    data={character.appearance}
                    renderItem={({item,index}) => (
                        <View key={index} style={styles.season}>
                            <Text style={styles.seasonName}>Season</Text>
                            <Text style={styles.number}>{item}</Text>
                        </View>
                    )}
                    />
                </View>

                <View style={styles.otherCharacters}>
                        <Text style={styles.displaytitle}>Other Characters</Text>
                        <FlatList 
                            horizontal
                            data={data}
                            renderItem={({item}) => <SingleCharacter noFav navigation={navigation} character={item}/>}
                        />
                </View>
            </View>
        </ScrollView>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        height:  height,
        backgroundColor : "black",
        justifyContent : "center"
    },
    imageContainer : {
        height: height + 70,
        width: "100%",
        backgroundColor : "black"
    },
    header : {
        padding: 20,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center"
    },
    profileImageContainer : {
        
        width: "60%",
        height: "40%",
        marginHorizontal : 70,
        marginTop : 100,
        justifyContent : "center",
        alignItems : "center"
    },
    image : {
        width: "70%",
        height: "100%",
        borderRadius : 5
    },
    name : {
        width: "100%",
        fontSize : 20,
        fontWeight : "bold",
        color: "white",
        textAlign : "center"

    },
    nickname : {
        fontSize : 17,
        color: "white"
    },
    bottomContainer : {
        paddingHorizontal : 10,
        backgroundColor : "black"
    },
    portrayed : {
        marginVertical : 10
    },
    Potrayed : {
        fontSize : 16,
        color:  "green",
        fontWeight: "bold",
        
    },
    details  :{
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : "center"
    },
    text : {
        fontSize : 13,
        color: "white"
    },
    birthday : {
        fontSize : 13,
        color: "white"
    },
    occupation : {
        marginVertical : 10
    },
    heading : {
        color: "green",
        fontSize : 16,
        fontWeight : "bold"
    },
    occupationName : {
        fontSize : 13,
        color: "white",
    },
    Appeared : {
        marginVertical : 20,

    },
    title : {
        color: "green",
        fontSize : 16,
        fontWeight : 'bold'

    },
    season : {
        width: 80,
        height:  30,
        margin : 10,
        borderRadius:5,
        backgroundColor : 'gray',
        flexDirection : "row",
        justifyContent : 'center',
        alignItems : "center"
    },
    seasonName : {
        fontSize : 13,
        color:  "white",
        marginRight : 3
    },
    number : {
        color:  "white",
        fontSize : 13
    },
    otherCharacters : {
        marginVertical : 20,
    },
    displaytitle : {
        fontSize : 20,
        color: "white",
        fontWeight : 'bold'
    }



})
