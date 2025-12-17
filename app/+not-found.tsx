import { View, Text  , StyleSheet} from 'react-native'
import React , { useEffect }from 'react'
import { router } from 'expo-router';

import { SafeAreaView } from 'react-native-safe-area-context'

export default function Notfound() {
    useEffect(()=>{
        const timer = setTimeout(() => {
            router.replace("/");
        }, 700)

        return () => clearTimeout(timer);
    }); 

  return (
    <SafeAreaView style={styles.top}>
        <View>
            <Text>
                Sorry we can't find this route
            </Text>
        </View>
    </SafeAreaView>
    
  )
}


const styles = StyleSheet.create({
    top:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    }
})