import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';

export default function LapanganLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.accent[600],
      tabBarInactiveTintColor: Colors.neutral[400],
      tabBarStyle: { backgroundColor: '#FFF', borderTopColor: Colors.neutral[100], borderTopWidth: 1, height: 65, paddingBottom: 8, paddingTop: 8 },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Tugas', tabBarIcon: ({ color }) => <Ionicons name="list" size={22} color={color} /> }} />
      <Tabs.Screen name="pendataan" options={{ title: 'Pendataan', tabBarIcon: ({ color }) => <Ionicons name="camera" size={22} color={color} /> }} />
      <Tabs.Screen name="profil-lapangan" options={{ title: 'Profil', tabBarIcon: ({ color }) => <Ionicons name="person-circle" size={22} color={color} /> }} />
    </Tabs>
  );
}
