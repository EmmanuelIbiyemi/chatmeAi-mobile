// ...existing code...
import React from "react"
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native"
import { useState } from "react"
import { router } from "expo-router"
import Termsandco from "./terms"

type ProfileProps = {
  profileImage?: string
  firstName?: string
  lastName?: string
  email?: string
  onEdit?: () => void
  Change?: () => void
}

export default function Profile({
  profileImage,
  firstName = "First",
  lastName = "Last",
  email = "you@example.com",
  onEdit,
  Change,
}: ProfileProps) {
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase()

  const [showLogout, setShowLogout] = useState(false);
     const handleLogout = () => {
      setShowLogout(false);
    }


    const [showInpname, setInpname] = useState(false)
    const [showInpmail , setInpmail] = useState(false)
    const [editedname , setedit] = useState("")
    const [editmail , setMailedit] = useState("")
    onEdit=()=>{
        setInpname(true)
    }
    Change =()=>{
        setInpmail(true)
    }

    const hidenameinp =()=>{
        setInpname(false)
        setedit("")
    }
    const hidemailinp =()=>{
        setInpmail(false)
        setMailedit("")
    }

  return (
    <>
        <SafeAreaView className="flex-1 bg-black">
        <ScrollView contentContainerStyle={{ padding: 24 }}>
            <View className="items-center mt-6">
            {profileImage ? (
                <Image
                source={{ uri: profileImage }}
                className="w-40 h-40 rounded-full"
                accessibilityLabel="Profile image"
                />
            ) : (
                <View className="w-40 h-40 rounded-full bg-gray-700 items-center justify-center">
                <Text className="text-white text-4xl font-bold">{initials}</Text>
                </View>
            )}

            <Text className="text-white text-2xl font-extrabold mt-4">
                {firstName} {lastName}
            </Text>
            <Text className="text-gray-400 text-sm mt-1">{email}</Text>
            </View>

            <View className="mt-8 bg-[#0B0B0C] border border-yellow-400 rounded-2xl p-4">
            <Text className="text-gray-300 text-base font-semibold mb-2">
                Account
            </Text>
            <View className="mt-2 space-y-3">
                <View className="flex-col justify-between">
                    <View className="flex-row justify-between items-center py-3 px-3 rounded-md">
                        <View>
                            <Text className="text-white font-medium">Display name</Text>
                            <Text className="text-gray-400 text-sm">{firstName} {lastName}</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={onEdit}
                            className="bg-yellow-400 px-4 py-2 rounded-lg"
                        >
                            <Text className="text-black font-bold">Edit</Text>
                        </TouchableOpacity>

                    </View>

                    {
                        showInpname && (
                            <View className="gap-4">
                                <TextInput
                                    value={editedname}
                                    onChangeText={setedit}
                                    placeholder="Name"
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    returnKeyType="send"
                                    className="flex-1 text-white text-base max-h-py-3 px-3 border border-yellow-400 rounded-lg"
                                    accessibilityLabel="Message input"
                                />  
                                <View className="flex-row gap-4">
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={hidenameinp}
                                        className="bg-red-600 px-4 py-2 rounded-lg border border-gray-700"
                                    >
                                        <Text className="text-gray-200 font-semibold">Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={hidenameinp}
                                        className="bg-yellow-400 px-4 py-2 rounded-lg border border-gray-700"
                                    >
                                        <Text className="font-semibold color-black">Done</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                    
                </View>

                <View>
                    <View className="flex-row justify-between items-center py-3 px-3 rounded-md ">
                        <View>
                            <Text className="text-white font-medium">Email</Text>
                            <Text className="text-gray-400 text-sm">{email}</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={Change}
                            className="bg-transparent px-4 py-2 rounded-lg border border-gray-700"
                        >
                            <Text className="text-gray-200 font-semibold">Change</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        showInpmail && (
                            <View className="gap-4">
                                <TextInput
                                    value={editmail}
                                    onChangeText={setMailedit}
                                    placeholder="Email"
                                    placeholderTextColor="#9CA3AF"
                                    multiline
                                    returnKeyType="send"
                                    className="flex-1 text-white text-base max-h-py-3 px-3 border border-yellow-400 rounded-lg"
                                    // accessibilityLabel="Message input"
                                />  
                                <View className="flex-row gap-4 self-end">
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={hidemailinp}
                                        className="bg-red-600 px-4 py-2 rounded-lg border border-gray-700"
                                    >
                                        <Text className="text-gray-200 font-semibold">Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={hidemailinp}
                                        className="bg-yellow-400 px-4 py-2 rounded-lg border border-gray-700"
                                    >
                                        <Text className="font-semibold color-black">Done</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                </View>
            </View>
            </View>

            <View className="mt-6">
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={()=>setShowLogout(true)}
                className="w-full h-14 bg-yellow-400 rounded-2xl items-center justify-center"
            >
                <Text className="text-black text-lg font-bold">Terms & Condition</Text>
            </TouchableOpacity>
            </View>

            <View className="items-center mt-6">
            <Text className="text-gray-500 text-xs">
                App version 1.0 • Privacy • Terms
            </Text>
            </View>
        </ScrollView>
        </SafeAreaView>

        <Termsandco
            visible={showLogout}
            onCancel={() => setShowLogout(false)}
            onConfirm={() => setShowLogout(false)}
        />
    </>
  )
}