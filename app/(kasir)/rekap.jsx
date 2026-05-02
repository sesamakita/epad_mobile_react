/**
 * Kasir - Rekap Harian
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Shadow } from '../../src/theme/spacing';
import { Card, StatCard, ProgressBar } from '../../src/components/ui';
import { formatRupiah } from '../../src/utils/formatters';

export default function RekapScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.c, { paddingTop: insets.top }]}>
      <View style={s.hdr}><Text style={s.t}>Rekap Hari Ini</Text></View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        {/* Total Card */}
        <View style={s.totalCard}>
          <Text style={s.totalLabel}>Total Penerimaan Hari Ini</Text>
          <Text style={s.totalValue}>{formatRupiah(128500000)}</Text>
          <View style={s.totalMeta}>
            <View style={s.metaItem}>
              <Ionicons name="receipt" size={14} color={Colors.primary[300]} />
              <Text style={s.metaText}>5 Transaksi</Text>
            </View>
            <View style={s.metaItem}>
              <Ionicons name="cash" size={14} color={Colors.primary[300]} />
              <Text style={s.metaText}>3 Tunai • 2 Transfer</Text>
            </View>
          </View>
        </View>

        <View style={s.statsRow}>
          <StatCard title="Tunai" value={formatRupiah(3500000)} icon="cash" color={Colors.accent[500]} />
          <View style={{ width: 12 }} />
          <StatCard title="Transfer" value={formatRupiah(125000000)} icon="swap-horizontal" color={Colors.info[500]} />
        </View>

        <Card style={s.breakdownCard}>
          <Text style={s.breakdownTitle}>Per Jenis Pajak</Text>
          {[
            { label: 'PBB-P2', amount: 0, count: 0 },
            { label: 'Hotel', amount: 0, count: 0 },
            { label: 'Restoran', amount: 3500000, count: 1 },
            { label: 'Mineral', amount: 125000000, count: 1 },
          ].filter(i => i.amount > 0).map((item, i) => (
            <View key={i} style={s.breakdownItem}>
              <View style={s.breakdownRow}>
                <Text style={s.breakdownLabel}>{item.label}</Text>
                <Text style={s.breakdownAmount}>{formatRupiah(item.amount)}</Text>
              </View>
              <Text style={s.breakdownCount}>{item.count} transaksi</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: Colors.background.primary },
  hdr: { paddingHorizontal: 20, paddingVertical: 14 },
  t: { ...TextStyles.h1, color: Colors.text.primary },
  totalCard: { backgroundColor: Colors.primary[900], borderRadius: 20, padding: 20, marginBottom: 12 },
  totalLabel: { fontSize: 12, color: Colors.primary[300], fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5 },
  totalValue: { fontSize: 28, fontWeight: '800', color: '#FFF', marginTop: 4 },
  totalMeta: { flexDirection: 'row', gap: 16, marginTop: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  metaText: { fontSize: 12, color: Colors.primary[300] },
  statsRow: { flexDirection: 'row', marginBottom: 12 },
  breakdownCard: { marginBottom: 12 },
  breakdownTitle: { fontSize: 15, fontWeight: '600', color: Colors.text.primary, marginBottom: 12 },
  breakdownItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between' },
  breakdownLabel: { fontSize: 14, fontWeight: '500', color: Colors.text.primary },
  breakdownAmount: { fontSize: 14, fontWeight: '700', color: Colors.text.primary },
  breakdownCount: { fontSize: 11, color: Colors.text.tertiary, marginTop: 2 },
});
