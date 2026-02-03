// ...existing code...
import React, { useState , useEffect} from 'react'
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

import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "@jamsch/expo-speech-recognition";

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

  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error messsage:", event.message);
  });
  
  // --This is the record section
  const [recording, setRecord] = useState(false)
  const startRecording = async () => {
    try {
      ExpoSpeechRecognitionModule.requestPermissionsAsync().then((result) => {
      if (!result.granted) {
        console.warn("Permissions not granted", result);
        return;
      }
      // Start speech recognition
      ExpoSpeechRecognitionModule.start({
        lang: "en-US",
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
        requiresOnDeviceRecognition: false,
        addsPunctuation: false,
        contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
      });
    });
    } catch (e) {
      console.log(e);
    }
  };

  const stopRecording = async () => {
    try {
      ExpoSpeechRecognitionModule.stop();
    } catch (e) {
      console.log(e);
    }
  };

  recording === true ? console.log("Recording Started"):console.log("Record Ended")

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className=" absolute left-4 right-4 bottom-4 "
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
            multiline
            placeholderTextColor="#9CA3AF"
            returnKeyType="send"
            onSubmitEditing={send}
            className="flex-1 text-white text-base max-h-36 pr-2"
            accessibilityLabel="Message input"
            
          />

          {text.trim() === '' ? (
              <TouchableOpacity
                onPress={() => { recording ? stopRecording() : startRecording();}}
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