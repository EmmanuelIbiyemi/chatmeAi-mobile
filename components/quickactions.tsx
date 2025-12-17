import React, { useState, useMemo } from "react"
import { View, Text, TouchableOpacity, FlatList } from "react-native"

const help_short = [
  { id: "1", text: "Create image" },
  { id: "2", text: "Help me write" },
  { id: "3", text: "Code" },
  { id: "4", text: "Suprise me" },
  { id: "5", text: "Summarize text" },
  { id: "6", text: "Analyze image" },
  { id: "7", text: "Make a plan" },
  { id: "8", text: "Brainstorm" },
  { id: "9", text: "Analyze data" },
  { id: "10", text: "Get advice" },
]

export default function QuickActions({
  onPressItem,
}: {
  onPressItem?: (item: { id: string; text: string }) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const initialCount = 4 // first two rows (2 cols x 2 rows)

  const data = useMemo(() => {
    return expanded ? help_short : help_short.slice(0, initialCount)
  }, [expanded])

  const renderItem = ({ item }: { item: { id: string; text: string } }) => (
    <TouchableOpacity
      onPress={() => onPressItem?.(item)}
      activeOpacity={0.8}
      className="flex-1 bg-transparent border border-gray-300 rounded-full py-3 px-3 mb-3 mx-3 justify-center items-center"
      style={{ minWidth: 0 }} // helps text wrap correctly in grid
    >
      <View>
        <Text className="text-white text-base">{item.text}</Text>
      </View>
    </TouchableOpacity>
  )

  const ListFooter = () => {
    if (expanded) {
      return (
        <View className="items-center my-4">
          <TouchableOpacity
            onPress={() => setExpanded(false)}
            className="px-6 py-3 rounded-full border border-gray-300 bg-transparent"
            activeOpacity={0.8}
          >
            <Text className="text-white">Show less</Text>
          </TouchableOpacity>
        </View>
      )
    }

    // when collapsed show More button after the first 4 items
    return (
      <View className="items-center my-4">
        <TouchableOpacity
          onPress={() => setExpanded(true)}
          className="px-6 py-3 rounded-full border border-gray-300 bg-transparent"
          activeOpacity={0.8}
        >
          <Text className="text-white">More</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View className="w-full">
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 8 }}
        numColumns={2}
        ListFooterComponent={ListFooter}
      />
    </View>
  )
}