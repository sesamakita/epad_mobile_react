import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';

export default function WPLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.info[600],
      tabBarInactiveTintColor: Colors.neutral[400],
      tabBarStyle: { backgroundColor: '#FFF', borderTopColor: Colors.neutral[100], borderTopWidth: 1, height: 65, paddingBottom: 8, paddingTop: 8 },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Beranda', tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color} /> }} />
      <Tabs.Screen name="tagihan" options={{ title: 'Tagihan', tabBarIcon: ({ color }) => <Ionicons name="receipt" size={22} color={color} />, tabBarBadge: 2, tabBarBadgeStyle: { backgroundColor: Colors.warning[500], fontSize: 10 } }} />
      <Tabs.Screen name="riwayat" options={{ title: 'Riwayat', tabBarIcon: ({ color }) => <Ionicons name="time" size={22} color={color} /> }} />
      <Tabs.Screen name="profil-wp" options={{ title: 'Profil', tabBarIcon: ({ color }) => <Ionicons name="person-circle" size={22} color={color} /> }} />
    </Tabs>
  );
}
