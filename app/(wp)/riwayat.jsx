/**
 * WP - Riwayat Pembayaran
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Card } from '../../src/components/ui';
import { useAuthStore } from '../../src/stores/authStore';
import { mockPembayaran } from '../../src/data/mockData';
import { formatRupiah, formatDateShort } from '../../src/utils/formatters';

export default function RiwayatScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const myPay = mockPembayaran.filter(p => p.wp_id === user?.id);

  return (
    <View style={[s.c, { paddingTop: insets.top }]}>
      <View style={s.h}><Text style={s.t}>Riwayat Pembayaran</Text></View>
      <FlatList data={myPay} keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        ListEmptyComponent={<View style={s.e}><Ionicons name="time-outline" size={48} color={Colors.neutral[300]} /><Text style={s.eT}>Belum Ada Riwayat</Text></View>}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <View style={s.r}>
              <View style={s.ic}><Ionicons name="checkmark-circle" size={22} color={Colors.accent[500]} /></View>
              <View style={{ flex: 1 }}><Text style={s.n}>{item.nomor_sspd}</Text><Text style={s.p}>{item.jenis_pajak.toUpperCase()}</Text></View>
              <View style={{ alignItems: 'flex-end' }}><Text style={s.a}>{formatRupiah(item.total_bayar)}</Text><Text style={s.d}>{formatDateShort(item.tanggal_bayar)}</Text></View>
            </View>
          </Card>
        )} />
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: Colors.background.primary },
  h: { paddingHorizontal: 20, paddingVertical: 14 },
  t: { ...TextStyles.h1, color: Colors.text.primary },
  e: { alignItems: 'center', paddingTop: 80 },
  eT: { fontSize: 18, fontWeight: '700', color: Colors.text.primary, marginTop: 16 },
  r: { flexDirection: 'row', alignItems: 'center' },
  ic: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.accent[50], alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  n: { fontSize: 14, fontWeight: '600', color: Colors.text.primary },
  p: { fontSize: 11, color: Colors.text.tertiary, marginTop: 1 },
  a: { fontSize: 15, fontWeight: '800', color: Colors.text.primary },
  d: { fontSize: 11, color: Colors.text.tertiary, marginTop: 2 },
});
