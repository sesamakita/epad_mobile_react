import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';

export default function KasirLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.warning[600],
      tabBarInactiveTintColor: Colors.neutral[400],
      tabBarStyle: { backgroundColor: '#FFF', borderTopColor: Colors.neutral[100], borderTopWidth: 1, height: 65, paddingBottom: 8, paddingTop: 8 },
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Cari WP', tabBarIcon: ({ color }) => <Ionicons name="search" size={22} color={color} /> }} />
      <Tabs.Screen name="pembayaran" options={{ title: 'Bayar', tabBarIcon: ({ color }) => <Ionicons name="card" size={22} color={color} /> }} />
      <Tabs.Screen name="rekap" options={{ title: 'Rekap', tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={22} color={color} /> }} />
      <Tabs.Screen name="profil-kasir" options={{ title: 'Profil', tabBarIcon: ({ color }) => <Ionicons name="person-circle" size={22} color={color} /> }} />
    </Tabs>
  );
}
