import { StyleSheet, Text, View, FlatList , Platform, KeyboardAvoidingView} from 'react-native'
import React, { useState , useRef} from 'react'
import Input from '@/components/input'
type Msg = { id: string; text: string; from: 'user' | 'bot' }

export default function ChatSection() {
  const [messages, setMessages] = useState<Msg[]>([])
  const listRef = useRef<FlatList<Msg> | null>(null)


  const handleSend = (text: string) => {
    const userMsg: Msg = { id: Date.now().toString(), text, from: 'user' }
    setMessages(prev => [...prev, userMsg])

    // optional: simulate bot reply (remove if not wanted)
    setTimeout(() => {
      const botMsg: Msg = {
        id: (Date.now() + 1).toString(),
        text: `Echo: ${text}`,
        from: 'bot',
      }
      setMessages(prev => [...prev, botMsg])
    }, 600)
  }

  const renderItem = ({ item }: { item: Msg }) => {
    const isUser = item.from === 'user'
    return (
      <View
        className={`px-4 py-2 my-2 max-w-[80%] ${
          isUser ? 'self-end bg-[#10A37F]' : 'self-start bg-[#27272A]'
        } rounded-lg`}
      >
        <Text className={`${isUser ? 'text-black' : 'text-white'} text-base`}>
          {item.text}
        </Text>
      </View>
    )
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 bg-black pt-4 px-4">
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={m => m.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        />

        {/* If no messages show a subtle placeholder */}
        {messages.length === 0 && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-400 text-lg text-center px-6">
              Start the conversation — type a message below.
            </Text>
          </View>
        )}
      </View>

      <Input onSend={handleSend} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({})