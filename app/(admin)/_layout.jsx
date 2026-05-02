/**
 * Admin Bidang Layout - Tab Navigation
 */

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary[500],
        tabBarInactiveTintColor: Colors.neutral[400],
        tabBarStyle: {
          backgroundColor: Colors.background.card,
          borderTopColor: Colors.neutral[100],
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wajib-pajak"
        options={{
          title: 'Wajib Pajak',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="penetapan"
        options={{
          title: 'Penetapan',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="piutang"
        options={{
          title: 'Piutang',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle" size={22} color={color} />
          ),
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: Colors.danger[500], fontSize: 10 },
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
