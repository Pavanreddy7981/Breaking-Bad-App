import React,{useEffect, useState} from 'react'
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import SingleCharacter from '../components/SingleCharacter'


const HomeScreen = ({navigation}) => {
    const [data, setData] = useState([])

    console.log(data);
    const [loading, setLoading] = useState(true)

    const fetchDetials = async() => {
        try {
            const response = await fetch(
                "https://www.breakingbadapi.com/api/characters?limit=10&offset=10"
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
    },[])
    if(loading){
        return(
            <View style={{
                flex: 1,
                justifyContent : "center",
                alignItems : "center"
            }}>
                <Text style={{fontSize : 20, color:"dodgerblue"}}>Loading...</Text>
            </View>
        )
    }
    return (
        <View style={styles.contianer}>
            <View style={styles.header}>
                <Text style={styles.appName}>The Breaking bad</Text>

                <View style={styles.icons}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Search")}
                    >
                        <Icon style={styles.icon} name="search1" size={23} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Favourite")}
                    >
                        <Icon name="heart" size={23} color="green"/>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={data}
                numColumns={2}
                renderItem={({item}) => <SingleCharacter navigation={navigation} character={item}/>}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    contianer : {
        flex: 1,
        backgroundColor : "black",
        paddingHorizontal : 10
    },
    header : {
        flexDirection : "row",
        justifyContent :"space-between",
        alignItems : "center",
        paddingHorizontal : 10,
        marginVertical : 10
    },
    appName : {
        fontSize : 23,
        color: "white",
        fontWeight : "bold"
    },
    icons  : {
        flexDirection : 'row',
        justifyContent : "space-between",
        alignItems : "center"
    },
    icon : {
        marginRight : 20
    }
})
