/**
 * Shared Profile Screen (used by all roles)
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Spacing, BorderRadius, Shadow } from '../../src/theme/spacing';
import { useAuthStore } from '../../src/stores/authStore';
import { ROLE_LABELS, ROLE_COLORS } from '../../src/constants/roles';
import { Card } from '../../src/components/ui';

export default function ProfilScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const roleColor = user ? ROLE_COLORS[user.role] : Colors.primary[500];

  const handleLogout = () => {
    Alert.alert('Keluar', 'Yakin ingin keluar dari aplikasi?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Keluar', style: 'destructive', onPress: () => { logout(); router.replace('/'); } },
    ]);
  };

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profil', onPress: () => {} },
    { icon: 'lock-closed-outline', label: 'Ubah Password', onPress: () => {} },
    { icon: 'notifications-outline', label: 'Notifikasi', onPress: () => {} },
    { icon: 'help-circle-outline', label: 'Bantuan', onPress: () => {} },
    { icon: 'information-circle-outline', label: 'Tentang Aplikasi', onPress: () => {} },
  ];

  return (
    <View style={[s.c, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={s.header}><Text style={s.title}>Profil</Text></View>
        <View style={s.profileCard}>
          <View style={[s.avatarLg, { backgroundColor: roleColor + '20' }]}>
            <Text style={[s.avatarLgText, { color: roleColor }]}>
              {user?.nama?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text style={s.name}>{user?.nama || '-'}</Text>
          <View style={[s.roleBadge, { backgroundColor: roleColor + '15' }]}>
            <Text style={[s.roleText, { color: roleColor }]}>
              {ROLE_LABELS[user?.role] || user?.role}
            </Text>
          </View>
          {user?.nip && <Text style={s.meta}>NIP: {user.nip}</Text>}
          {user?.npwpd && <Text style={s.meta}>NPWPD: {user.npwpd}</Text>}
          {user?.wilayah && <Text style={s.meta}>{user.wilayah}</Text>}
        </View>
        <Card style={s.menuCard}>
          {menuItems.map((item, i) => (
            <TouchableOpacity key={i} style={[s.menuItem, i < menuItems.length - 1 && s.menuBorder]}
              onPress={item.onPress} activeOpacity={0.7}>
              <View style={s.menuIcon}>
                <Ionicons name={item.icon} size={20} color={Colors.text.secondary} />
              </View>
              <Text style={s.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.neutral[300]} />
            </TouchableOpacity>
          ))}
        </Card>
        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={Colors.danger[500]} />
          <Text style={s.logoutText}>Keluar dari Akun</Text>
        </TouchableOpacity>
        <Text style={s.version}>e-PAD v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: Colors.background.primary },
  header: { paddingHorizontal: 20, paddingVertical: 14 },
  title: { ...TextStyles.h1, color: Colors.text.primary },
  profileCard: { alignItems: 'center', paddingVertical: 24, marginHorizontal: 16, backgroundColor: '#FFF', borderRadius: 20, ...Shadow.md, marginBottom: 16 },
  avatarLg: { width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarLgText: { fontSize: 32, fontWeight: '800' },
  name: { fontSize: 20, fontWeight: '700', color: Colors.text.primary },
  roleBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 8 },
  roleText: { fontSize: 12, fontWeight: '600' },
  meta: { fontSize: 12, color: Colors.text.tertiary, marginTop: 4 },
  menuCard: { marginHorizontal: 16, marginBottom: 16, padding: 4 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12 },
  menuBorder: { borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  menuIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.neutral[50], alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '500', color: Colors.text.primary },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, paddingVertical: 14, backgroundColor: Colors.danger[50], borderRadius: 14, gap: 8 },
  logoutText: { fontSize: 15, fontWeight: '600', color: Colors.danger[500] },
  version: { textAlign: 'center', fontSize: 11, color: Colors.text.tertiary, marginTop: 16 },
});
