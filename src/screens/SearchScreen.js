import React ,{useState,useEffect}from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import SingleCharacter from '../components/SingleCharacter'


const SearchScreen = ({navigation}) => {
    const [data, setData] = useState([])
    const [input, setInput] = useState("")

    
    console.log(data);
    const [loading, setLoading] = useState(true)

    const fetchDetials = async() => {
        try {
            const response = await fetch(
                `https://www.breakingbadapi.com/api/characters?name=${input}`
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
    },[input])

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Search here"
                value={input}
                onChangeText={(text) => setInput(text)}
                
            />
            {loading ? (
                <Text style={styles.noData}>Loading...</Text>
            ) : (
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={(item) => item.char_id}
                    numColumns={2}
                    renderItem={({item}) => <SingleCharacter navigation={navigation} character={item}/>}
                />
            )}
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : "black",
        paddingHorizontal : 10,
        
    },
    input : {
        marginVertical : 10,
        marginTop : 10,
        height: 50,
        color: "white",
        backgroundColor : "black",
        borderColor : "white",
        borderWidth : 1,
        borderRadius : 5,
        padding : 10,
        fontSize : 20
    },
    noData : {
        fontSize : 22,
        color: "white",
        textAlign : "center"
    }
})
