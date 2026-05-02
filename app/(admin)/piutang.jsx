/**
 * Admin - Piutang / Tunggakan
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Card, Badge, StatCard } from '../../src/components/ui';
import { mockKetetapan } from '../../src/data/mockData';
import { formatRupiah } from '../../src/utils/formatters';

export default function PiutangScreen() {
  const insets = useSafeAreaInsets();
  const tunggakan = mockKetetapan.filter(k => k.status === 'jatuh_tempo' || k.status === 'belum_bayar');
  const totalPiutang = tunggakan.reduce((sum, k) => sum + k.total, 0);

  return (
    <View style={[s.c, { paddingTop: insets.top }]}>
      <View style={s.h}><Text style={s.t}>Piutang Pajak</Text></View>
      <View style={s.statsRow}>
        <StatCard title="Total Piutang" value={formatRupiah(totalPiutang)} icon="cash" color={Colors.danger[500]} />
        <View style={{ width: 12 }} />
        <StatCard title="Jumlah WP" value={tunggakan.length} icon="people" color={Colors.warning[500]} subtitle="Menunggak" />
      </View>
      <FlatList data={tunggakan} keyExtractor={i => i.id} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Card style={s.card}>
            <View style={s.row}>
              <View style={s.alertIcon}><Ionicons name="alert-circle" size={20} color={Colors.danger[500]} /></View>
              <View style={{ flex: 1 }}>
                <Text style={s.wpName}>{item.wp_nama}</Text>
                <Text style={s.skpd}>{item.nomor_skpd}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={s.amount}>{formatRupiah(item.total)}</Text>
                <Badge label={item.status === 'jatuh_tempo' ? 'Jatuh Tempo' : 'Belum Bayar'}
                  variant={item.status === 'jatuh_tempo' ? 'danger' : 'warning'} size="sm" />
              </View>
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
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 12 },
  card: { marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center' },
  alertIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.danger[50], alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  wpName: { fontSize: 15, fontWeight: '600', color: Colors.text.primary },
  skpd: { fontSize: 11, color: Colors.text.tertiary, marginTop: 1 },
  amount: { fontSize: 14, fontWeight: '700', color: Colors.danger[500], marginBottom: 4 },
});
