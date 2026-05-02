/**
 * Kasir - Profil
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Shadow } from '../../src/theme/spacing';
import { useAuthStore } from '../../src/stores/authStore';
import { ROLE_LABELS, ROLE_COLORS } from '../../src/constants/roles';

export default function ProfilKasir() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const rc = ROLE_COLORS[user?.role] || Colors.warning[600];

  return (
    <View style={[s.c, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={s.hdr}><Text style={s.t}>Profil</Text></View>
        <View style={s.pCard}>
          <View style={[s.av, { backgroundColor: rc + '20' }]}>
            <Text style={[s.avT, { color: rc }]}>{user?.nama?.charAt(0) || 'U'}</Text>
          </View>
          <Text style={s.name}>{user?.nama}</Text>
          <View style={[s.badge, { backgroundColor: rc + '15' }]}>
            <Text style={[s.badgeT, { color: rc }]}>{ROLE_LABELS[user?.role]}</Text>
          </View>
          {user?.nip && <Text style={s.meta}>NIP: {user.nip}</Text>}
        </View>
        <TouchableOpacity style={s.logoutBtn} onPress={() => {
          Alert.alert('Keluar', 'Yakin?', [
            { text: 'Batal', style: 'cancel' },
            { text: 'Keluar', style: 'destructive', onPress: () => { logout(); router.replace('/'); } },
          ]);
        }}>
          <Ionicons name="log-out-outline" size={20} color={Colors.danger[500]} />
          <Text style={s.logoutT}>Keluar dari Akun</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: Colors.background.primary },
  hdr: { paddingHorizontal: 20, paddingVertical: 14 },
  t: { ...TextStyles.h1, color: Colors.text.primary },
  pCard: { alignItems: 'center', paddingVertical: 24, marginHorizontal: 16, backgroundColor: '#FFF', borderRadius: 20, ...Shadow.md, marginBottom: 16 },
  av: { width: 80, height: 80, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avT: { fontSize: 32, fontWeight: '800' },
  name: { fontSize: 20, fontWeight: '700', color: Colors.text.primary },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 8 },
  badgeT: { fontSize: 12, fontWeight: '600' },
  meta: { fontSize: 12, color: Colors.text.tertiary, marginTop: 4 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, paddingVertical: 14, backgroundColor: Colors.danger[50], borderRadius: 14, gap: 8 },
  logoutT: { fontSize: 15, fontWeight: '600', color: Colors.danger[500] },
});
