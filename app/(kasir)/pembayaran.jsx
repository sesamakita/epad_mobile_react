/**
 * Kasir - Pembayaran (recent payments)
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Card, Badge } from '../../src/components/ui';
import { mockPembayaran } from '../../src/data/mockData';
import { formatRupiah, formatDateShort } from '../../src/utils/formatters';

export default function PembayaranScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.c, { paddingTop: insets.top }]}>
      <View style={s.hdr}><Text style={s.t}>Riwayat Pembayaran</Text></View>
      <FlatList data={mockPembayaran} keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Card style={s.card}>
            <View style={s.row}>
              <View style={s.icon}><Ionicons name="checkmark-circle" size={22} color={Colors.accent[500]} /></View>
              <View style={{ flex: 1 }}>
                <Text style={s.wpName}>{item.wp_nama}</Text>
                <Text style={s.sspd}>{item.nomor_sspd}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={s.amount}>{formatRupiah(item.total_bayar)}</Text>
                <Text style={s.date}>{formatDateShort(item.tanggal_bayar)}</Text>
              </View>
            </View>
            <View style={s.metaRow}>
              <Badge label={item.metode_bayar.toUpperCase()} variant="default" size="sm" />
              <Badge label="Berhasil" variant="success" size="sm" />
            </View>
          </Card>
        )} />
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: Colors.background.primary },
  hdr: { paddingHorizontal: 20, paddingVertical: 14 },
  t: { ...TextStyles.h1, color: Colors.text.primary },
  card: { marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.accent[50], alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  wpName: { fontSize: 15, fontWeight: '600', color: Colors.text.primary },
  sspd: { fontSize: 11, color: Colors.text.tertiary, marginTop: 1 },
  amount: { fontSize: 15, fontWeight: '800', color: Colors.text.primary },
  date: { fontSize: 11, color: Colors.text.tertiary, marginTop: 2 },
  metaRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
});
