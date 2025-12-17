// ...existing code...
import QuickActions from "@/components/quickactions";
import { Text, View, FlatList , Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState , useRef, useEffect } from 'react'
import Input from '@/components/input'
import ThinkingBubble from "@/components/animatedbubble"
type Msg = { id: string; text: string; from: 'user' | 'bot' }

export default function Home() {
    const [messages, setMessages] = useState<Msg[]>([])
    const listRef = useRef<FlatList<Msg> | null>(null)

    const APIKEY = process.env.GEMINI_APIKEY

    // keep API call unchanged, just return parsed text so we can append reliably
     const callGenAI = async (text: any) => {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDK8LfV5QqIsWgWIDjamuYe3rZOCsXOR20`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "contents": [
                  {
                    "parts": [
                      {
                        "text": text
                      }
                    ]
                  }
                ]
            }),
          }
        );

        const data = await res.json();
        console.log(data)
        const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        return result;
        
      } catch (err) {
        console.error(err);
        return "Error calling GenAI";
      }
    };

    // handle send: append user immediately, await AI result, then append bot reply
    async function handleSend (text: string)  {
      const userMsg: Msg = { id: Date.now().toString(), text, from: 'user' }
      setMessages(prev => [...prev, userMsg])

      const aiText = await callGenAI(text)

      const botMsg: Msg = {
        id: (Date.now() + 1).toString(),
        text: `**ChatAi**: ${aiText}`,
        from: 'bot',
      }
      setMessages(prev => [...prev, botMsg])
    }
  
    // auto-scroll whenever messages change
    useEffect(() => {
      listRef.current?.scrollToEnd({ animated: true })
    }, [messages])

    // helper: render parts with **bold** handling
    const renderMessageText = (text: string, isUser: boolean) => {
      const parts = text.split(/(\*\*[^*]+\*\*)/g)
      return parts.map((part, idx) => {
        const m = part.match(/^\*\*(.+)\*\*$/)
        if (m) {
          return (
            <Text
              key={idx}
              className={isUser ? "text-black font-bold" : "text-white font-bold"}
            >
              {m[1]}
            </Text>
          )
        }
        return (
          <Text key={idx} className={isUser ? "text-black" : "text-white"}>
            {part}
          </Text>
        )
      })
    }

    const renderItem = ({ item }: { item: Msg }) => {
      const isUser = item.from === 'user'
      return (
        <View
          className={`px-4 py-2 my-2 max-w-[80%] ${isUser ? 'self-end bg-yellow-400' : 'self-start bg-[#27272A]'} rounded-lg`}
        >
          {
            item.from === 'bot'
                ? (item.text.trim() === '' ? <ThinkingBubble /> : <Text className="text-base">{renderMessageText(item.text, isUser)}</Text>)
                : <Text className="text-base">{renderMessageText(item.text, isUser)}</Text>
          }
        </View>
      )
    }
  
    return (
      <View
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
          />

  
          {messages.length === 0 && (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-400 text-lg text-center px-6">
                Start the conversation — type a message below.
              </Text>
            </View>
          )}
        </View>
  
        <Input onSend={handleSend} />
      </View>
    )
  
}
