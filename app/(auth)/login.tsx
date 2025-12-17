// ...existing code...
import React, { useState } from "react"
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { useRouter } from "expo-router"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // replace with real auth logic
    if (!email || !password) {
      Alert.alert("Please enter email and password")
      return
    }
    // Alert.alert("Logging in", email)
    router.replace("/(aihome)/home") // example navigation after login
  }

  const handleGoogle = () => {
    // stub for OAuth flow
    Alert.alert("Google Sign-In", "Start Google OAuth flow")
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 items-center justify-center px-6">
          {/* decorative header */}
          <View className="w-full max-w-[520px]">
            <Text className="text-white text-4xl font-extrabold text-center mb-2">
              Welcome back
            </Text>
            <Text className="text-gray-300 text-center text-base font-semibold mb-6">
              Sign in to continue to ChatMe Ai
            </Text>

            <View className="bg-[#0B0B0C] border border-gray-800 rounded-3xl p-6 shadow-lg">
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-white text-base bg-transparent border border-gray-800 rounded-lg px-4 py-3 mb-3"
                accessibilityLabel="Email input"
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#6B7280"
                secureTextEntry
                className="text-white text-base bg-transparent border border-gray-800 rounded-lg px-4 py-3"
                accessibilityLabel="Password input"
              />

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleLogin}
                className="w-full h-14 bg-yellow-400 rounded-xl items-center justify-center mt-6"
                accessibilityRole="button"
                accessibilityLabel="Sign in"
              >
                <Text className="text-black text-lg font-bold">Sign in</Text>
              </TouchableOpacity>

              <View className="flex-row items-center my-4">
                <View className="flex-1 h-px bg-gray-800" />
                <Text className="text-gray-400 mx-3">Or continue with</Text>
                <View className="flex-1 h-px bg-gray-800" />
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleGoogle}
                className="w-full h-14 bg-transparent border border-gray-700 rounded-xl flex-row items-center justify-center"
                accessibilityRole="button"
                accessibilityLabel="Sign in with Google"
              >
                <View className="w-9 h-9 rounded-full bg-white items-center justify-center mr-3">
                  <Text className="text-black text-lg font-bold">G</Text>
                </View>
                <Text className="text-white text-base font-semibold">
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Alert.alert("Forgot password")}
                className="items-center mt-4"
              >
                <Text className="text-gray-400">Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-400">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                <Text className="text-white font-semibold ml-1">Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = {}
// ...existing