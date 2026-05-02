/**
 * WP - Tagihan
 */
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../src/theme/colors';
import { TextStyles } from '../../src/theme/typography';
import { Card, Badge } from '../../src/components/ui';
import { useAuthStore } from '../../src/stores/authStore';
import { mockKetetapan } from '../../src/data/mockData';
import { formatRupiah, formatDateShort, daysUntilDue } from '../../src/utils/formatters';
import { PAJAK_LABELS, PAJAK_ICONS } from '../../src/constants/pajakTypes';

export default function TagihanScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const myTagihan = mockKetetapan.filter(k => k.wp_id === user?.id && k.status !== 'lunas');

  return (
    <View style={[s.c, { paddingTop: insets.top }]}>
      <View style={s.hdr}><Text style={s.t}>Tagihan Saya</Text></View>
      <FlatList data={myTagihan} keyExtractor={i => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={s.empty}>
            <Ionicons name="checkmark-circle" size={48} color={Colors.accent[300]} />
            <Text style={s.emptyT}>Semua Lunas! 🎉</Text>
            <Text style={s.emptyM}>Tidak ada tagihan yang perlu dibayar</Text>
          </View>
        }
        renderItem={({ item }) => {
          const days = daysUntilDue(item.tanggal_jatuh_tempo);
          const isOverdue = days !== null && days <= 0;
          return (
            <Card style={s.card}>
              <View style={s.cardTop}>
                <View style={[s.iconBox, { backgroundColor: (Colors.pajak[item.jenis_pajak] || Colors.primary[500]) + '15' }]}>
                  <Ionicons name={PAJAK_ICONS[item.jenis_pajak] || 'document'} size={20} color={Colors.pajak[item.jenis_pajak] || Colors.primary[500]} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.pajakType}>{PAJAK_LABELS[item.jenis_pajak]}</Text>
                  <Text style={s.period}>{item.masa_pajak} {item.tahun_pajak}</Text>
                </View>
                <Badge label={isOverdue ? 'Jatuh Tempo' : `${days} hari lagi`} variant={isOverdue ? 'danger' : 'warning'} size="sm" />
              </View>
              <View style={s.divider} />
              <View style={s.detailRow}>
                <Text style={s.detailLabel}>Pokok Pajak</Text>
                <Text style={s.detailValue}>{formatRupiah(item.jumlah_pajak)}</Text>
              </View>
              {item.denda > 0 && (
                <View style={s.detailRow}>
                  <Text style={s.detailLabel}>Denda</Text>
                  <Text style={[s.detailValue, { color: Colors.danger[500] }]}>{formatRupiah(item.denda)}</Text>
                </View>
              )}
              <View style={[s.detailRow, { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: Colors.neutral[100] }]}>
                <Text style={s.totalLabel}>Total Bayar</Text>
                <Text style={s.totalValue}>{formatRupiah(item.total)}</Text>
              </View>
              <TouchableOpacity style={s.payBtn}>
                <Ionicons name="card" size={16} color="#FFF" />
                <Text style={s.payBtnText}>Bayar Sekarang</Text>
              </TouchableOpacity>
            </Card>
          );
        }} />
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, backgroundColor: Colors.background.primary },
  hdr: { paddingHorizontal: 20, paddingVertical: 14 },
  t: { ...TextStyles.h1, color: Colors.text.primary },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyT: { fontSize: 18, fontWeight: '700', color: Colors.text.primary, marginTop: 16 },
  emptyM: { fontSize: 14, color: Colors.text.secondary, marginTop: 4 },
  card: { marginBottom: 12 },
  cardTop: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  pajakType: { fontSize: 14, fontWeight: '600', color: Colors.text.primary },
  period: { fontSize: 11, color: Colors.text.tertiary, marginTop: 1 },
  divider: { height: 1, backgroundColor: Colors.neutral[100], marginVertical: 12 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  detailLabel: { fontSize: 13, color: Colors.text.secondary },
  detailValue: { fontSize: 13, fontWeight: '600', color: Colors.text.primary },
  totalLabel: { fontSize: 14, fontWeight: '600', color: Colors.text.primary },
  totalValue: { fontSize: 18, fontWeight: '800', color: Colors.text.primary },
  payBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14, paddingVertical: 12, backgroundColor: Colors.info[600], borderRadius: 12 },
  payBtnText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
});
