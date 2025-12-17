// ...existing code...
import React, { useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'

import { Send, Mic, SquareStop } from 'lucide-react-native'

export default function Input({
  onSend,
}: {
  onSend?: (text: string) => void
}) {
  const [text, setText] = useState('')

  const send = () => {
    const t = text.trim()
    if (!t) return
    onSend?.(t)
    setText('')
  }
  
  // --This is the record section
  const [recording, setRecord] = useState(false)
  recording === true ? console.log("Recording Started"):console.log("Record Ended")

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="absolute left-4 right-4 bottom-4 "
    >
      <View className=" flex-row items-end space-x-3 justify-center gap-3">
        {/* Attachment is separate */}
        <TouchableOpacity
          onPress={() => Alert.alert('Attachment')}
          className="w-12 h-12 rounded-full bg-[#2B2B2F] items-center justify-center"
          accessibilityLabel="Add attachment"
        >
          <Text className="text-gray-300 text-lg">＋</Text>
        </TouchableOpacity>

        <View className="flex-1 bg-[#343541] rounded-full flex-row items-center px-3 py-2">
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Ask ChatMe"
            placeholderTextColor="#9CA3AF"
            multiline
            returnKeyType="send"
            onSubmitEditing={send}
            className="flex-1 text-white text-base max-h-36 pr-2"
            accessibilityLabel="Message input"
          />

          {text.trim() === '' ? (
              <TouchableOpacity
              onPress={() => setRecord(!recording)}
              className="ml-2 w-12 h-12 items-center justify-center rounded-full bg-white"
              activeOpacity={1}
            >
              {recording ? (
                <SquareStop color="black" size={20} />
              ) : (
                <Mic color="black" size={20} />
              )}
            </TouchableOpacity>
            ) : (
            <TouchableOpacity
              onPress={send}
              className="ml-2 p-2 bg-[#10A37F] rounded-full w-12 h-12 justify-center items-center "
              accessibilityLabel="Send message"
              activeOpacity={0.8}
            >
              {/* <Text className="text-white text-lg self-center">➤</Text> */}
              <Send color={"white"} size={20}/>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
// ...existing