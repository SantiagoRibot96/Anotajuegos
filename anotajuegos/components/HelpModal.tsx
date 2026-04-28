import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../hooks/themeHook";

export type HelpItem = {
  titulo: string;
  descripcion: string;
};

type Props = {
  items: HelpItem[];
  visible: boolean;
  onClose: () => void;
};

export const HelpHeaderButton = ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        marginRight: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.accent,
        justifyContent: "center",
        alignItems: "center",
      }}
      android_ripple={{ color: "rgba(255,255,255,0.3)", borderless: true }}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }} allowFontScaling={false}>
        ?
      </Text>
    </Pressable>
  );
};

const HelpModal = ({ items, visible, onClose }: Props) => {
  const theme = useTheme();

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            width: "88%",
            maxHeight: "80%",
            backgroundColor: theme.background,
            borderRadius: 14,
            padding: 20,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 8,
          }}
        >
          <Text
            style={{ color: theme.text, fontSize: 18, fontWeight: "700", marginBottom: 16 }}
            allowFontScaling={false}
          >
            ¿Cómo se juega?
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            {items.map((item, i) => (
              <View key={i} style={{ marginBottom: 14 }}>
                <Text
                  style={{ color: theme.text, fontWeight: "600", fontSize: 15 }}
                  allowFontScaling={false}
                >
                  • {item.titulo}
                </Text>
                <Text
                  style={{ color: theme.inactiveText, fontSize: 14, marginTop: 3, paddingLeft: 10 }}
                  allowFontScaling={false}
                >
                  {item.descripcion}
                </Text>
              </View>
            ))}
          </ScrollView>

          <Pressable
            onPress={onClose}
            style={{
              alignSelf: "flex-end",
              backgroundColor: theme.primary,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              marginTop: 12,
            }}
            android_ripple={{ color: "rgba(255,255,255,0.2)", borderless: false }}
          >
            <Text
              style={{ color: theme.text, fontWeight: "600", fontSize: 15 }}
              allowFontScaling={false}
            >
              Entendido
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default HelpModal;
