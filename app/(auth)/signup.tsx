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

export default function Signup() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const handleSignup = () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Please fill all fields")
      return
    }
    if (!(email.length > 13 && email.includes("@") && email.includes(".com"))) {
      console.log("Check your email")
      return
    }

    // password must be > 8 chars
    if (password.length <= 8) {
      console.log("Check your password")
      return
    }
    if (password !== confirm) {
      Alert.alert("Passwords do not match")
      return
    }
    // TODO: wire real signup logic
    Alert.alert("Account created", `Welcome, ${name}`)
    router.replace("/(aihome)/home")
  }

  const handleGoogle = () => {
    // TODO: start Google OAuth
    Alert.alert("Google Sign-Up", "Start Google OAuth flow")
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-full max-w-[520px]">
            <Text className="text-white text-4xl font-extrabold text-center mb-2">
              Create account
            </Text>
            <Text className="text-gray-400 text-center text-base font-medium mb-6">
              Join ChatMe Ai — chats, images, code and more.
            </Text>

            <View className="bg-[#0B0B0C] border border-gray-800 rounded-3xl p-6 shadow-lg">
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Full name"
                placeholderTextColor="#6B7280"
                autoCapitalize="words"
                className="text-white text-base bg-transparent border border-gray-800 rounded-lg px-4 py-3 mb-3"
                accessibilityLabel="Full name"
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-white text-base bg-transparent border border-gray-800 rounded-lg px-4 py-3 mb-3"
                accessibilityLabel="Email"
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#6B7280"
                secureTextEntry
                className="text-white text-base bg-transparent border border-gray-800 rounded-lg px-4 py-3 mb-3"
                accessibilityLabel="Password"
              />

              <TextInput
                value={confirm}
                onChangeText={setConfirm}
                placeholder="Confirm password"
                placeholderTextColor="#6B7280"
                secureTextEntry
                className="text-white text-base bg-transparent border border-gray-800 rounded-lg px-4 py-3"
                accessibilityLabel="Confirm password"
              />

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleSignup}
                className="w-full h-14 bg-yellow-400 rounded-xl items-center justify-center mt-6"
                accessibilityRole="button"
                accessibilityLabel="Create account"
              >
                <Text className="text-black text-lg font-bold">Create account</Text>
              </TouchableOpacity>

              <View className="flex-row items-center my-4">
                <View className="flex-1 h-px bg-gray-800" />
                <Text className="text-gray-400 mx-3">Or sign up with</Text>
                <View className="flex-1 h-px bg-gray-800" />
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleGoogle}
                className="w-full h-14 bg-transparent border border-gray-700 rounded-xl flex-row items-center justify-center"
                accessibilityRole="button"
                accessibilityLabel="Sign up with Google"
              >
                <View className="w-9 h-9 rounded-full bg-white items-center justify-center mr-3">
                  <Text className="text-black text-lg font-bold">G</Text>
                </View>
                <Text className="text-white text-base font-semibold">
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => Alert.alert("Terms", "Show terms and privacy")}
                className="items-center mt-4"
              >
                <Text className="text-gray-400 text-sm">
                  By creating an account you agree to our Terms and Privacy.
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-400">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                <Text className="text-white font-semibold ml-1">Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

