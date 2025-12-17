import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import { useRouter } from "expo-router"

export default function Index() {
  const router = useRouter()
  return (
    <View className="bg-black flex-1 justify-between">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-white text-3xl font-bold text-center mb-3">
          Welcome to ChatMe Ai
        </Text>
        <Text className="text-gray-300 text-base text-center font-semibold">
          Your AI companion for chats, code, images and more.
        </Text>
      </View>

      <View className="w-full items-center pb-12">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.replace("/(auth)/login")}
          accessibilityRole="button"
          accessibilityLabel="Get started"
          className="w-[90%] h-16 bg-yellow-400 rounded-2xl items-center justify-center shadow-lg"
        >
          <Text className="text-black text-lg font-bold">Get Started</Text>
        </TouchableOpacity>
      </View>
       </View>
  )
}