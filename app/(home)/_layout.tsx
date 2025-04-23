import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CcpsProvider } from "@/context/CcpsContext";

export default function Layout() {
  return (
    <CcpsProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="veterinarios"
          options={{
            title: "Veterinários",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="medkit-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </CcpsProvider>
  );
}
