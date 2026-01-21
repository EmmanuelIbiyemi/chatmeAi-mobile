import { StatusBar, View , Text, TouchableOpacity, Alert} from "react-native";
import "../../global.css"
import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer"
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useState } from "react";

import { LogOutIcon } from 'lucide-react-native'
import { User } from 'lucide-react-native'

import LogoutModal from "./logout";
import { router } from "expo-router"
export default function HomeLayout() {
  
  const [showLogout, setShowLogout] = useState(false);
   const handleLogout = () => {
    setShowLogout(false);
    router.replace("/(auth)/login")
   }
  return (
    <>
    <StatusBar barStyle={"light-content"} backgroundColor={'black'}/>
      <Stack

        screenOptions={{
        // drawer background color (gray)
        // drawerStyle: { backgroundColor: '#D1D5DB' }, // tailwind gray-300

        // header background (optional, keep consistent)
        headerStyle: { backgroundColor: 'black' },

        // make the hamburger icon (and other header icons) black
        headerTintColor: 'black',

        // ensure DrawerToggleButton uses black color
        // headerLeft: (props) => <DrawerToggleButton {...props} tintColor="white" />,

        headerRight: () => (
          <View className="flex-row items-center pr-4 space-x-3 gap-3">
            <TouchableOpacity activeOpacity={0.8} onPress={()=>router.push("/(aihome)/profile")}>
              <View className="w-14 h-14 rounded-2xl bg-transparent items-center justify-center shadow-md border border-yellow-400">
                <User color={"white"} size={20}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>setShowLogout(true)}>
              <View className="w-14 h-14 rounded-2xl bg-transparent items-center justify-center shadow-md border border-yellow-400">
                <LogOutIcon color={"white"}/>
              </View>
             </TouchableOpacity>
          </View>
        )
      }}
      >
        <Stack.Screen 
            name="home" 
            options={{
               title: "Chat Me",
               headerTitleStyle:{
                color:'white',
                fontSize:23,
                fontWeight:'bold'
               }
              //  headerShown:false
            }} 
          />
        <Stack.Screen 
            name="chatsec" 
            options={{
              title: "ChatSection",
               headerTitleStyle:{
                color:'white',
                fontSize:23,
                fontWeight:'bold'
               }
            }} 
          />
        <Stack.Screen 
            name="profile" 
            options={{
              title: "Profile",
              headerShown:false,
              presentation: "formSheet",
              gestureDirection: "vertical",
              animation : 'slide_from_bottom',
              sheetGrabberVisible : true,
              sheetInitialDetentIndex: 0,
              sheetAllowedDetents : [0.5,0.75,1],
              sheetCornerRadius:20,
              sheetElevation:24,
              sheetExpandsWhenScrolledToEdge:true
            }} 
          />
        <Stack.Screen 
            name="logout" 
            options={{
               title: "",
               headerTitleStyle:{
                color:'white',
                fontSize:23,
                fontWeight:'bold'
               }
              //  headerShown:false
            }} 
          />
        <Stack.Screen 
            name="terms" 
            options={{
               title: "",
               headerTitleStyle:{
                color:'white',
                fontSize:23,
                fontWeight:'bold'
               }
              //  headerShown:false
            }} 
          />
      </Stack>

       <LogoutModal
          visible={showLogout}
          onCancel={() => setShowLogout(false)}
          onConfirm={handleLogout}
        />
    </>
  );
}
