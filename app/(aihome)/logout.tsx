import { Modal, View, Text, Pressable } from "react-native";
import { router } from "expo-router"
type LogoutModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({
  visible,
  onCancel,
  onConfirm,
}: LogoutModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      {/* Overlay */}
      <View className="flex-1 items-center justify-center bg-black/60">
        {/* Card */}
        <View className="w-[85%] rounded-2xl bg-white p-6">
          <Text className="text-lg font-semibold text-gray-900">
            Log out
          </Text>

          <Text className="mt-2 text-sm text-gray-500">
            Are you sure you want to log out of your account?
          </Text>

          {/* Buttons */}
          <View className="mt-6 flex-row justify-end space-x-3 gap-4">
            <Pressable
              onPress={onCancel}
              className="rounded-xl bg-black px-5 py-2"
            >
              <Text className="text-white font-medium">
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="rounded-xl bg-yellow-400 px-5 py-2"
            >
              <Text className="text-black font-medium">
                Log out
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
